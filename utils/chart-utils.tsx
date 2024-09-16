// chart-utilities.ts
import {
    ChartData,
    ChartDataMultipleFileds,
} from '@/components/interface/chart-data';
import { AlbumDataFields } from '@/components/enums/data-types-enum';
import { PossibleDataFileds } from '@/services/tableaux-taitement';
import { CompanyInfo } from '@/components/interface/company';

export function translateData(data: any, donnes: AlbumDataFields): string {
    // Implement conversion logic based on donnes
    return data;
}

export function donnesSplit(donnes: string): string[] {
    return donnes.split(' ');
}

function fetchNested(entreprise: any, donnees: string[]) {
    if (donnees.length === 1) {
        return entreprise[donnees[0]];
    } else if (donnees.length === 2) {
        return entreprise[donnees[0]][donnees[1]];
    } else if (donnees.length === 3) {
        return entreprise[donnees[0]][donnees[1]][donnees[2]];
    } else {
        return '';
    }
}

export function useFilteredDataMultipleFields(
    donnes: AlbumDataFields[],
    data: CompanyInfo[],
): ChartDataMultipleFileds[] {
    // Split the fields
    const donnesX: string[] = donnesSplit(donnes[0]);
    const donnesY: string[] = donnesSplit(donnes[1]);

    // Get the parameters for X and Y axes
    const Xparams: any = PossibleDataFileds.get(donnes[0]);
    const Yparams: any = PossibleDataFileds.get(donnes[1]);

    if (!Xparams || !Yparams) {
        return [
            { name: 'Group A', value1: 400, value2: 400 },
            { name: 'Group B', value1: 300, value2: 400 },
            { name: 'Group C', value1: 300, value2: 400 },
            { name: 'Group D', value1: 200, value2: 400 },
        ];
    }

    const results: ChartDataMultipleFileds[] = [];

    // Initialize the results array with X axis categories and set Y axis categories to 0
    if (Xparams && Yparams) {
        for (const x of Xparams) {
            const newValue: any = { name: x }; // Using 'any' here for flexibility

            // Dynamically create properties for Y axis categories
            for (const y of Yparams) {
                newValue[y] = 0;
            }

            results.push(newValue);
        }

        // Iterate through the data and populate the results
        data.forEach((company: any) => {
            const dataX = fetchNested(company, donnesX);
            const dataY = fetchNested(company, donnesY);

            const targetIndex = results.findIndex((res) => res.name === dataX);

            if (
                targetIndex !== -1 &&
                results[targetIndex][dataY] !== undefined
            ) {
                (results[targetIndex][dataY] as number) += 1;
            }
        });
    }

    return results;
}

export function useFilteredData(
    donnes: AlbumDataFields,
    data: CompanyInfo[],
): ChartData[] {
    const filters: string[] = donnesSplit(donnes);
    const returnTableauFields = PossibleDataFileds.get(donnes);
    if (!returnTableauFields) {
        return [
            { name: 'Group A', value: 400 },
            { name: 'Group B', value: 300 },
            { name: 'Group C', value: 300 },
            { name: 'Group D', value: 200 },
        ];
    }
    const returnTableau: ChartData[] = returnTableauFields.map(
        (field: string) => {
            return { name: field, value: 0 };
        },
    );

    data.forEach((entreprise: any) => {
        let param: string = fetchNested(entreprise, filters);

        const index = returnTableau.findIndex(
            (chartData: ChartData) => chartData.name === param,
        );
        if (index < 0) {
            returnTableau[returnTableau.length - 1].value++;
        } else {
            returnTableau[index].value++;
        }
    });
    return returnTableau;
}

export function addPercentageToSlice(props: any) {
    if (props.percent <= 0.05) return;

    const radius =
        props.innerRadius + (props.outerRadius - props.innerRadius) * 0.5;
    const x = props.cx + radius * Math.cos(-props.midAngle * (Math.PI / 180));
    const y = props.cy + radius * Math.sin(-props.midAngle * (Math.PI / 180));

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
            fontWeight={800}
            fontSize={13}
        >
            {`${(props.percent * 100).toFixed(0)}%`}
        </text>
    );
}
