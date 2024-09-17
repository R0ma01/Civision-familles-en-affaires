import {
    AlbumDataFields,
    DataBaseOrigin,
} from '@/components/enums/data-types-enum';
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
    getAllIndexeData: getAllIndexeData,
};

async function getAllStudyData(
    filters: Record<string, any>,
): Promise<MapChloroplethePointData[]> {
    try {
        const response = await axios.get(APIPaths.GRAPH_GET_ALL_STUDY, {
            params: {
                filters: JSON.stringify(filters),
            },
        });

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

async function getAllIndexeData(
    filters: Record<string, any>,
): Promise<MapChloroplethePointData[]> {
    try {
        const response = await axios.get(APIPaths.GRAPH_GET_ALL_INDEXE, {
            params: {
                filters: JSON.stringify(filters),
            },
        });

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
    donnes: any[],
    filters: Record<string, any>,
    dataOrigin: DataBaseOrigin,
): Promise<ChartData[] | ChartDataMultipleFileds[]> {
    try {
        let response = { data: { chartData: [] } };

        if (dataOrigin === DataBaseOrigin.INDEX_VOLETA) {
            response = await axios.get(APIPaths.GRAPH_GET_DATA_VOLETA, {
                params: {
                    donnes: JSON.stringify(donnes),
                    filters: JSON.stringify(filters),
                },
            });
        } else if (dataOrigin === DataBaseOrigin.INDEX_VOLETB) {
            response = await axios.get(APIPaths.GRAPH_GET_DATA_VOLETB, {
                params: {
                    donnes: JSON.stringify(donnes),
                    filters: JSON.stringify(filters),
                },
            });
        } else {
            response = await axios.get(APIPaths.GRAPH_GET_DATA_ALBUM, {
                params: {
                    donnes: JSON.stringify(donnes),
                    filters: JSON.stringify(filters),
                },
            });
        }
        console.log(response.data.chartData);
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
