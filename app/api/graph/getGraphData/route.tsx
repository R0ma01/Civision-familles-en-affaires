import { NextResponse } from 'next/server';
import { connectToDatabaseStudy } from '@/utils/mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';
import { CompanyInfo } from '@/components/interface/company';
import { PossibleDataFileds } from '@/services/tableaux-taitement';
import { MainDataFields } from '@/components/enums/data-types-enum';

// Define interfaces for the aggregation results
interface AggregationResult {
    name: string;
    value: number;
}

interface DualFieldAggregationResult {
    name: string;
    count: number;
    [field2: string]: string | number; // Adjusted to include number
}

function generateAggregationQuery(
    field: string,
    filters: CompanyInfo,
    possibleValues: string[],
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

    const aggregationPipeline = [
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

    return async (collection: any): Promise<AggregationResult[]> => {
        const result = await collection
            .aggregate(aggregationPipeline)
            .toArray();
        let resultMap = new Map<string, AggregationResult>(
            result.map((item: AggregationResult) => {
                if (Array.isArray(item.name)) {
                    return [JSON.stringify(item.name), item];
                }
                return [item.name.toString(), item];
            }),
        );

        if (Array.from(resultMap.keys())[0]?.includes('[')) {
            resultMap = unclusterResultArrays(
                Array.from(resultMap.entries()),
                possibleValues,
            );
        }
        // Ensure all possible values are in the result
        return possibleValues.map((value) => {
            return {
                name: value,
                value: resultMap.get(value)?.value || 0,
            };
        });
    };
}

function generateDualFieldAggregationQuery(
    field1: string,
    field2: string,
    filters: CompanyInfo,
    possibleValues: { [key: string]: string[] },
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

    const aggregationPipeline = [
        {
            $match: {
                ...matchStage,
                [field1]: { $exists: true, $ne: null },
                [field2]: { $exists: true, $ne: null },
            },
        },
        {
            $group: {
                _id: {
                    field1: `$${field1}`,
                    field2: `$${field2}`,
                },
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                name: { $getField: `_id` },

                count: '$count',
            },
        },
    ];

    return async (
        collection: any,
    ): Promise<
        {
            name: string;
            [key: string]: number | string; // Allow string for 'name' and array for dynamic fields
        }[]
    > => {
        const result: {
            name: { field1: string; field2: string };
            count: number;
        }[] = await collection.aggregate(aggregationPipeline).toArray();

        const resultMap = new Map<
            string,
            {
                name: { field1: string; field2: string };
                count: number;
            }
        >(
            result.map((item: any) => {
                return [`${item.name.field1}-${item.name.field2}`, item];
            }),
        );

        const returnValues: any = [];

        possibleValues[field1].flatMap((value1) => {
            const item: any = {
                name: value1,
            };
            possibleValues[field2].forEach((value2) => {
                // Type guard to ensure item[field2] is an array
                item[value2] = resultMap.get(`${value1}-${value2}`)?.count || 0;
            });

            returnValues.push(item);
        });

        console.log(returnValues);
        // Ensure all possible combinations of values are in the result
        return returnValues;
    };
}

function unclusterResultArrays(originalResult: any, possibleValues: any) {
    const resultMap = new Map();
    possibleValues.map((value: string) => {
        resultMap.set(value, { name: value, value: 0 });
    });

    originalResult.map((item: any) => {
        item[1].name.map((name: string) => {
            let result = resultMap.get(name.toString());

            result.value += item[1].value;
            resultMap.set(name.toString(), result);
        });
    });

    return resultMap;
}

// async function generateSimpleAggregationQuery(
//     field: string,
//     collection: Collection<any>,
// ): Promise<AggregationResult[]> {
//     // Define the aggregation pipeline
//     const aggregationPipeline = [
//         {
//             $match: {
//                 [field]: { $exists: true, $ne: null },
//             },
//         },
//         {
//             $group: {
//                 _id: `$${field}`, // Group by the field value
//                 count: { $sum: 1 }, // Count occurrences
//             },
//         },
//         {
//             $project: {
//                 _id: 0, // Exclude _id from the output
//                 name: '$_id', // Rename _id to name
//                 count: 1, // Include the count
//             },
//         },
//     ];

//     // Execute the aggregation
//     const result = await collection.aggregate(aggregationPipeline).toArray();
//     return result;
// }

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

        const donnesObj: MainDataFields[] = JSON.parse(donnes);
        const filtersObj: CompanyInfo = JSON.parse(filters);

        console.log(donnesObj);

        if (!donnesObj || !filtersObj) {
            return NextResponse.json(
                { error: 'Format of donnes or filter param is wrong' },
                { status: 400 },
            );
        }

        let mongoQuery: (collection: any) => Promise<any[]>;

        if (donnesObj.length > 1) {
            const tableau1 = PossibleDataFileds.get(donnesObj[0]) || [];
            const tableau2 = PossibleDataFileds.get(donnesObj[1]) || [];
            const dynamicObject = {
                [donnesObj[0]]: tableau1,
                [donnesObj[1]]: tableau2,
            };

            mongoQuery = generateDualFieldAggregationQuery(
                donnesObj[0],
                donnesObj[1],
                filtersObj,
                dynamicObject,
            );
        } else {
            const tableau = PossibleDataFileds.get(donnesObj[0]) || [];
            mongoQuery = generateAggregationQuery(
                donnesObj[0],
                filtersObj,
                tableau,
            );
        }

        const result = await mongoQuery(collection);

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
