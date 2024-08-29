import { NextResponse } from 'next/server';
import { connectToDatabaseStudy } from '@/utils/mongodb';
// import { ObjectId } from 'mongodb'; // Import ObjectId
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';
import { CompanyInfo } from '@/components/interface/company';

function generateAggregationQuery(field: string, filters: CompanyInfo) {
    // Build the $match stage by adding conditions for each filter
    const matchStage: any = {};

    // Iterate over the filters and add conditions to the match stage
    for (const [key, value] of Object.entries(filters)) {
        if (value === 'toutes' || value === null) {
            continue; // Skip default values ('toutes' or null) since they are not intended to filter
        }

        if (typeof value === 'object' && value !== null) {
            // Handle nested objects like 'coordonnees', 'dirigeant', etc.
            for (const [nestedKey, nestedValue] of Object.entries(value)) {
                if (
                    nestedValue !== 'toutes' &&
                    nestedValue !== null &&
                    nestedValue !== -1
                ) {
                    matchStage[`${key}.${nestedKey}`] = nestedValue;
                }
            }
        } else {
            // Handle simple key-value pairs
            matchStage[key] = value;
        }
    }

    return [
        {
            $match: {
                ...matchStage,
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
        const filters = url.searchParams.get('filters');

        if (!donnes || !filters) {
            return NextResponse.json(
                { error: 'Missing donnes parameter' },
                { status: 400 },
            );
        }

        const mongoQuery = generateAggregationQuery(
            donnes,
            JSON.parse(filters),
        );
        const result = await collection.aggregate(mongoQuery).toArray();

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
