import { useEffect } from 'react';
import Button from '@/components/component/buttons/button';
import { useRouter } from 'next/navigation';
import { PagePaths } from '@/components/enums/page-paths-enum';
import axios from 'axios';
import DisconnectDialogProps from '@/components/interface/auth/disconnect-confirmation-dialog';
import Modal from '@/components/component/modal/modal';
import useGlobalUserStore from '@/stores/global-user-store';
import {
    SharedPromptsTranslations,
    ConnexionDialogPromptsTranslations,
} from '@/constants/translations/page-prompts';
import { Language } from '@/components/enums/language';
import useDataStore from '@/reducer/dataStore';

const DisconnectDialog: React.FC<DisconnectDialogProps> = ({ closeDialog }) => {
    const router = useRouter();
    const lang: Language = useDataStore((state) => state.lang);

    const { setLoginTutorials, setUserToken } = useGlobalUserStore(
        (state: any) => ({
            setLoginTutorials: state.setLoginTutorials,
            setUserToken: state.setUserToken,
        }),
    );

    function clearCookies() {
        setUserToken('token', undefined);
        setUserToken('adminToken', undefined);
    }

    function clearZustandStore() {
        // Replace 'zustand_store_key' with the actual key used by Zustand in localStorage
        localStorage.removeItem('global-data-store');
        //localStorage.removeItem('global-page-store');
    }

    useEffect(() => {
        const handleEsc = (event: any) => {
            if (event.keyCode === 27) {
                closeDialog();
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [closeDialog]);

    const handleDisconnect = async (e: any) => {
        e.preventDefault();

        try {
            const response = await axios.post(`/api/auth/logout`, {});

            if (response.status === 200) {
                clearCookies();
                clearZustandStore();
                router.push(PagePaths.HOME);
                setLoginTutorials([]);

                closeDialog();
            } else {
                console.error('Failed to log out');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            router.push(PagePaths.HOME);
            closeDialog();
        }
    };

    return (
        <Modal
            title={
                ConnexionDialogPromptsTranslations.disconnect_confirmation[lang]
            }
        >
            <div className="flex flex-row justify-evenly">
                <Button onClick={closeDialog}>
                    {SharedPromptsTranslations.cancel[lang]}
                </Button>
                <Button onClick={handleDisconnect}>
                    {SharedPromptsTranslations.confirm[lang]}
                </Button>
            </div>
        </Modal>
    );
};

export default DisconnectDialog;
// Helper to clear cookies
