import { APIPaths } from '@/components/enums/page-api-paths-enum';
import { Fournisseur } from '@/components/interface/fournisseur';
import axios from 'axios';
import { DefaultLegendContent } from 'recharts';

export const FournisseursHttpRequestService = {
    getAll: getAllData,
    updateOne: updateOne,
    addOne: addOne,
    deleteOne: deleteOne,
};

async function getAllData(): Promise<Fournisseur[]> {
    try {
        const response = await axios.get(APIPaths.FOURNISSEURS_GET_ALL);
        return response.data.pages;
    } catch (error: any) {
        console.error(
            'Error fetching fournisseurs:',
            error.response?.data?.error || error.message,
        );
    }
    return [];
}

async function updateOne(): Promise<Fournisseur[]> {
    try {
        const response = await axios.get(APIPaths.FOURNISSEURS_GET_ALL);
        return response.data.pages;
    } catch (error: any) {
        console.error(
            'Error fetching fournisseurs:',
            error.response?.data?.error || error.message,
        );
    }
    return [];
}

async function addOne(): Promise<Fournisseur[]> {
    try {
        const response = await axios.get(APIPaths.FOURNISSEURS_GET_ALL);
        return response.data.pages;
    } catch (error: any) {
        console.error(
            'Error fetching fournisseurs:',
            error.response?.data?.error || error.message,
        );
    }
    return [];
}

async function deleteOne(): Promise<Fournisseur[]> {
    try {
        const response = await axios.get(APIPaths.FOURNISSEURS_GET_ALL);
        return response.data.pages;
    } catch (error: any) {
        console.error(
            'Error fetching fournisseurs:',
            error.response?.data?.error || error.message,
        );
    }
    return [];
}
