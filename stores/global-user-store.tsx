import { UserType } from '@/components/enums/user-type-enum';
import { UserHttpRequestService } from '@/services/user-http-request-service';
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface GlobalState {
    checkToken: () => UserType;
    tutorials: boolean[];
    setLoginTutorials: (tutorials: boolean[]) => void;
    updateCompletedTutorials: (tutorials: boolean[]) => void;
}

const useGlobalUserStore = create(
    devtools(
        persist(
            (set) => ({
                checkToken: async () => {
                    console.log('Checking token validity...');
                    // Call the server to check connection and admin status asynchronously
                    const isConnected =
                        await UserHttpRequestService.checkConnect();
                    const isAdmin = await UserHttpRequestService.checkAdmin();

                    // Set the user type based on server response
                    if (isConnected) {
                        if (isAdmin) {
                            return UserType.ADMIN; // Set user as Admin
                        } else {
                            return UserType.USER; // Set user as regular User
                        }
                    } else {
                        return UserType.VISITOR; // Set user as Visitor if not connected
                    }
                },
                setUserToken: (tokenId: string, tokenValue: any) => {
                    try {
                        if (tokenValue || tokenValue === '') {
                            localStorage.setItem(tokenId, tokenValue);
                        } else {
                            localStorage.removeItem(tokenId);
                        }
                    } catch (e: any) {
                        console.error(
                            'Something went wrong trying to put them tokens',
                            e.message,
                        );
                    }
                },
                tutorials: [],
                setLoginTutorials: async (tutorials: boolean[]) => {
                    set({ tutorials });
                },
                updateCompletedTutorials: async (tutorials: boolean[]) => {
                    set({ tutorials });
                    await UserHttpRequestService.updateTutorials(tutorials);
                },
            }),
            {
                name: 'global-user-store', // unique name for local storage
            },
        ),
    ),
);

export default useGlobalUserStore;
