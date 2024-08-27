import { APIPaths } from '@/components/enums/page-api-paths-enum';
import { CompanyInfo } from '@/components/interface/company';
import axios from 'axios';

export const GraphDataHttpRequestService = {
    getAll: getAllData,
};

async function getAllData(): Promise<CompanyInfo[]> {
    try {
        const response = await axios.get(APIPaths.GRAPH_GET_ALL);
        return response.data.pages;
    } catch (error: any) {
        console.error(
            'Error fetching pages:',
            error.response?.data?.error || error.message,
        );
    }
    return [];
}
