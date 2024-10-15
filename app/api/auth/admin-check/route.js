import { NextResponse } from 'next/server';

import { verifyAdminToken } from '@/utils/token-utils';

export async function POST(req) {
    try {
        // Parse the incoming request
        const { token } = await req.json();
        const tokenObj = JSON.parse(token);

        // If no token is provided, return an error response
        if (!tokenObj) {
            return NextResponse.json({ valid: false }, { status: 200 });
        }

        // Verifying the token
        const verify = await verifyAdminToken(tokenObj);

        // If verification fails, return false
        if (!verify) {
            return NextResponse.json({ valid: false }, { status: 200 });
        }

        // If token is valid, return true
        return NextResponse.json({ valid: true }, { status: 200 });
    } catch (error) {
        // Catch any errors and return a failure response
        console.error('Error verifying token:', error);
        return NextResponse.json(
            { valid: false, error: 'Failed to verify token' },
            { status: 500 },
        );
    }
}
