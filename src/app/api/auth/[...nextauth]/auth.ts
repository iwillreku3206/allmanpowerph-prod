import Google from "next-auth/providers/google"
import PostgresAdapter from "@/lib/pgadaptor"
import { dbPool } from "@/lib/db";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
      }
    }),
    // ...add more providers here
  ],
  secret: process.env.AUTH_SECRET,
  adapter: PostgresAdapter(dbPool)
}
