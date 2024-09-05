'use client';
import React, { useEffect } from 'react';
import Carte from '@/components/component/carte/Carte';
import Sidebar from '@/components/component/sidebar/sidebar';
import useGlobalPageStore from '@/stores/global-page-store';
import MobileWarningPopup from '@/components/component/mobile-popup/mobile-popup';
import useGlobalFournisseursStore from '@/stores/global-fournisseur-store';

interface DashboardProps {
    children: any;
}

const Dashboard = ({ children }: DashboardProps) => {
    const { pagesData, pageLoading, pageError, fetchPageData } =
        useGlobalPageStore((state: any) => ({
            pagesData: state.pagesData,
            pageLoading: state.pageLoading,
            pageError: state.pageError,
            fetchPageData: state.fetchPageData,
        }));

    const { fournisseurData, fetchFournisseurData } =
        useGlobalFournisseursStore((state: any) => ({
            fournisseurData: state.fournisseurData,
            fetchFournisseurData: state.fetchFournisseurData,
        }));

    useEffect(() => {
        async function fetchAll() {
            if (!pagesData && !pageLoading) {
                await fetchPageData();
            }

            if (fournisseurData.length === 0) {
                await fetchFournisseurData();
            }
        }

        fetchAll();
    }, [pagesData, pageLoading, fetchPageData, fetchFournisseurData]);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            // Detect if this is a refresh
            if (!sessionStorage.getItem('isPageRefreshing')) {
                // Clear Zustand store and cookies only on tab/window close
                clearCookies();
                clearZustandStore();
            }
            // Set flag in sessionStorage for refresh detection
            sessionStorage.setItem('isPageRefreshing', 'true');
        };

        // Listen for the beforeunload event
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            // Clean up the event listener on component unmount
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <>
            <MobileWarningPopup />
            <div className="relative h-screen overflow-hidden">
                {pageLoading ? (
                    <div>Loading...</div>
                ) : pageError ? (
                    <div>Error: {pageError}</div>
                ) : (
                    <>
                        <div className="fixed top-0 left-0 w-full h-full">
                            <Carte />
                        </div>
                        <div className="flex h-full">
                            <Sidebar />
                            {children}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Dashboard;

// Helper to clear cookies
function clearCookies() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie =
            name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }
}

function clearZustandStore() {
    // Replace 'zustand_store_key' with the actual key used by Zustand in localStorage
    localStorage.removeItem('global-data-store');
    localStorage.removeItem('global-page-store');
    localStorage.removeItem('global-user-store');
}
