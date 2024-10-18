// app/api/auth/googleSignIn.js
'use server';

import { signIn, auth } from '@/auth';

export default async function googleSignIn() {
    await signIn('google');
}
