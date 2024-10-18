'use server';
import { auth } from '@/auth';

export default async function something() {
    try {
        const session = await auth();
        console.log('Session:', session);
        if (session) {
            const collection = await connectToDatabase();
            const user = await collection.findOne({ email: session.email });
            if (!user) {
                return;
            } else {
                return user;
            }
        }
    } catch (e) {
        console.error(e);
    }
}
