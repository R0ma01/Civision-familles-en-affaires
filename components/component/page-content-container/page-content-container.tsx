import React from 'react';
import { VisibleSVG, InvisibleSVG } from '../svg-icons/svg-icons';
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
    fournisseurFilterMenu = false,
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
                    className={`ml-[40px] h-screen flex flex-col justify-start ${className}`}
                >
                    {children}
                </div>
            )}
            {filterMenu || fournisseurFilterMenu ? (
                <FilterMenu
                    toggleContentVisibility={toggleVisibility}
                    fournisseurMenu={fournisseurFilterMenu}
                ></FilterMenu>
            ) : (
                ''
            )}
        </>
    );
};

export default PageContentContainer;
