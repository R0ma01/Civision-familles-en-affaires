import { AlbumDataFields } from '@/components/enums/data-types-enum';
import { GraphTextService } from '@/services/translations';

// Helper function to handle range-based filters
export const handleRangeFilter = (
    filterPath: string,
    newValue: any,
    previousFilter: Record<string, any>,
    possibleValues: any[],
) => {
    // Initialize $or array if not already present
    previousFilter.$or = previousFilter.$or || [];

    // Define range mapping logic
    const newRange = (() => {
        if (rangeMapping[filterPath]) {
            return {
                [filterPath]: rangeMapping[filterPath][newValue.toString()] || {
                    $eq: NaN,
                }, // Handle NaN or unexpected values
            };
        }
        return null; // If no mapping found, return null
    })();

    // Check if newRange is valid
    if (!newRange) {
        return previousFilter; // Return unchanged filter if mapping is not found
    }

    // Check if this range is already in the $or array
    const rangeExists = previousFilter.$or.some(
        (condition: any) =>
            JSON.stringify(condition) === JSON.stringify(newRange),
    );

    // Toggle logic: Remove the range if it exists, add if not
    if (rangeExists) {
        previousFilter.$or = previousFilter.$or.filter(
            (condition: any) =>
                JSON.stringify(condition) !== JSON.stringify(newRange),
        );
        // If no ranges are left, remove the $or operator
        if (previousFilter.$or.length === 0) {
            delete previousFilter.$or;
        }
    } else {
        // Add the new range to the $or array
        previousFilter.$or.push(newRange);
    }

    return previousFilter;
};
const possibleValuesYear = GraphTextService.getKeys(
    AlbumDataFields.ANNEE_FONDATION,
);
const possibleValuesRepondantNaissance = GraphTextService.getKeys(
    AlbumDataFields.REPONDANT_ANNEE_NAISSANCE,
);
const possibleValuesConseilFemmes = GraphTextService.getKeys(
    AlbumDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_POURCENTAGE_FEMMES,
);
const possibleValuesRepondantTravail = GraphTextService.getKeys(
    AlbumDataFields.REPONDANT_ANNEE_TRAVAILLEES,
);
const possibleValuesActionnairesNombre = GraphTextService.getKeys(
    AlbumDataFields.ACTIONNAIRES_NOMBRE,
);
const rangeMapping: Record<string, Record<string, any>> = {
    [AlbumDataFields.ANNEE_FONDATION]: {
        [possibleValuesYear[0].toString()]: { $gte: 0, $lt: 1900 },
        [possibleValuesYear[1].toString()]: { $gte: 1900, $lt: 1960 },
        [possibleValuesYear[2].toString()]: { $gte: 1960, $lt: 1970 },
        [possibleValuesYear[3].toString()]: { $gte: 1970, $lt: 1980 },
        [possibleValuesYear[4].toString()]: { $gte: 1980, $lt: 1990 },
        [possibleValuesYear[5].toString()]: { $gte: 1990, $lt: 2000 },
        [possibleValuesYear[6].toString()]: { $gte: 2000, $lt: 2010 },
        [possibleValuesYear[7].toString()]: { $gte: 2010 },
    },
    [AlbumDataFields.REPONDANT_ANNEE_NAISSANCE]: {
        [possibleValuesRepondantNaissance[0].toString()]: {
            $gte: 0,
            $lt: 1960,
        },
        [possibleValuesRepondantNaissance[1].toString()]: {
            $gte: 1960,
            $lt: 1970,
        },
        [possibleValuesRepondantNaissance[2].toString()]: {
            $gte: 1970,
            $lt: 1980,
        },
        [possibleValuesRepondantNaissance[3].toString()]: {
            $gte: 1980,
            $lt: 1990,
        },
        [possibleValuesRepondantNaissance[4].toString()]: {
            $gte: 1990,
            $lt: 2000,
        },
        [possibleValuesRepondantNaissance[5].toString()]: {
            $gte: 2000,
            $lt: 2010,
        },
        [possibleValuesRepondantNaissance[6].toString()]: { $gte: 2010 },
    },
    [AlbumDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_POURCENTAGE_FEMMES]: {
        [possibleValuesConseilFemmes[0].toString()]: { $gte: 0, $lt: 10 },
        [possibleValuesConseilFemmes[1].toString()]: { $gte: 10, $lt: 25 },
        [possibleValuesConseilFemmes[2].toString()]: { $gte: 25, $lt: 50 },
        [possibleValuesConseilFemmes[3].toString()]: { $gte: 50, $lt: 75 },
        [possibleValuesConseilFemmes[4].toString()]: { $gte: 75 },
    },
    [AlbumDataFields.REPONDANT_ANNEE_TRAVAILLEES]: {
        [possibleValuesRepondantTravail[0].toString()]: { $gte: 0, $lt: 10 },
        [possibleValuesRepondantTravail[1].toString()]: { $gte: 10, $lt: 20 },
        [possibleValuesRepondantTravail[2].toString()]: { $gte: 20, $lt: 30 },
        [possibleValuesRepondantTravail[3].toString()]: { $gte: 30, $lt: 40 },
        [possibleValuesRepondantTravail[4].toString()]: { $gte: 40 },
    },
    [AlbumDataFields.ACTIONNAIRES_NOMBRE]: {
        [possibleValuesActionnairesNombre[0].toString()]: { $gte: 0, $lt: 1 },
        [possibleValuesActionnairesNombre[1].toString()]: { $gte: 1, $lt: 2 },
        [possibleValuesActionnairesNombre[2].toString()]: { $gte: 2, $lt: 3 },
        [possibleValuesActionnairesNombre[3].toString()]: { $gte: 3, $lt: 4 },
        [possibleValuesActionnairesNombre[4].toString()]: { $gte: 4, $lt: 5 },
        [possibleValuesActionnairesNombre[5].toString()]: { $gte: 5 },
    },
};

export function getKeyForRangeFilterValue(filterPath: any, filterValue: any) {
    const filterEntries = Object.entries(rangeMapping[filterPath]);

    if (filterEntries) {
        // Use find to get the first matching entry
        const entry = filterEntries.find((ent) => filterValue === ent[1]);

        // If entry is found, return its key; otherwise, return undefined
        return entry ? entry[0] : undefined;
    } else {
        return 'error'; // Handle case where filterPath is invalid
    }
}
