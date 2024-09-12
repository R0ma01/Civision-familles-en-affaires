import { NextResponse } from 'next/server';
import { connectToDatabaseRepertoire } from '@/utils/mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';
import { MapClusterPointData } from '@/components/interface/point-data';

export async function GET() {
    try {
        const db = (await connectToDatabaseRepertoire()).db;
        const collection = db.collection(MongoDBPaths.REGISTRE_QC);

        const result = await collection
            .find(
                { ENT_FAM: { $exists: true } },
                {
                    projection: {
                        COORD: 1,
                        NOM_ASSUJ: 1,
                    },
                },
            )
            .toArray();

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
        return NextResponse.json({
            message: 'Documents found successfully',
            points: newResult,
        });
    } catch (e: any) {
        console.error(e.message);

        // Return an error response
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
