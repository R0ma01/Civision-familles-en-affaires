'use server';
import { auth } from '@/auth';
import { closeDatabase, connectToDatabase } from '@/utils/auth-mongoDB-utils';
import { generateAdminToken, generateToken } from '@/utils/token-utils';

const { ADMIN_ID } = process.env;
export default async function something() {
    try {
        const session = await auth();

        if (session) {
            const collection = await connectToDatabase();
            const email = session.user.email;

            const user = await collection.findOne({
                email,
            });

            if (!user) {
                return;
            } else {
                const lastLoginDate = new Date();
                await collection.updateOne(
                    { email },
                    { $set: { lastLoginDate } },
                );
                const token = generateToken({ userId: user._id }, '24h');
                let adminToken = null;

                if (user._id == ADMIN_ID) {
                    adminToken = generateAdminToken(
                        { userId: user._id },
                        '24h',
                    );
                }
                return { token, adminToken };
            }
        }
    } catch (e) {
        console.error(e);
    }
}
