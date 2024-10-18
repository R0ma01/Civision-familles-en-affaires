import axios from 'axios';
import { APIPaths } from '@/components/enums/page-api-paths-enum';

export const UserHttpRequestService = {
    updateTutorials,
    checkAdmin,
    checkConnect,
};

async function updateTutorials(tutorials: boolean[]): Promise<void> {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.patch(APIPaths.USER_UPDATE_TUTORIALS, {
            token,
            tutorials,
        });
    } catch (error: any) {
        console.error(
            'Error updating user tutorials:',
            error.response?.error || error.message,
        );
    }
}

async function checkAdmin(): Promise<boolean> {
    try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.post(APIPaths.USER_CHECK_ADMIN, {
            token: JSON.stringify(token),
        });

        // Assuming the response has a boolean indicating admin status
        return response.data.valid; // Adjust this based on your actual API response structure
    } catch (error: any) {
        console.error(
            'Error checking admin status:',
            error.response?.error || error.message,
        );
        return false;
    }
}

async function checkConnect(): Promise<boolean> {
    try {
        const token = localStorage.getItem('token');
        console.log('FETCHED TOKEN : ', token);
        const response = await axios.post(APIPaths.USER_CHECK_CONNECT, {
            token: JSON.stringify(token),
        });

        // Assuming the response has a boolean indicating connection status
        return response.data.valid; // Adjust this based on your actual API response structure
    } catch (error: any) {
        console.error(
            'Error checking connection status:',
            error.response?.error || error.message,
        );
        return false;
    }
}
