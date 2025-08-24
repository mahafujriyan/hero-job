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

  const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

  const newUser = {
    name,
    email,
    password: hashedPassword,
    provider,
    createdAt: new Date(),
  };

  await users.insertOne(newUser);
  return newUser;
}

export const authOptions = {
  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // GitHub OAuth
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    // Credentials login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await getUserByEmail(credentials.email);
        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password || ""
        );
        if (!isValid) return null;

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
      // Auto-create user if signing in via social login
      if (account?.provider === "google" || account?.provider === "github") {
        const existingUser = await getUserByEmail(user.email);

        if (!existingUser) {
          await createUser({
            name: user.name,
            email: user.email,
            password: null, // no password for social login
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
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
