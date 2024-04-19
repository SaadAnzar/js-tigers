import { sql } from "@vercel/postgres";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ profile }) {
      try {
        await sql`
          CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            imageUrl VARCHAR(255),
            "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );
          `;

        const userExists = await sql`
          SELECT EXISTS (
            SELECT 1
            FROM users
            WHERE email = ${profile?.email}
          );
          `;

        if (userExists.rows[0].exists === false) {
          await sql`
            INSERT INTO users (name, email, imageUrl)
            VALUES (${profile?.name}, ${profile?.email}, ${profile?.picture})
            ON CONFLICT (email) DO NOTHING;
            `;
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});
