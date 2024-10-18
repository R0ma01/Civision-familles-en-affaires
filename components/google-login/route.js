// app/api/auth/googleSignIn.js
'use server';

import { signIn, auth } from '@/auth';

export default async function googleSignIn() {
    try {
        console.log('Starting Google Sign-In...');
        const response = await signIn('google');
        console.log('Sign-In response:', response);
        console.log('Signed in (ish)');

        const session = await auth();
        console.log('Session:', session);
        return session;
    } catch (error) {
        console.error('Error during sign-in:', error);
    }
}
