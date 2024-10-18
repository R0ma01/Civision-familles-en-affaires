import { NextResponse } from 'next/server';
import { connectToDatabaseStudy } from '@/utils/mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';
import { MapRegions } from '@/components/enums/map-regions';
import { MapType } from '@/components/enums/map-type-enum';
import { AlbumDataFields } from '@/components/enums/data-types-enum';

// Define interfaces for the aggregation results
interface AggregationResult {
    name: string;
    value: number;
}

export async function GET(req: Request) {
    try {
        const db = (await connectToDatabaseStudy()).db;
        const collection = db.collection(MongoDBPaths.COLLECTION_DATA);

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

        Object.entries(matchStage).forEach((entry: [string, any]) => {
            if (entry[0] === AlbumDataFields.COORDONNES_REGION) {
                const newIn = [...entry[1]['$in']]; // Ensure entry[1] is an array

                const addRegions = Object.entries(addedRegions);

                entry[1]['$in'].forEach((region: any) => {
                    const foundRegion = addRegions.find((a) => a[1] === region);
                    if (foundRegion) {
                        const reg = parseInt(foundRegion[0]);
                        newIn.push(reg);
                    }
                });

                matchStage[entry[0]]['$in'] = [...newIn];
            }
        });

        // Add conditions for fields to exist
        // matchStage['NEQ'] = { $exists: true };
        // matchStage['coordonnees.longitude'] = { $exists: true };

        const aggregationPipeline = [
            {
                $match: matchStage,
            },
            {
                $group: {
                    _id: '$coordonnees.region',
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

        const regionCountsMap = new Map();
        aggregationResult.forEach((item: any) => {
            if (item.region) {
                if (
                    Object.keys(addedRegions).includes(item.region.toString())
                ) {
                    const val =
                        regionCountsMap.get(addedRegions[item.region]) ?? 0;
                    regionCountsMap.set(
                        addedRegions[item.region],
                        val + item.count,
                    );
                } else {
                    const val =
                        regionCountsMap.get(item.region.toString()) ?? 0;
                    regionCountsMap.set(
                        item.region.toString(),
                        val + item.count,
                    );
                }
            }
        });
  

        const result = Array.from(
            MapRegions.get(MapType.PAGE_INFORMATION_ALBUM)?.entries() || [], // Use entries() from the map
        ).map(([key, regionName]) => ({
            region: regionName,
            count: regionCountsMap.get(key.toString()) || 0, // Ensure key is treated as a string
        }));

        const response = NextResponse.json({
            message: 'Regions counted successfully',
            points: result,
        });

        // Add Cache-Control headers to prevent caching
        response.headers.set('Cache-Control', 'no-store, max-age=0');

        return response;
    } catch (e: any) {
        console.error(e.message);

        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

const addedRegions: Record<number, string> = {
    1: 'Bas-Saint-Laurent',
    2: 'Saguenay--Lac-Saint-Jean',
    3: 'Capitale-Nationale',
    4: 'Mauricie',
    5: 'Estrie',
    6: 'Montreal',
    7: 'Outaouais',
    8: 'Abitibi-Temiscamingue',
    9: 'Cote-Nord',
    10: 'Nord-du-Quebec',
    11: 'Gaspesie--Îles-de-la-Madeleine',
    12: 'Chaudiere-Appalaches',
    13: 'Laval',
    14: 'Lanaudiere',
    15: 'Laurentides',
    16: 'Monteregie',
    17: 'Centre-du-Quebec',
};
