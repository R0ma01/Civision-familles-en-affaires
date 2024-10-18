// app/api/auth/googleSignIn.js
'use server';

import { signIn, auth } from '@/auth';

export default async function googleSignIn() {
    console.log('Starting Google Sign-In...');
    await signIn('google');
}
