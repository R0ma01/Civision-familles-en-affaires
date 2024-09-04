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
        useGlobalPageStore((state: any) => {
            return {
                pagesData: state.pagesData,
                pageLoading: state.pageLoading,
                pageError: state.pageError,
                fetchPageData: state.fetchPageData,
            };
        });

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagesData, pageLoading, fetchPageData, fetchFournisseurData]);

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
