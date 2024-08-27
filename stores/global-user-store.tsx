import { UserType } from '@/components/enums/user-type-enum';
import { create } from 'zustand';

interface GlobalState {
    user: UserType;
    setUser: (user: UserType) => void;
    tutorials: boolean[];
    setLoginTutorials: (tutorials: boolean[]) => void;
    updateCompletedTutorials: (tutorials: boolean[]) => void;
}

const useGlobalPageStore = create<GlobalState>((set, get) => ({
    user: UserType.VISITOR,
    setUser: (user: UserType) => {
        set({ user });
    },
    tutorials: [],
    setLoginTutorials: (tutorials: boolean[]) => {
        set({ tutorials });
    },
    updateCompletedTutorials: (tutorial: boolean[]) => {
        return;
    },
}));

export default useGlobalPageStore;
