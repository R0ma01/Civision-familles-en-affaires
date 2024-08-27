import { useEffect } from 'react';
import Button from '@/components/component/buttons/button';
import { useRouter } from 'next/navigation';
import { PagePaths } from '@/components/enums/page-paths-enum';
import axios from 'axios';
import DisconnectDialogProps from '@/components/interface/auth/disconnect-confirmation-dialog';
import Modal from '@/components/component/modal/modal';
import useGlobalUserStore from '@/stores/global-user-store';
import { UserType } from '@/components/enums/user-type-enum';

const DisconnectDialog: React.FC<DisconnectDialogProps> = ({ closeDialog }) => {
    const router = useRouter();

    const { setUser, setLoginTutorials } = useGlobalUserStore((state: any) => ({
        setUser: state.setUser,
        setLoginTutorials: state.setLoginTutorials,
    }));

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
                setUser(UserType.VISITOR);
                setLoginTutorials([]);
                router.push(PagePaths.HOME);
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
        <Modal title="Êtes-vous sûr de vouloir vous déconnecter?">
            <div className="flex flex-row justify-evenly">
                <Button onClick={closeDialog}>Annuler</Button>
                <Button onClick={handleDisconnect}>Se Déconnecter</Button>
            </div>
        </Modal>
    );
};

export default DisconnectDialog;
