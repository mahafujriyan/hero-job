import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

async function getUserByEmail(email) {
  await client.connect();
  const db = client.db(process.env.DB_NAME);
  return db.collection("users").findOne({ email });
}

async function createUser({ name, email, password, provider }) {
  await client.connect();
  const db = client.db(process.env.DB_NAME);
  const users = db.collection("users");

  const newUser = {
    name,
    email,
    password: password || null, 
    provider,
    createdAt: new Date(),
  };

  await users.insertOne(newUser);
  return newUser;
}

export const authOptions = {
  providers: [
  
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),


    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),


    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await getUserByEmail(email);
        if (!user) throw new Error("No user found with this email");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {

    async signIn({ user, account }) {
      if (account.provider === "google" || account.provider === "github") {
        const existingUser = await getUserByEmail(user.email);

        if (!existingUser) {
          await createUser({
            name: user.name,
            email: user.email,
            password: null, // social users don’t have password
            provider: account.provider,
          });
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || token.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
