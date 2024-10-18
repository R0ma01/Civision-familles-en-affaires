// app/api/auth/googleSignIn.js
'use server';

import { signIn, auth } from '@/auth';

export default async function googleSignIn() {
    console.log('Starting Google Sign-In...');
    const response = await signIn('google');
    console.log('Sign-In response:', response);
    console.log('Signed in (ish)');
}
