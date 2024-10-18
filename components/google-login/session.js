'use server';
import { auth } from '@/auth';

export default async function something() {
    try {
        const session = await auth();
        console.log('Session:', session);
    } catch (e) {
        console.error(e);
    }
}
