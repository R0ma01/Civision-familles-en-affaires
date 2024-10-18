// app/api/auth/googleSignIn.js
'use server';

import { signIn, auth } from '@/auth';
import { cookies } from 'next/headers'; // Import cookies utility to set cookies in Next.js

export default async function googleSignIn() {
    console.log('Signing in with Google...');
    const something = await signIn('google'); // Handle your Google sign-in here

    if (something) {
        // If sign-in is successful, get the session details
        const session = await auth();
        console.log('Signed in:', session);

        // Set token and adminToken in cookies
        cookies().set('token', session.token, { path: '/', httpOnly: true });
        if (session.adminToken) {
            cookies().set('adminToken', session.adminToken, {
                path: '/',
                httpOnly: true,
            });
        }

        // Return session data
        return session;
    } else {
        console.log('Google sign-in failed');
        throw new Error('Google sign-in failed');
    }
}
