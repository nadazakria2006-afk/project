import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            token: string;
            role?: string;
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        token: string;
        role?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        token: string;
        role?: string;
    }
}
