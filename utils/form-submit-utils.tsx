import {
    ResponseData,
    SetStatusFunction,
    FormData,
} from '@/components/interface/auth/form';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';

type Router = ReturnType<typeof useRouter>;

type ResetFormFunction = () => void;

const submitForm = async (
    route: string,
    formData: FormData,
    errorMessage: string,
    setSubmitting: (isSubmitting: boolean) => void,
    setStatus: SetStatusFunction,
    lang: string,
    resetForm: ResetFormFunction | null,
    redirectPath: string | null = null,
    router: Router,
    setUserToken: (tokenId: string, tokenValue: any) => void,
    setTutorials?: (tutorials: boolean[]) => void,
): Promise<void> => {
    try {
        const { status, data }: AxiosResponse<ResponseData> = await axios.post(
            `/api/auth/${route}`,
            {
                ...formData,
                lang,
            },
        );

        if (status === 200) {
            if (route === 'login') {
                setUserToken('token', data.token || '');
                setUserToken('adminToken', data.adminToken || '');

                if (setTutorials && data.tutorials) {
                    setTutorials(data.tutorials);
                }

                if (redirectPath) router.push(redirectPath);
            }

            if (resetForm) resetForm();

            setStatus({ success: data.message });

            if (redirectPath) {
                setTimeout(() => {
                    router.push(redirectPath);
                }, 1000);
            }
        } else {
            setStatus({ error: data.error });
        }
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            const { data } = error.response;
            setStatus({ error: data.error || errorMessage });
        } else {
            setStatus({ error: errorMessage });
        }
    }
    setSubmitting(false);
};

export default submitForm;
