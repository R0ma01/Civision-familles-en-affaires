'use client';
import React, { useEffect } from 'react';
import Carte from '@/components/component/carte/Carte';
import Sidebar from '@/components/component/sidebar/sidebar';
import { UserProvider } from '@/context/user-context';
import useGlobalDataStore from '@/stores/global-data-store';
import useGlobalPageStore from '@/stores/global-page-store';
import MobileWarningPopup from '@/components/component/mobile-popup/mobile-popup';
import useGlobalFournisseursStore from '@/stores/global-fournisseur-store';

interface DashboardProps {
    children: any;
}

const Dashboard = ({ children }: DashboardProps) => {
    const { companyData, fetchData, loading, error } = useGlobalDataStore(
        (state: any) => ({
            companyData: state.companyData,
            fetchData: state.fetchData,
            loading: state.loading,
            error: state.error,
        }),
    );

    const { pagesData, fetchPageData, pageLoading, pageError } =
        useGlobalPageStore();

    const { fournisseurData, fetchFournisseurData } =
        useGlobalFournisseursStore((state: any) => ({
            fournisseurData: state.fournisseurData,
            fetchFournisseurData: state.fetchFournisseurData,
        }));

    useEffect(() => {
        async function fetchAll() {
            if (companyData.length === 0 && !loading) {
                await fetchData();
            }

            if (!pagesData && !pageLoading) {
                await fetchPageData();
            }

            if (fournisseurData.length === 0) {
                console.log('dfemkofe');
                await fetchFournisseurData();
            }
        }

        fetchAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        companyData.length,
        loading,
        pagesData,
        pageLoading,
        fetchData,
        fetchPageData,
    ]);

    // if (loading || pageLoading) return <div>Loading...</div>;
    // if (error || pageError) return <div>Error: {error || pageError}</div>;

    return (
        <UserProvider>
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
        </UserProvider>
    );
};

export default Dashboard;
