import NextAuth from 'next-auth';

// import { closeDatabase, connectToDatabase } from "@/utils/mongodbUtils";
// import client from "./lib/db";
import GoogleProvider from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
    // adapter: MongoDBAdapter(client),
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            authorization: {
                params: {
                    redirect_uri: process.env.GOOGLE_REDIRECT_URI, // optionnel
                },
            },
        }),
    ],
});
