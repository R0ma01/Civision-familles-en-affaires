import { useState } from 'react';
import { PageHttpRequestService } from '@/services/page-http-request-service';
import useGlobalPageStore from '@/stores/global-page-store';
import PageContent from '@/components/interface/page-content';

export function usePageActions() {
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<PageContent | null>(null);

    const { refreshPageData } = useGlobalPageStore();

    const openEditDialog = (page: PageContent) => {
        setCurrentPage(page);
        setEditDialogOpen(true);
    };

    const closeEditDialog = () => {
        setEditDialogOpen(false);
        setCurrentPage(null);
    };

    const submitEditDialog = async (page: PageContent) => {
        if (page._id) {
            await PageHttpRequestService.update(page);
        } else {
            await PageHttpRequestService.insert(page);
        }
        await refreshPageData();
        closeEditDialog();
    };

    const openDeleteDialog = (page: PageContent) => {
        setCurrentPage(page);
        setDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setCurrentPage(null);
    };

    const submitDeleteDialog = async (id?: string) => {
        if (id) {
            await PageHttpRequestService.delete(id);
            await refreshPageData();
        }
        closeDeleteDialog();
    };

    const togglePageVisibility = async (page: PageContent) => {
        if (page) {
            const newPage = { ...page, visible: !page.visible };
            await PageHttpRequestService.update(newPage);
            await refreshPageData();
        }
    };

    return {
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
    };
}
