'use client';
import React, { useEffect } from 'react';
import PageContentContainer from '@/components/component/page-content-container/page-content-container';
import ThemeCard from '@/components/component/theme-card/theme-card';
import useGlobalUserStore from '@/stores/global-user-store';
import { UserType } from '@/components/enums/user-type-enum';
import PageEditDialog from '@/components/component/dialogs/edit-page-dialog';
import PageDeleteDialog from '@/components/component/dialogs/delete-page-dialog';
import { AddCircleSVG } from '@/components/component/svg-icons/svg-icons';
import { ButtonType } from '@/components/enums/button-type-enum';
import Button from '@/components/component/buttons/button';
import PageContent from '@/components/interface/page-content';
import useGlobalPageStore from '@/stores/global-page-store';
import { usePageActions } from './use-page-actions'; // Import the custom hook
import useMapStore from '@/stores/global-map-store';

const newPage: PageContent = {
    title: 'Votre titre ICI',
    description: 'Votre description ICI',
    cards: [],
    backgroundImage: '',
    visible: false,
};

export default function Admin() {
    const { pagesData, pageLoading, pageError, refreshPageData } =
        useGlobalPageStore();
    const { user } = useGlobalUserStore((state: any) => ({
        user: state.user,
    }));

    const { mapType, setMapStyle } = useMapStore((state) => {
        return { mapType: state.mapType, setMapStyle: state.setMapStyle };
    });

    useEffect(() => {
        if (!mapType) {
            setMapStyle(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapType]);

    const {
        isEditDialogOpen,
        isDeleteDialogOpen,
        currentPage,
        openEditDialog,
        closeEditDialog,
        submitEditDialog,
        openDeleteDialog,
        closeDeleteDialog,
        submitDeleteDialog,
        togglePageVisibility,
    } = usePageActions();

    useEffect(() => {
        if (pagesData === null) {
            refreshPageData();
        }
    }, [pagesData, refreshPageData]);

    if (pageLoading) return <div>Loading...</div>;
    if (pageError) return <div>Error: {pageError}</div>;

    return (
        <PageContentContainer className="h-screen overflow-y-auto relative flex items-center w-[100%]">
            <h1 className="text-2xl font-semibold tracking-wide text-black dark:text-white z-10 mt-10 mb-5 cursor-default">
                Page Administrative
            </h1>
            <div className="justify-center flex flex-col w-[80%] items-center">
                <div className="justify-center flex flex-wrap">
                    {pagesData
                        ? pagesData.map((page, index) => (
                              <ThemeCard
                                  index={index.toString()}
                                  key={page._id || page.title} // Ensure unique key
                                  page={page}
                                  admin={user === UserType.ADMIN} // Correct comparison with user
                                  onClickEdit={() => openEditDialog(page)} // Pass page data to openEditDialog
                                  onClickDelete={() => openDeleteDialog(page)}
                                  onClickVisible={() =>
                                      togglePageVisibility(page)
                                  }
                              />
                          ))
                        : 'No pages available'}
                </div>
                <Button
                    buttonType={ButtonType.ICON}
                    onClick={() => openEditDialog(newPage)}
                >
                    <AddCircleSVG className="w-[100px] h-[100px] fill-black dark:fill-white" />
                </Button>
            </div>
            {isEditDialogOpen && currentPage && (
                <PageEditDialog
                    closeDialog={closeEditDialog}
                    submitDialog={submitEditDialog}
                    page={currentPage}
                />
            )}
            {isDeleteDialogOpen && currentPage && (
                <PageDeleteDialog
                    closeDialog={closeDeleteDialog}
                    submitDialog={submitDeleteDialog}
                    page={currentPage}
                />
            )}
        </PageContentContainer>
    );
}
