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

    const emptyFournisseur = {
        contact: {
            lastName: '',
            firstName: '',
            email: '',
            cellPhone: '',
            company: '',
            title: '',
            linkedin: '',
        },
        secteurs_geographique: [],
        services_offerts: [],
    };

    useEffect(() => {
        if (mapType !== MapType.FOURNISSEURS) {
            setMapStyle(MapType.FOURNISSEURS);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapType, setMapStyle]);

    const content1: DataCardContent = {
        title: 'Liste des Fournisseurs',
        description: '',
        type: DataCardType.FOURNISSEURS,
        graphData: [],
    };

    function openDialog(e: any) {
        e.preventDefault();
        openEditDialog(emptyFournisseur as unknown as Fournisseur);
    }

    function closeDialog(e: any) {
        e.preventDefault();
        openEditDialog(emptyFournisseur as unknown as Fournisseur);
    }

    return (
        <>
            <PageContentContainer
                filterMenu={true}
                fournisseurFilterMenu={true}
                className="overflow-auto pb-10 pl-[30px]"
            >
                <h1 className="text-2xl tracking-wide text-black dark:text-white z-10 mt-12 mb-2 cursor-default">
                    Fournisseurs
                </h1>
                <DataCard content={content1} />
                {user === UserType.ADMIN && (
                    <Button
                        buttonType={ButtonType.ICON}
                        onClick={openDialog}
                        className="w-20 h-20"
                    >
                        <AdminSVG className="w-full h-full"></AdminSVG>
                    </Button>
                )}
                {isEditDialogOpen && (
                    <EditFournisseurDialog
                        closeDialog={closeDialog}
                        submitDialog={submitEditDialog}
                        fournisseur={emptyFournisseur as unknown as Fournisseur}
                    />
                )}
            </PageContentContainer>
        </>
    );
}

export default Fournisseurs;
