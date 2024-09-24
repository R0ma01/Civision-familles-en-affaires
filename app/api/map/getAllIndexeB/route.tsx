import { NextResponse } from 'next/server';
import { connectToDatabaseIndexe } from '@/utils/mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';
import { GraphTextService } from '@/services/translations';
import { IndexeDataFieldsB } from '@/components/enums/data-types-enum';
import { Language } from '@/components/enums/language';

// Define interfaces for the aggregation results
interface AggregationResult {
    name: string;
    value: number;
}

export async function GET(req: Request) {
    try {
        const db = (await connectToDatabaseIndexe()).db;
        const collection = db.collection(MongoDBPaths.VOLETB_2022);

        // Parse request parameters
        const url = new URL(req.url!);
        let filters = url.searchParams.get('filters');

        if (!filters) {
            return NextResponse.json(
                { error: 'Missing filters parameter' },
                { status: 400 },
            );
        }

        const filtersObj: Record<string, any> = JSON.parse(filters);

        if (!filtersObj) {
            return NextResponse.json(
                { error: 'Format of filters param is wrong' },
                { status: 400 },
            );
        }

        const matchStage: any = { ...filtersObj };

        const aggregationPipeline = [
            {
                $match: matchStage,
            },
            {
                $group: {
                    _id: '$Q0QC',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    region: '$_id',
                    count: 1,
                },
            },
        ];

        const aggregationResult = await collection
            .aggregate(aggregationPipeline)
            .toArray();

        if (!aggregationResult || aggregationResult.length === 0) {
            return NextResponse.json(
                { error: 'No regions found' },
                { status: 404 },
            );
        }

        const resultat: { region: string; count: number }[] = [];

        aggregationResult.map((result) => {
            if (result.region) {
                const label = GraphTextService.getFieldLabel(
                    IndexeDataFieldsB.Q0QC,
                    result.region,
                    Language.FR,
                );
                if (label) {
                    resultat.push({ region: label, count: result.count });
                }
            }
        });
        console.log(resultat);
        return NextResponse.json({
            message: 'Regions counted successfully',
            points: resultat,
        });
    } catch (e: any) {
        console.error(e.message);

        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
