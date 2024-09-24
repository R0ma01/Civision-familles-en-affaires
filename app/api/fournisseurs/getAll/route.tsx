import { NextResponse } from 'next/server';
import { connectToDatabaseStudy } from '@/utils/mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const db = (await connectToDatabaseStudy()).db;
        const collection = db.collection(MongoDBPaths.FOURNISSEURS);

        const result = await collection.find({}).toArray();

        if (!result) {
            return NextResponse.json(
                { error: 'Document not found' },
                { status: 404 },
            );
        }

        const response = NextResponse.json({
            message: 'Documents found successfully',
            pages: result,
        });

        response.headers.set('Cache-Control', 'no-store, max-age=0');

        // Return a successful response
        return response;
    } catch (e: any) {
        console.error(e.message);

        // Return an error response with no-cache headers as well
        const errorResponse = NextResponse.json(
            { error: e.message },
            { status: 500 },
        );
        errorResponse.headers.set('Cache-Control', 'no-store, max-age=0');

        return errorResponse;
    }
}
