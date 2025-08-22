import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";



const users = [
  {
    id: "1",
    name: "Mahafuj",
    email: "mahafujhossainriyan@gmail.com",
    password:'12345467a',
    isAdmin: true,
  },
  {
    id: "2",
    name: "Normal User",
    email: "mahafujhossainriyan01@gmail.com",
    password: "1234567a",
    isAdmin: false
  },
];

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@mail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = users.find(
          (u) => u.email === credentials.email.trim()
        );
        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) return null;

       
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
