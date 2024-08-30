import { NextResponse } from 'next/server';
import { connectToDatabaseStudy } from '@/utils/mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';
import { StudyDataPoint } from '@/components/interface/study-data';
import { CompanyInfo } from '@/components/interface/company';

export async function GET(req: Request) {
    try {
        const db = (await connectToDatabaseStudy()).db;
        const collection = db.collection(MongoDBPaths.COLLECTION_DATA);
        const url = new URL(req.url!);
        let filters = url.searchParams.get('filters');

        if (!filters) {
            return NextResponse.json(
                { error: 'Missing filter parameter' },
                { status: 400 },
            );
        }

        const filtersObj: CompanyInfo = JSON.parse(filters);

        if (!filtersObj) {
            return NextResponse.json(
                { error: 'Format of filter param is wrong' },
                { status: 400 },
            );
        }

        const matchStage: any = {};

        for (const [key, value] of Object.entries(filters)) {
            if (value === 'toutes' || value === null) continue;

            if (typeof value === 'object' && value !== null) {
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
                matchStage[key] = value;
            }
        }

        const studyDataPoints = await collection
            .find(
                { matchStage },
                {
                    projection: {
                        _id: 1,
                        'coordonnees.longitude': 1,
                        'coordonnees.latitude': 1,
                    },
                },
            )
            .toArray();

        if (!studyDataPoints) {
            return NextResponse.json(
                { error: 'Document not found' },
                { status: 404 },
            );
        }

        // Return a successful response
        return NextResponse.json({
            message: 'Documents found successfully',
            pages: studyDataPoints,
        });
    } catch (e: any) {
        console.error(e.message);

        // Return an error response
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
