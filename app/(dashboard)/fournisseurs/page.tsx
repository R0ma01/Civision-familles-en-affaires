'use client';

import PageContentContainer from '@/components/component/page-content-container/page-content-container';
import useMapStore from '@/stores/global-map-store';
import { useEffect, useState } from 'react';
import DataCard from '@/components/component/data-card/data-card';
import DataCardContent from '@/components/interface/data-card-content';
import { DataCardType } from '@/components/enums/data-card-type-enum';
import Button from '@/components/component/buttons/button';
import { EditFournisseurDialog } from '@/components/component/dialogs/edit-fournisseur-dialog';
import { ButtonType } from '@/components/enums/button-type-enum';
import { AdminSVG } from '@/components/component/svg-icons/svg-icons';
import useGlobalUserStore from '@/stores/global-user-store';
import { UserType } from '@/components/enums/user-type-enum';
import { MapType } from '@/components/enums/map-type-enum';
import { useFournisseurActions } from './use-fournisseur-actions';
import { Fournisseur } from '@/components/interface/fournisseur';
import DeleteItemDialog from '@/components/component/dialogs/delete-page-dialog';
import ListeFournisseurs from '@/components/component/liste-fournisseurs/liste-fournisseurs';
import useGlobalDataStore from '@/stores/global-data-store';

function Fournisseurs() {
    const { user } = useGlobalUserStore((state: any) => ({
        user: state.user,
    }));

    const {
        isEditDialogOpen,
        isDeleteDialogOpen,
        currentFournisseur,
        openEditDialog,
        closeEditDialog,
        submitEditDialog,
        openDeleteDialog,
        closeDeleteDialog,
        submitDeleteDialog,
        toggleFournisseurVisibility,
    } = useFournisseurActions();

    const { mapType, setMapStyle } = useMapStore((state) => ({
        setMapStyle: state.setMapStyle,
        mapType: state.mapType,
    }));

    const { fournisseurDataFetched, fetchFournisseurData, loading } =
        useGlobalDataStore((state: any) => ({
            fournisseurDataFetched: state.fournisseurDataFetched,
            fetchFournisseurData: state.fetchFournisseurData,
            loading: state.loading,
        }));

    useEffect(() => {
        async function fetch() {
            await fetchFournisseurData();
        }

        if (mapType !== MapType.FOURNISSEURS) {
            setMapStyle(MapType.FOURNISSEURS);
        }

        if (!fournisseurDataFetched && !loading) {
            fetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapType, setMapStyle]);

    return (
        <>
            <PageContentContainer
                filterMenu={true}
                className="overflow-auto pb-10 pl-[30px]"
            >
                <h1 className="text-2xl tracking-wide text-black dark:text-white z-10 mt-12 mb-2 cursor-default">
                    Fournisseurs
                </h1>
                {/* <DataCard content={content1} admin={user === UserType.ADMIN} /> */}
                <ListeFournisseurs
                    admin={user === UserType.ADMIN}
                    openEditDialog={openEditDialog}
                    openDeleteDialog={openDeleteDialog}
                    toggleFournisseurVisibility={toggleFournisseurVisibility}
                ></ListeFournisseurs>

                {isEditDialogOpen && currentFournisseur && (
                    <EditFournisseurDialog
                        closeDialog={closeEditDialog}
                        submitDialog={submitEditDialog}
                        fournisseur={currentFournisseur}
                    />
                )}
                {isDeleteDialogOpen && currentFournisseur && (
                    <DeleteItemDialog
                        closeDialog={closeDeleteDialog}
                        submitDialog={submitDeleteDialog}
                        deleteItem={currentFournisseur}
                    />
                )}
            </PageContentContainer>
        </>
    );
}

export default Fournisseurs;
