'use client';

import PageContentContainer from '@/components/component/page-content-container/page-content-container';
import useMapStore from '@/stores/global-map-store';
import { useEffect, useState } from 'react';
import DataCard from '@/components/component/data-card/data-card';
import DataCardContent from '@/components/interface/data-card-content';
import { DataCardType } from '@/components/enums/data-card-type-enum';
import Button from '@/components/component/buttons/button';
import { AddFournisseurDialog } from '@/components/component/dialogs/add-fournisseur-dialog';
import { ButtonType } from '@/components/enums/button-type-enum';
import { AdminSVG } from '@/components/component/svg-icons/svg-icons';
import useGlobalUserStore from '@/stores/global-user-store';
import { UserType } from '@/components/enums/user-type-enum';

function Fournisseurs() {
    const { mapType, setMapStyle } = useMapStore((state) => {
        return { mapType: state.mapType, setMapStyle: state.setMapStyle };
    });

    const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);

    const { user } = useGlobalUserStore((state: any) => ({
        user: state.user,
    }));

    useEffect(() => {
        if (mapType) {
            setMapStyle(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapType]);

    const content1: DataCardContent = {
        title: 'Liste des Fournisseurs',
        description: '',
        type: DataCardType.FOURNISSEURS,
        graphData: [],
    };

    function openDialog(e: any) {
        e.preventDefault();
        setEditDialogOpen(true);
    }

    function closeDialog(e: any) {
        e.preventDefault();
        setEditDialogOpen(false);
    }

    function handleSubmit() {
        setEditDialogOpen(false);
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
                {user !== UserType.ADMIN && (
                    <Button
                        buttonType={ButtonType.ICON}
                        onClick={openDialog}
                        className="w-20 h-20"
                    >
                        <AdminSVG className="w-full h-full"></AdminSVG>
                    </Button>
                )}
                {editDialogOpen && (
                    <AddFournisseurDialog
                        handleSubmit={handleSubmit}
                        closeDialog={closeDialog}
                    />
                )}
            </PageContentContainer>
        </>
    );
}

export default Fournisseurs;
