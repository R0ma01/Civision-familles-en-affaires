'use client';
import React, { useEffect } from 'react';
import Carte from '@/components/component/carte/Carte';
import Sidebar from '@/components/component/sidebar/sidebar';
import useGlobalPageStore from '@/stores/global-page-store';
import MobileWarningPopup from '@/components/component/mobile-popup/mobile-popup';
import { LanguageToggle } from '@/components/component/language-toggle/language-toggle';
import useGlobalUserStore from '@/stores/global-user-store';
import { UserType } from '@/components/enums/user-type-enum';
import { Language } from '@/components/enums/language';
import { SharedPromptsTranslations } from '@/constants/translations/page-prompts';
import useDataStore from '@/reducer/dataStore';

interface DashboardProps {
    children: any;
}

const Dashboard = ({ children }: DashboardProps) => {
    const lang: Language = useDataStore((state) => state.lang);
    console.log('hello');

    const { user, setUser } = useGlobalUserStore((state: any) => ({
        user: state.user,
        setUser: state.setUser,
    }));

    // useEffect(() => {
    //     const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    //         // Detect if this is a refresh

    //         clearZustandStore();
    //         const token = localStorage.getItem('token');
    //         const adminToken = localStorage.getItem('adminToken');

    //         console.log(token, adminToken);

    //         if (token && !adminToken) {
    //             setUser(UserType.USER);
    //         } else if (token && adminToken) {
    //             setUser(UserType.ADMIN);
    //         }
    //     };

    //     // Listen for the beforeunload event
    //     window.addEventListener('beforeunload', handleBeforeUnload);

    //     return () => {
    //         // Clean up the event listener on component unmount
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    // }, [setUser]);

    return (
        <>
            <MobileWarningPopup />
            <div className="relative h-screen overflow-hidden">
                {/* {pageLoading ? (
                    <div>{SharedPromptsTranslations.loading[lang]}</div>
                ) : pageError ? (
                    <div>
                        {SharedPromptsTranslations.error[lang]} {pageError}
                    </div>
                ) : ( */}
                <>
                    <div className="relative w-full h-full">
                        <LanguageToggle className="absolute top-1 right-1 z-20"></LanguageToggle>
                        <div className="fixed top-0 left-0 w-full h-full">
                            <Carte />
                        </div>
                        <div className="flex h-full absolute top-0">
                            <Sidebar />
                            {children}
                        </div>
                    </div>
                </>
            </div>
        </>
    );
};

export default Dashboard;

// Helper to clear cookies
function clearCookies() {
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
}

function clearZustandStore() {
    // Replace 'zustand_store_key' with the actual key used by Zustand in localStorage
    localStorage.removeItem('global-data-store');
    localStorage.removeItem('global-page-store');
    localStorage.removeItem('global-user-store');
}
