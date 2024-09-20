'use client';
import React, { useEffect, useState } from 'react';
import PageContentContainer from '@/components/component/page-content-container/page-content-container';
import ThemeCard from '@/components/component/theme-card/theme-card';
import useGlobalUserStore from '@/stores/global-user-store';
import { UserType } from '@/components/enums/user-type-enum';
// import PageEditDialog from '@/components/component/dialogs/edit-page-dialog';
import DeleteItemDialog from '@/components/component/dialogs/delete-page-dialog';
import { AddCircleSVG } from '@/components/component/svg-icons/svg-icons';
import { ButtonType } from '@/components/enums/button-type-enum';
import Button from '@/components/component/buttons/button';
import PageTabContent from '@/components/interface/page-tabs-content';
import useGlobalPageStore from '@/stores/global-page-store';
import { usePageActions } from './use-page-actions'; // Import the custom hook
import useMapStore from '@/stores/global-map-store';
import { MapType } from '@/components/enums/map-type-enum';
import { adminPromptsTranslations } from '@/constants/translations/admin-page-prompts';
import useDataStore from '@/reducer/dataStore';
import { AdminModal } from '@/components/component/admin-modal/admin-modal';
import { Language } from '@/components/enums/language';
import { PageHttpRequestService } from '@/services/page-http-request-service';

export default function Admin() {
    const lang: Language = useDataStore((state) => state.lang);
    const [pages, setPages] = useState<PageTabContent[]>([]);
    const newPage: PageTabContent = {
        title: adminPromptsTranslations.new_page_title[lang],
        description: adminPromptsTranslations.new_page_description[lang],
        tabs: [],
        backgroundImage: '',
        visible: false,
    };

    const { user } = useGlobalUserStore((state: any) => ({
        user: state.user,
    }));
    const [fetchData, setFetch] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetch() {
            console.log('i am called too');
            const newPages = await PageHttpRequestService.getAll();
            if (newPages) {
                setPages(newPages);
            } else {
                setFetch(false);
            }
            setLoading(false);
        }
        if (!fetchData && !loading) {
            console.log('i am called');
            setLoading(true);
            setFetch(true);
            fetch();
        }
    }, [pages, loading, fetchData]);

    const { mapType, setMapStyle } = useMapStore((state) => ({
        setMapStyle: state.setMapStyle,
        mapType: state.mapType,
    }));

    useEffect(() => {
        if (mapType !== MapType.PAGE_INFORMATION) {
            setMapStyle(MapType.PAGE_INFORMATION);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapType, setMapStyle]);

    const {
        isEditDialogOpen,
        isDeleteDialogOpen,
        currentPage,
        openEditDialog,
        closeEditDialog,

        openDeleteDialog,
        closeDeleteDialog,
    } = usePageActions();

    // useEffect(() => {
    //     console.log(pages);
    //     console.log(pagesData);
    //     console.log('pagesData was refreshed');
    //     if (pagesData !== null) setPages(pagesData);
    //     console.log('new Pages', pages);
    // }, [pagesData]);

    async function submitEditDialog(page: PageTabContent) {
        closeEditDialog();
        let resp = false;
        if (page._id) {
            console.log('fuck youuuuu');
            resp = await PageHttpRequestService.update(page);
            console.log(resp);
        } else {
            console.log('error');
            resp = await PageHttpRequestService.insert(page);
            console.log(resp);
        }

        if (resp) {
            setFetch(false);
            // const newPages = await PageHttpRequestService.getAll();
            // if (newPages) {
            //     setPages(newPages);
            //     console.log('should refresh pagesData');
            // }
            // setPages(newPages);
        }
    }

    async function submitDeleteDialog(id: string) {
        closeDeleteDialog();
        let resp = false;
        if (id) {
            console.log('fuck youuuuu');
            resp = await PageHttpRequestService.delete(id);
            console.log(resp);
        }

        if (resp) {
            setFetch(false);
            // const newPages = await PageHttpRequestService.getAll();
            // if (newPages) {
            //     setPages(newPages);
            //     console.log('should refresh pagesData');
            // }
            // setPages(newPages);
        }
    }

    async function togglePageVisibility(id: string | undefined) {
        let resp = false;
        if (id) {
            const page: PageTabContent = pages.filter(
                (pageItem) => pageItem._id === id,
            )[0];
            if (page) {
                page.visible = !page.visible;
                resp = await PageHttpRequestService.update(page);
            }
        }

        if (resp) {
            setFetch(false);
            // const newPages = await PageHttpRequestService.getAll();
            // if (newPages) {
            //     setPages(newPages);
            //     console.log('should refresh pagesData');
            // }
            // setPages(newPages);
        }
    }

    // useEffect(() => {
    //     console.log('pages is Set');
    //     console.log(pages);
    // }, [pages]);

    // async function submitDialog(page: PageTabContent) {
    //     const resp = await submitEditDialog(page);
    //     if (resp) {
    //         const newPagesData = { ...pages };
    //         console.log('CHA CHA MOTHER CLUCKING CHA');
    //     }
    // }

    // async function submitDelDialog(id: string) {
    //     await submitDeleteDialog(id);
    //     await refreshPageData();
    // }

    // async function toggleVis(page: PageTabContent) {
    //     await togglePageVisibility(page);
    //     await refreshPageData();
    // }

    // if (pageLoading) return <div>Loading...</div>;
    // if (pageError) return <div>Error: {pageError}</div>;

    return (
        <PageContentContainer className="h-screen overflow-y-auto relative flex items-center w-[100%]">
            <h1 className="text-2xl font-semibold tracking-wide text-black dark:text-white z-10 mt-10 mb-5 cursor-default">
                Page Administrative
            </h1>
            <div className="justify-center flex flex-col w-[80%] items-center">
                <div className="justify-center flex flex-wrap">
                    {pages
                        ? pages.map((page: PageTabContent, index: number) => (
                              <ThemeCard
                                  index={index.toString()}
                                  key={page._id || page.title} // Ensure unique key
                                  page={page}
                                  admin={user === UserType.ADMIN} // Correct comparison with user
                                  onClickEdit={() => openEditDialog(page)} // Pass page data to openEditDialog
                                  onClickDelete={() => openDeleteDialog(page)}
                                  onClickVisible={async () =>
                                      togglePageVisibility(page._id)
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
                // <PageEditDialog
                //     closeDialog={closeEditDialog}
                //     submitDialog={submitEditDialog}
                //     page={currentPage}
                // />
                <AdminModal
                    page={currentPage}
                    closeDialog={closeEditDialog}
                    submitDialog={submitEditDialog}
                ></AdminModal>
            )}
            {isDeleteDialogOpen && currentPage && (
                <DeleteItemDialog
                    closeDialog={closeDeleteDialog}
                    submitDialog={submitDeleteDialog}
                    deleteItem={currentPage}
                />
            )}
        </PageContentContainer>
    );
}
