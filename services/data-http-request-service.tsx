import { APIPaths } from '@/components/enums/page-api-paths-enum';
import { CompanyInfo } from '@/components/interface/company';
import { RepertoireData } from '@/components/interface/repertoire-data';
import axios from 'axios';

export const GraphDataHttpRequestService = {
    getAllStudyData: getAllStudyData,
    getAllRepertoireData: getAllRepertoireData,
};

async function getAllStudyData(): Promise<CompanyInfo[]> {
    try {
        console.log('hello');
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
