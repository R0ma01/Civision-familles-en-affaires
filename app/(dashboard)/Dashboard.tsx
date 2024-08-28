'use client';
import React, { useEffect } from 'react';
import Carte from '@/components/component/carte/Carte';
import Sidebar from '@/components/component/sidebar/sidebar';
import useGlobalDataStore from '@/stores/global-data-store';
import useGlobalPageStore from '@/stores/global-page-store';
import MobileWarningPopup from '@/components/component/mobile-popup/mobile-popup';
import useGlobalFournisseursStore from '@/stores/global-fournisseur-store';

interface DashboardProps {
    children: any;
}

const Dashboard = ({ children }: DashboardProps) => {
    const {
        studyCompanyData,
        repertoireCompanyData,
        fetchData,
        loading,
        error,
    } = useGlobalDataStore((state: any) => ({
        studyCompanyData: state.studyCompanyData,
        repertoireCompanyData: state.repertoireCompanyData,
        fetchData: state.fetchData,
        loading: state.loading,
        error: state.error,
    }));

    const { pagesData, fetchPageData, pageLoading, pageError } =
        useGlobalPageStore();

    const { fournisseurData, fetchFournisseurData } =
        useGlobalFournisseursStore((state: any) => ({
            fournisseurData: state.fournisseurData,
            fetchFournisseurData: state.fetchFournisseurData,
        }));

    useEffect(() => {
        async function fetchAll() {
            if (
                studyCompanyData.length === 0 &&
                repertoireCompanyData.length === 0 &&
                !loading
            ) {
                await fetchData();
            }

            if (!pagesData && !pageLoading) {
                await fetchPageData();
            }

            if (fournisseurData.length === 0) {
                await fetchFournisseurData();
            }
        }

        fetchAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        studyCompanyData.length,
        repertoireCompanyData.length,
        loading,
        pagesData,
        pageLoading,
        fetchData,
        fetchPageData,
        fetchFournisseurData,
    ]);

    return (
        <>
            <MobileWarningPopup />
            <div className="relative h-screen overflow-hidden">
                {loading || pageLoading ? (
                    <div>Loading...</div>
                ) : error || pageError ? (
                    <div>Error: {error || pageError}</div>
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
