import PageContent from '@/components/interface/page-content';
import axios from 'axios';
import { APIPaths } from '@/components/enums/page-api-paths-enum';
import PageTabContent from '@/components/interface/page-tabs-content';

export const PageHttpRequestService = {
    insert: insertPage,
    update: updatePage,
    delete: deletePage,
    getAll: getAllPages,
    get: getPage,
    getTabPage: getTabPage,
};

async function insertPage(pageData: any) {
    try {
        const response = await axios.post(APIPaths.PAGE_INSERT, pageData);
    } catch (error: any) {
        console.error(
            'Error inserting document:',
            error.response ? error.response.data : error.message,
        );
    }
}

async function updatePage(pageData: PageContent) {
    try {
        const response = await axios.patch(APIPaths.PAGE_UPDATE, pageData);
    } catch (error: any) {
        console.error(
            'Error updating page:',
            error.response ? error.response.data : error.message,
        );
    }
}

async function deletePage(_id: any) {
    try {
        const response = await axios.delete(APIPaths.PAGE_DELETE, {
            params: { _id },
        });
    } catch (error: any) {
        console.error(
            'Error deleting page:',
            error.response?.data?.error || error.message,
        );
    }
}

async function getAllPages(): Promise<PageContent[]> {
    try {
        const response = await axios.get(APIPaths.PAGE_GET_ALL);
        return response.data.pages;
    } catch (error: any) {
        console.error(
            'Error fetching pages:',
            error.response?.data?.error || error.message,
        );
    }
    return [];
}

async function getPage(_id: string): Promise<PageContent | undefined> {
    try {
        const response = await axios.get(APIPaths.PAGE_GET_ONE, {
            params: { _id },
        });
        return response.data.page;
    } catch (error: any) {
        console.error(
            'Error fetching page:',
            error.response?.data?.error || error.message,
        );
    }
    return undefined;
}

async function getTabPage(_id: string): Promise<PageTabContent | undefined> {
    try {
        const response = await axios.get(APIPaths.PAGE_GET_ONE_TABS, {
            params: { _id },
        });
        return response.data.page;
    } catch (error: any) {
        console.error(
            'Error fetching page:',
            error.response?.data?.error || error.message,
        );
    }
    return undefined;
}
