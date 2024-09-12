'use client';
import React, { useEffect } from 'react';
import Carte from '@/components/component/carte/Carte';
import Sidebar from '@/components/component/sidebar/sidebar';
import useGlobalPageStore from '@/stores/global-page-store';
import MobileWarningPopup from '@/components/component/mobile-popup/mobile-popup';

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

    useEffect(() => {
        async function fetchAll() {
            if (!pagesData && !pageLoading) {
                await fetchPageData();
            }
        }

        fetchAll();
    }, [pagesData, pageLoading, fetchPageData]);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            // Detect if this is a refresh
            clearCookies();
            clearZustandStore();
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
                        {/* <button
                            onClick={() => {
                                clearCookies();
                                clearZustandStore();
                            }}
                            className="absolute top-0 right-0"
                        >
                    
                        </button> */}
                    </>
                )}
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
