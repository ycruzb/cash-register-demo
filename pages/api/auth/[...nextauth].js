import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import connectToDatabase from "../../../utils/mongoDB";
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const db = await connectToDatabase(process.env.DATABASE_URL);

        const collection = await db.collection("users");

        const user = await collection.findOne({ email: credentials.email });

        if (!user) {
          throw "/api/auth/signin";
        } else {
          const match = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (match) {
            return {
              name: user.name,
              email: user.email,
            };
          } else {
            throw "/api/auth/signin";
          }
        }
      },
    }),
  ],
  jwt: {
    encryption: true,
    secret: process.env.SECRET,
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/",
    error: "/auth/error",
  },
  callbacks: {
    session: async (session, user) => {
      const db = await connectToDatabase(process.env.DATABASE_URL);
      const collection = await db.collection("users");
      const userDB = await collection.findOne({ email: user.email });

      if (userDB) {
        session.user.lastname = userDB.lastname;
        session.user.user_id = userDB._id;
        session.user.store_id = userDB.store_id;
      }

      return Promise.resolve(session);
    },
  },
  debug: true,
});
