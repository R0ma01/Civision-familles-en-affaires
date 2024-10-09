import { AlbumDataFields } from '@/components/enums/data-types-enum';

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
        switch (filterPath) {
            case AlbumDataFields.ANNEE_FONDATION:
                switch (newValue.toString()) {
                    case possibleValues[0].toString():
                        return {
                            [filterPath]: { $gte: 0, $lt: 1900 },
                        };
                    case possibleValues[1].toString():
                        return {
                            [filterPath]: { $gte: 1900, $lt: 1960 },
                        };
                    case possibleValues[2].toString():
                        return {
                            [filterPath]: { $gte: 1960, $lt: 1970 },
                        };
                    case possibleValues[3].toString():
                        return {
                            [filterPath]: { $gte: 1970, $lt: 1980 },
                        };
                    case possibleValues[4].toString():
                        return {
                            [filterPath]: { $gte: 1980, $lt: 1990 },
                        };
                    case possibleValues[5].toString():
                        return {
                            [filterPath]: { $gte: 1990, $lt: 2000 },
                        };
                    case possibleValues[6].toString():
                        return {
                            [filterPath]: { $gte: 2000, $lt: 2010 },
                        };
                    case possibleValues[7].toString():
                        return {
                            [filterPath]: { $gte: 2010 },
                        };
                    default:
                        return {
                            [filterPath]: { $eq: NaN },
                        }; // Handle NaN or unexpected values
                }
            case AlbumDataFields.REPONDANT_ANNEE_NAISSANCE:
                switch (newValue.toString()) {
                    case possibleValues[0].toString():
                        return {
                            [filterPath]: { $gte: 0, $lt: 1960 },
                        };
                    case possibleValues[1].toString():
                        return {
                            [filterPath]: { $gte: 1960, $lt: 1970 },
                        };
                    case possibleValues[2].toString():
                        return {
                            [filterPath]: { $gte: 1970, $lt: 1980 },
                        };
                    case possibleValues[3].toString():
                        return {
                            [filterPath]: { $gte: 1980, $lt: 1990 },
                        };
                    case possibleValues[4].toString():
                        return {
                            [filterPath]: { $gte: 1990, $lt: 2000 },
                        };
                    case possibleValues[5].toString():
                        return {
                            [filterPath]: { $gte: 2000, $lt: 2010 },
                        };
                    case possibleValues[6].toString():
                        return {
                            [filterPath]: { $gte: 2010 },
                        };

                    default:
                        return {
                            [filterPath]: { $eq: NaN },
                        }; // Handle NaN or unexpected values
                }

            case AlbumDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_POURCENTAGE_FEMMES:
                switch (newValue.toString()) {
                    case possibleValues[0].toString():
                        return {
                            [filterPath]: { $gte: 0, $lt: 10 },
                        };
                    case possibleValues[1].toString():
                        return {
                            [filterPath]: { $gte: 10, $lt: 25 },
                        };
                    case possibleValues[2].toString():
                        return {
                            [filterPath]: { $gte: 25, $lt: 50 },
                        };
                    case possibleValues[3].toString():
                        return {
                            [filterPath]: { $gte: 50, $lt: 75 },
                        };
                    case possibleValues[4].toString():
                        return {
                            [filterPath]: { $gte: 75 },
                        };
                    default:
                        return {
                            [filterPath]: { $eq: NaN },
                        }; // Handle NaN or unexpected values
                }

            case AlbumDataFields.REPONDANT_ANNEE_TRAVAILLEES:
                switch (newValue.toString()) {
                    case possibleValues[0].toString():
                        return {
                            [filterPath]: { $gte: 0, $lt: 10 },
                        };
                    case possibleValues[1].toString():
                        return {
                            [filterPath]: { $gte: 10, $lt: 20 },
                        };
                    case possibleValues[2].toString():
                        return {
                            [filterPath]: { $gte: 20, $lt: 30 },
                        };
                    case possibleValues[3].toString():
                        return {
                            [filterPath]: { $gte: 30, $lt: 40 },
                        };
                    case possibleValues[4].toString():
                        return {
                            [filterPath]: { $gte: 40 },
                        };
                    default:
                        return {
                            [filterPath]: { $eq: NaN },
                        }; // Handle NaN or unexpected values
                }

            case AlbumDataFields.ACTIONNAIRES_NOMBRE:
                switch (newValue.toString()) {
                    case possibleValues[0].toString():
                        return {
                            [filterPath]: { $gte: 0, $lt: 1 },
                        };
                    case possibleValues[1].toString():
                        return {
                            [filterPath]: { $gte: 1, $lt: 2 },
                        };
                    case possibleValues[2].toString():
                        return {
                            [filterPath]: { $gte: 2, $lt: 3 },
                        };
                    case possibleValues[3].toString():
                        return {
                            [filterPath]: { $gte: 3, $lt: 4 },
                        };
                    case possibleValues[4].toString():
                        return {
                            [filterPath]: { $gte: 4, $lt: 5 },
                        };
                    case possibleValues[5].toString():
                        return {
                            [filterPath]: { $gte: 5 },
                        };
                    default:
                        return {
                            [filterPath]: { $eq: NaN },
                        }; // Handle NaN or unexpe#ted values
                }
        }
    })();

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
