import { sql } from "@vercel/postgres";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { createUsersTable } from "@/lib/query";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ profile }) {
      try {
        await createUsersTable();

        const userExists = await sql`
          SELECT EXISTS (
            SELECT 1
            FROM users
            WHERE email = ${profile?.email}
          );
          `;

        if (userExists.rows[0].exists === false) {
          await sql`
            INSERT INTO users (name, email, imageurl)
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
