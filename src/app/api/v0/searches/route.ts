import { dbPool } from "@/lib/db";
import { z } from "zod";
import crypto from 'crypto'
import argon2 from 'argon2'

const newSearchValidator = z.object({
  location: z.string({ required_error: 'Location is required' }).nonempty({ message: 'Location is required' }),
  fields: z.array(z.object({
    key: z.string().nonempty({ message: "Field name cannot be empty" }),
    value: z.string().nonempty({ message: "Field value cannot be empty" })
  })).min(1, { message: "At least one field is required" }),
  email: z.string().email({ message: "Invalid email" })
})

export async function POST(request: Request) {
  // get info from request
  const payload = await request.json()
  const parsed = await newSearchValidator.safeParseAsync(payload)

  // generate password
  const password = crypto.randomBytes(32).toString('hex')
  const hashed = await argon2.hash(password)

  if (!parsed.success)
    return Response.json({ status: 400, error: parsed.error.issues.map(issue => issue.message).join('\n') }, { status: 400 })

  const q = await dbPool.query<{ id: string }>(
    `INSERT INTO searches(location, fields, email, password_hash) 
                  VALUES ($1, $2, $3, $4)
            RETURNING id`,
    [parsed.data.location, JSON.stringify(parsed.data.fields), parsed.data.email, hashed]
  )
  if (q.rowCount !== 1)
    return Response.json({ status: 500, error: 'Unknown database error' }, { status: 500 })

  const id = q.rows[0].id
  console.log(`TODO// Email ${parsed.data.email} the following: link: ${id}, password: ${password}`)

  return Response.json({ status: 200 }, { status: 200 })
}
