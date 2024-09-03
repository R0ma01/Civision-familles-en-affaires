import { MainDataFields } from '@/components/enums/data-types-enum';
import { APIPaths } from '@/components/enums/page-api-paths-enum';
import {
    ChartData,
    ChartDataMultipleFileds,
} from '@/components/interface/chart-data';
import { CompanyInfo } from '@/components/interface/company';
import { PointData } from '@/components/interface/point-data';
import { RepertoireData } from '@/components/interface/repertoire-data';
import axios from 'axios';

export const GraphDataHttpRequestService = {
    getAllStudyData: getAllStudyData,
    getAllRepertoireData: getAllRepertoireData,
    getChartData: getChartData,
    getEntrepriseInformation: getEntrepriseInformation,
};

async function getAllStudyData(): Promise<CompanyInfo[]> {
    try {
        const response = await axios.get(APIPaths.GRAPH_GET_ALL_STUDY);
        return response.data.pages;
    } catch (error: any) {
        console.error(
            'Error fetching pages:',
            error.response?.data?.error || error.message,
        );
    }
    return [];
}

async function getAllRepertoireData(): Promise<RepertoireData[]> {
    try {
        const response = await axios.get(APIPaths.GRAPH_GET_ALL_REPERTOIRE);

        return response.data.pages;
    } catch (error: any) {
        console.error(
            'Error fetching pages:',
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

async function getEntrepriseInformation(id: string): Promise<PointData> {
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
    return undefined as unknown as PointData;
}
