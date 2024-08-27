import { UserType } from '@/components/enums/user-type-enum';
import { UserHttpRequestService } from '@/services/user-http-request-service';
import { create } from 'zustand';

interface GlobalState {
    user: UserType;
    setUser: (user: UserType) => void;
    tutorials: boolean[];
    setLoginTutorials: (tutorials: boolean[]) => void;
    updateCompletedTutorials: (tutorials: boolean[]) => void;
}

const useGlobalUserStore = create<GlobalState>((set) => ({
    user: UserType.VISITOR,
    setUser: (user: UserType) => {
        set({ user });
    },
    tutorials: [],
    setLoginTutorials: async (tutorials: boolean[]) => {
        set({ tutorials });
    },
    updateCompletedTutorials: async (tutorials: boolean[]) => {
        set({ tutorials });
        await UserHttpRequestService.updateTutorials(tutorials);
    },
}));

export default useGlobalUserStore;
