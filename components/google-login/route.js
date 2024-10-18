// app/api/auth/googleSignIn.js
'use server';

import { signIn, auth } from '@/auth';

export default async function googleSignIn() {
    console.log('hello');
    const something = await signIn('google');
    console.log(something);
    console.log('signed in ish');
    const session = await auth();
    console.log(session);
    return session;
}
