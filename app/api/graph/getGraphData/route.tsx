import { NextResponse } from 'next/server';
import { connectToDatabaseStudy } from '@/utils/mongodb';
import { ObjectId } from 'mongodb'; // Import ObjectId
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';

function generateAggregationQuery(field: string) {
    return [
        {
            $match: {
                [field]: { $exists: true, $ne: null },
            },
        },
        {
            $group: {
                _id: `$${field}`,
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                name: '$_id',
                value: '$count',
            },
        },
    ];
}

export async function GET(req: Request) {
    try {
        const db = (await connectToDatabaseStudy()).db;
        const collection = db.collection(MongoDBPaths.COLLECTION_DATA);
        const url = new URL(req.url!);
        const donnes = url.searchParams.get('donnes');

        if (!donnes) {
            return NextResponse.json(
                { error: 'Missing donnes parameter' },
                { status: 400 },
            );
        }

        const mongoQuery = generateAggregationQuery(donnes);
        const result = await collection.aggregate(mongoQuery).toArray();
        console.log(result);

        if (!result) {
            return NextResponse.json(
                { error: 'Data field not found' },
                { status: 404 },
            );
        }

        // Return a successful response
        return NextResponse.json({
            message: 'Data field found successfully',
            chartData: result,
        });
    } catch (e: any) {
        console.error(e.message);

        // Return an error response
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
