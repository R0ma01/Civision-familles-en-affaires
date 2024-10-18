'use server';
import { auth } from '@/auth';
import { closeDatabase, connectToDatabase } from '@/utils/auth-mongoDB-utils';

export default async function something() {
    try {
        const session = await auth();
        console.log('Session:', session);
        if (session) {
            const collection = await connectToDatabase();
            const user = await collection.findOne({ email: session.email });
            await closeDatabase();
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
