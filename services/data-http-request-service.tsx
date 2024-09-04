import { MainDataFields } from '@/components/enums/data-types-enum';
import { APIPaths } from '@/components/enums/page-api-paths-enum';
import {
    ChartData,
    ChartDataMultipleFileds,
} from '@/components/interface/chart-data';
import { CompanyInfo } from '@/components/interface/company';
import {
    EntreprisePointData,
    MapChloroplethePointData,
    MapClusterPointData,
} from '@/components/interface/point-data';

import axios from 'axios';

export const GraphDataHttpRequestService = {
    getAllStudyData: getAllStudyData,
    getAllRepertoireData: getAllRepertoireData,
    getChartData: getChartData,
    getEntrepriseInformation: getEntrepriseInformation,
};

async function getAllStudyData(
    filters: CompanyInfo,
): Promise<MapChloroplethePointData[]> {
    try {
        const response = await axios.get(APIPaths.GRAPH_GET_ALL_STUDY, {
            params: {
                filters: JSON.stringify(filters),
            },
        });

        console.log(response);

        return response.data.points;
    } catch (error: any) {
        console.error(
            'Error fetching points:',
            error.response?.data?.error || error.message,
        );
    }
    return [];
}

async function getAllRepertoireData(): Promise<MapClusterPointData[]> {
    try {
        const response = await axios.get(APIPaths.GRAPH_GET_ALL_REPERTOIRE);

        return response.data.points;
    } catch (error: any) {
        console.error(
            'Error fetching points:',
            error.response?.data?.error || error.message,
        );
    }
    return [];
}

async function getChartData(
    donnes: MainDataFields[],
    filters: CompanyInfo,
): Promise<ChartData[] | ChartDataMultipleFileds[]> {
    try {
        const response = await axios.get(APIPaths.GRAPH_GET_DATA, {
            params: {
                donnes: JSON.stringify(donnes),
                filters: JSON.stringify(filters),
            },
        });

        return response.data.chartData;
    } catch (error: any) {
        console.error(
            'Error fetching chartData:',
            error.response?.data?.error || error.message,
        );
    }
    return [];
}

async function getEntrepriseInformation(
    id: string,
): Promise<EntreprisePointData> {
    try {
        const response = await axios.get(APIPaths.MAP_GET_ENTREPRISE, {
            params: {
                id: id,
            },
        });

        return response.data.entreprise;
    } catch (error: any) {
        console.error(
            'Error fetching entreprise:',
            error.response?.data?.error || error.message,
        );
    }
    return undefined as unknown as EntreprisePointData;
}
