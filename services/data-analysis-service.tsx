/* eslint-disable react-hooks/rules-of-hooks */
// chart-analysis.ts
import { ChartContent } from '@/components/interface/chart-content';
import {
    ChartData,
    ChartDataMultipleFileds,
} from '@/components/interface/chart-data';
import { AlbumDataFields } from '@/components/enums/data-types-enum';
import {
    useFilteredData,
    useFilteredDataMultipleFields,
} from '@/utils/chart-utils';
import { CompanyInfo } from '@/components/interface/company';

export function doubleHorizontalBarChartAnalysis(
    donnes: AlbumDataFields[],
    data: CompanyInfo[],
): ChartContent {
    const returnData: ChartDataMultipleFileds[] = useFilteredDataMultipleFields(
        donnes,
        data,
    );
    return {
        donnees: donnes,
        data: returnData,
        totalData: 400,
        median: 150,
    };
}

export function useDoughnutChartAnalysis(
    donnes: AlbumDataFields[],
    data: CompanyInfo[],
): ChartContent {
    const chartData = useFilteredData(donnes[0], data);

    return {
        donnees: donnes,
        data: chartData,
        totalData: data.length,
    };
}

export function useStackedBarChartAnalysis(
    donnes: AlbumDataFields[],
    data: CompanyInfo[],
): ChartContent {
    const returnData: ChartDataMultipleFileds[] = useFilteredDataMultipleFields(
        donnes,
        data,
    );

    return {
        donnees: donnes,
        data: returnData,
        totalData: 400,
        median: 150,
    };
}
