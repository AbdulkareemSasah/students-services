import {NextAuthOptions} from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider, { GoogleProfile} from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import prismadb from "@/lib/prisma"
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    pages: {
      signIn: "/auth",
      newUser: "/auth",
    },
    providers: [
        GoogleProvider({
            profile(profile:GoogleProfile) {
                return {
                    ...profile,
                    role: profile.role || "USER",
                    id: profile.id.toString(),
                    image:profile.picture
                }
            },
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
          credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            const { email, password } = credentials ?? {}
            if (!email || !password) {
              throw new Error("Missing username or password");
            }
            const user = await prismadb.user.findUnique({
              where: {
                email,
              },
            });
            // if user doesn't exist or password doesn't match
            if (!user || !(await compare(password, user.password))) {
              throw new Error("Invalid username or password");
            }
            return user;
          },
        }),

    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async session({ session, user, token }) {
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token
        }
    }
};
