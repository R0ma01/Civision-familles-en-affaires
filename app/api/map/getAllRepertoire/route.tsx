import { NextResponse } from 'next/server';
import { connectToDatabaseRepertoire } from '@/utils/mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';
import { MapClusterPointData } from '@/components/interface/point-data';

export async function GET(req: Request) {
    try {
        const db = (await connectToDatabaseRepertoire()).db;
        const collection = db.collection(MongoDBPaths.REGISTRE_QC);
        const url = new URL(req.url!);
        let filters = url.searchParams.get('filters');
        if (!filters) {
            return NextResponse.json(
                { error: 'Missing donnes or filter parameter' },
                { status: 400 },
            );
        }

        const filtersObj: Record<string, any> = JSON.parse(filters);

        if (!filtersObj) {
            return NextResponse.json(
                { error: 'Format of donnes or filter param is wrong' },
                { status: 400 },
            );
        }
        console.log('hello');
        const result = await collection
            .find(
                {
                    // Apply dynamic filters here using the spread operator
                    ...filtersObj, // This will inject the filters object into the query
                    ENT_FAM: { $exists: true }, // Ensure the existing condition is still applied
                },
                {
                    projection: {
                        COORD: 1,
                        NOM_ASSUJ: 1,
                    },
                },
            )
            .toArray();
        console.log('the request is taking for ever');
        if (!result) {
            return NextResponse.json(
                { error: 'Document not found' },
                { status: 404 },
            );
        }
        const newResult: MapClusterPointData[] = result.map((item: any) => {
            return {
                _id: item._id,
                nom: item.NOM_ASSUJ[0],
                coords: item.COORD,
            };
        });

        // Return a successful response
        const response = NextResponse.json({
            message: 'Repertoire Points found successfully',
            points: newResult,
        });

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
