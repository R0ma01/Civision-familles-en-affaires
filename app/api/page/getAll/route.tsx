import { NextResponse } from 'next/server';
import { connectToDatabaseStudy } from '@/utils/mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';

export async function GET() {
    try {
        const db = (await connectToDatabaseStudy()).db;
        const collection = db.collection(MongoDBPaths.COLLECTION_PAGES_TABS);

        const result = await collection.find({}).toArray();

        if (!result) {
            return NextResponse.json(
                { error: 'Document not found' },
                { status: 404 },
            );
        }

        // Return a successful response
        return NextResponse.json({
            message: 'Documents found successfully',
            pages: result,
        });
    } catch (e: any) {
        console.error(e.message);

        // Return an error response
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
