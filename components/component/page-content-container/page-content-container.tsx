import React from 'react';
import FilterMenu from '../filter-menu/filter-menu';

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
            {isContentVisible && (
                <div
                    id="page-content-container"
                    className={`scroll-hide overflow-auto ml-[40px] h-screen flex flex-col justify-start ${className}`}
                >
                    {children}
                </div>
            )}

            {filterMenu ? (
                <FilterMenu
                    toggleContentVisibility={toggleVisibility}
                ></FilterMenu>
            ) : (
                ''
            )}
        </>
    );
};

export default PageContentContainer;
