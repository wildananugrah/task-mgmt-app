import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/app/lib/prisma";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    useSecureCookies: process.env.NODE_ENV === 'production',
    cookies: process.env.NODE_ENV === "production"
        ? {
            sessionToken: {
                name: `__Secure-next-auth.session-token`,
                options: {
                    httpOnly: true,
                    sameSite: "Lax",
                    path: "/",
                    secure: true,
                },
            },
        }
        : {
            sessionToken: {
                name: `next-auth.session-token`,
                options: {
                    httpOnly: true,
                    sameSite: "Lax",
                    path: "/",
                    secure: false, // ✅ allow over HTTP
                },
            },
        },
    pages: {
        signIn: "/",
    },
    callbacks: {
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
    }
};
