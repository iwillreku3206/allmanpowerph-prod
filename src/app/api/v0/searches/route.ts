import { dbPool } from "@/lib/db";
import { z } from "zod";
import crypto from 'crypto'
import argon2 from 'argon2'
import { sendEmail } from "@/utils/email";
import NewSearchEmail, { SearchEmailProps } from "./email";

const newSearchValidator = z.object({
  location: z.string({ required_error: 'Location is required' }).nonempty({ message: 'Location is required' }),
  fields: z.array(z.object({
    key: z.string().nonempty({ message: "Field name cannot be empty" }),
    value: z.string().nonempty({ message: "Field value cannot be empty" })
  })),
  email: z.string().email({ message: "Invalid email" }),
  careType: z.string()
})

export async function POST(request: Request) {
  // get info from request
  const payload = await request.json()
  const parsed = await newSearchValidator.safeParseAsync(payload)

  // generate password
  const password = crypto.randomBytes(32).toString('hex')
  const hashed = await argon2.hash(password)

  if (!parsed.success) {
    console.error(parsed.error)
    return Response.json({ status: 400, error: parsed.error.issues.map(issue => issue.message).join('\n') }, { status: 400 })
  }

  const q = await dbPool.query<{ id: string }>(
    `INSERT INTO searches(location, fields, email, password_hash, care_type) 
                  VALUES ($1, $2, $3, $4, $5)
            RETURNING id`,
    [parsed.data.location, JSON.stringify(parsed.data.fields), parsed.data.email, hashed, parsed.data.careType]
  )
  if (q.rowCount !== 1)
    return Response.json({ status: 500, error: 'Unknown database error' }, { status: 500 })

  const id = q.rows[0].id
  console.log(`TODO// Email ${parsed.data.email} the following: link: ${id}, password: ${password}`)

  await sendEmail<SearchEmailProps>({
    to: parsed.data.email,
    component: NewSearchEmail,
    from: 'KasambaHunt',
    plaintextFn: (props) => `Please check this link in a few days for an update regarding your search: https://${props.base}/searches/${props.id}/${props.password}. Your password is ${props.password}`,
    props: {
      base: process.env.NEXT_PUBLIC_BASE_URL as string,
      id,
      password
    },
    subject: 'AllMaidsPH candidate search request'
  })

  return Response.json({ status: 200 }, { status: 200 })
}
