import React from 'react';
import FilterMenu from '@/components/component/menus/filter-menu';
import MapMenu from '@/components/component/menus/map-menu';
import Sidebar from '../sidebar/sidebar';

type PageContentContainerProps = {
    children: React.ReactNode;
    className?: string;
    filterMenu?: boolean;
    fournisseurFilterMenu?: boolean;
};

const PageContentContainer: React.FC<PageContentContainerProps> = ({
    className = '',
    children,
    filterMenu = false,
}) => {
    const [isContentVisible, setIsContentVisible] = React.useState(true);

    const toggleVisibility = () => {
        setIsContentVisible((prev) => !prev);
    };

    return (
        <>
            <Sidebar />
            {isContentVisible && (
                <div
                    id="page-content-container"
                    className={`scroll-hide overflow-auto ml-[40px] h-screen flex flex-col justify-start ${className} realtive`}
                >
                    {children}
                </div>
            )}

            {filterMenu ? (
                <>
                    <FilterMenu
                        toggleContentVisibility={toggleVisibility}
                        className="fixed top-5 right-2 z-20"
                    ></FilterMenu>
                    <MapMenu className="fixed bottom-10 right-2"></MapMenu>
                </>
            ) : (
                ''
            )}
        </>
    );
};

export default PageContentContainer;
