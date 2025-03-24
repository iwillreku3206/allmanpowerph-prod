import { z } from "zod";

const newSearchValidator = z.object({
  location: z.string({ required_error: 'Location is required' }),
  fields: z.array(z.object({
    key: z.string(),
    value: z.string()
  })).min(1),
  email: z.string().email()
})

export async function POST(request: Request) {
  // get info from request
  const payload = await request.json()
  const parsed = await newSearchValidator.safeParseAsync(payload)
}
