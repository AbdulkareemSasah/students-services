import {NextAuthOptions} from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider, { GoogleProfile} from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";


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
      id: "credentials",
      name: "credentials",
      credentials: {
            email: {
              label: "Email",
              type: "email",
              placeholder: "username@example.com",
            },
            password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/user/check-credentials`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials)
          }
        )
          const user = await res.json()

        if (user && res.ok) {
          return user;
        } else {
          return null;
        }
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
