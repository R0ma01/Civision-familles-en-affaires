import { NextResponse } from 'next/server';
import { connectToDatabaseStudy } from '@/utils/mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';
import { CompanyInfo } from '@/components/interface/company';

function generateAggregationQuery(field: string, filters: CompanyInfo) {
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
            $lookup: {
                from: 'allPossibleValues',
                let: { name: '$_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$$name', '$_id'] },
                        },
                    },
                ],
                as: 'allValues',
            },
        },
        {
            $unwind: {
                path: '$allValues',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $addFields: {
                value: { $ifNull: ['$count', 0] },
            },
        },
        {
            $project: {
                _id: 0,
                name: '$_id',
                value: 1,
            },
        },
        {
            $sort: { name: 1 },
        },
    ];
}

function generateDualFieldAggregationQuery(
    field1: string,
    field2: string,
    filters: CompanyInfo,
) {
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

    matchStage[field1] = { $exists: true, $ne: null };
    matchStage[field2] = { $exists: true, $ne: null };

    return [
        {
            $match: matchStage,
        },
        {
            $group: {
                _id: {
                    [field1]: `$${field1}`,
                    [field2]: `$${field2}`,
                },
                count: { $sum: 1 },
            },
        },
        {
            $lookup: {
                from: 'allPossibleValues',
                let: { name: '$_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$$name', '$_id'] },
                        },
                    },
                ],
                as: 'allValues',
            },
        },
        {
            $unwind: {
                path: '$allValues',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $addFields: {
                count: { $ifNull: ['$count', 0] },
            },
        },
        {
            $project: {
                _id: 0,
                name: `$_id.${field1}`,
                [field2]: `$_id.${field2}`,
                count: 1,
            },
        },
        {
            $sort: { name: 1 },
        },
    ];
}

export async function GET(req: Request) {
    try {
        const db = (await connectToDatabaseStudy()).db;
        const collection = db.collection(MongoDBPaths.COLLECTION_DATA);
        const url = new URL(req.url!);
        let donnes = url.searchParams.get('donnes');
        let filters = url.searchParams.get('filters');

        if (!donnes || !filters) {
            return NextResponse.json(
                { error: 'Missing donnes or filter parameter' },
                { status: 400 },
            );
        }

        const donnesObj = JSON.parse(donnes);
        const filtersObj = JSON.parse(filters);

        if (!donnesObj || !filtersObj) {
            return NextResponse.json(
                { error: 'Format of donnes or filter param is wrong' },
                { status: 400 },
            );
        }

        let mongoQuery;

        if (donnesObj.length > 1) {
            mongoQuery = generateDualFieldAggregationQuery(
                donnesObj[0],
                donnesObj[1],
                filtersObj,
            );
        } else {
            mongoQuery = generateAggregationQuery(donnesObj[0], filtersObj);
        }

        const result = await collection.aggregate(mongoQuery).toArray();
        console.log(result);
        if (!result || result.length === 0) {
            return NextResponse.json(
                { error: 'Data field not found' },
                { status: 404 },
            );
        }

        return NextResponse.json({
            message: 'Data field found successfully',
            chartData: result,
        });
    } catch (e: any) {
        console.error(e.message);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
