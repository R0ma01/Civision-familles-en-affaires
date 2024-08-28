import React, { useState } from 'react';
import Button from '@/components/component/buttons/button';
import {
    FilterSVG,
    InvisibleSVG,
    VisibleSVG,
    ZoomInSVG,
    ZoomOutSVG,
} from '@/components/component/svg-icons/svg-icons';
import Dropdown from '@/components/component/drop-down-menu/drop-down-menu';
import * as filters from '@/components/enums/filter-enum';
import { MainDataFields } from '@/components/enums/data-types-enum';
import useGlobalFilterStore from '@/stores/global-filter-store';
import useGlobalDataStore from '@/stores/global-data-store';
import { ButtonType } from '@/components/enums/button-type-enum';
import { CompanyInfo } from '@/components/interface/company';
import { filterPredicate } from '@/services/filtering-service';
import useMapStore from '@/stores/global-map-store';
import constants from '@/constants/constants';

interface FilterMenuProps {
    toggleContentVisibility?: () => void;
    fournisseurMenu?: boolean;
}
const FilterMenu: React.FC<FilterMenuProps> = ({
    toggleContentVisibility = () => {},
    fournisseurMenu = false,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedTab, setSelectedTab] = useState<string>('general');
    const { filterData, setFilter } = useGlobalFilterStore();
    const { studyCompanyData, setStudyFilteredData } = useGlobalDataStore(
        (state: any) => ({
            studyCompanyData: state.companyData,
            setStudyFilteredData: state.setStudyFilteredData,
        }),
    );
    const [visible, setVisible] = useState<boolean>(true);
    const { map } = useMapStore(); // Get map instance from global state

    const toggleTab = () => {
        setIsOpen(!isOpen);
    };

    const toggleVicibility = () => {
        setVisible(!visible);
        toggleContentVisibility();
    };

    function handleChange(field: MainDataFields, newFieldValue: any) {
        setFilter(field, newFieldValue);
        const filtered = studyCompanyData.filter((company: CompanyInfo) =>
            filterPredicate(filterData, company),
        );
        setStudyFilteredData(filtered);
    }

    const zoomIn = () => {
        if (map) {
            map.zoomIn();
        }
    };

    const zoomOut = () => {
        if (map) {
            map.zoomOut();
        }
    };

    return (
        <div id={constants.filter_menu_id} className="relative z-20 h-fit">
            {/* Toggle Button */}
            <Button
                id={constants.toggle_filter_tab_id}
                buttonType={ButtonType.ICON}
                onClick={toggleTab}
                scaleOnHover={false}
                className={`fixed top-1/4 transform -translate-y-[130px] bg-[#f5ebe0] bg-opacity-75 right-0 p-2 rounded-l-md rounded-r-none ${
                    isOpen ? '-translate-x-64' : 'block'
                } transition-transform duration-300 ease-in-out`}
            >
                <FilterSVG className="w-10 h-10" />
            </Button>
            <Button
                id={constants.zoom_in_tab_id}
                buttonType={ButtonType.ICON}
                onClick={zoomIn}
                scaleOnHover={false}
                className={`fixed top-1/4 transform -translate-y-[65px] bg-[#f5ebe0] bg-opacity-75 right-0 p-2 rounded-l-md rounded-r-none ${
                    isOpen ? '-translate-x-64' : 'block'
                } transition-transform duration-300 ease-in-out`}
            >
                <ZoomInSVG />
            </Button>
            <Button
                id={constants.zoom_out_tab_id}
                buttonType={ButtonType.ICON}
                onClick={zoomOut}
                scaleOnHover={false}
                className={`fixed top-1/4 transform -translate-y-[15px] bg-[#f5ebe0] bg-opacity-75 right-0 p-2 rounded-l-md rounded-r-none ${
                    isOpen ? '-translate-x-64' : 'block'
                } transition-transform duration-300 ease-in-out`}
            >
                <ZoomOutSVG />
            </Button>

            <Button
                id={constants.hide_content_tab_id}
                buttonType={ButtonType.ICON}
                onClick={toggleVicibility}
                scaleOnHover={false}
                className={`fixed top-1/4 transform translate-y-[35px] bg-[#f5ebe0] bg-opacity-75 right-0 p-2 rounded-l-md rounded-r-none ${
                    isOpen ? '-translate-x-64' : 'block'
                } transition-transform duration-300 ease-in-out`}
            >
                {visible && <VisibleSVG className="fill-gray-500" />}
                {!visible && <InvisibleSVG className="fill-gray-500" />}
            </Button>
            {/* FILTER CONTENT */}
            {fournisseurMenu ? (
                <>
                    <div
                        className={`fixed top-10 right-0 h-fit w-64 bg-[#f5ebe0] bg-opacity-75 p-4 transform ${
                            isOpen ? 'translate-x-0' : 'translate-x-full'
                        } transition-transform duration-300 ease-in-out`}
                    >
                        {/* Filter Content */}
                        <div
                            id={constants.filters_container_id}
                            className="mt-2"
                        >
                            <h2 className="text-2xl font-bold">Filtres</h2>
                            {/* Add your filter options here */}
                            <div className="flex flex-col">
                                <label>Région</label>
                                <Dropdown
                                    inputValue={filterData.annee_fondation}
                                    options={Object.values(
                                        filters.AnneFondationFilters,
                                    )}
                                    onChange={(value: any) =>
                                        handleChange(
                                            MainDataFields.ANNEE_FONDATION,
                                            value,
                                        )
                                    }
                                />
                                <label>Services Offerts</label>
                                <Dropdown
                                    inputValue={
                                        filterData.dirigeant?.generation
                                    }
                                    options={Object.values(
                                        filters.NombreGenerationsFilters,
                                    )}
                                    onChange={(value: any) =>
                                        handleChange(
                                            MainDataFields.DIRIGEANT_GENERATION,
                                            value,
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {/* Side Filter Tab */}
                    <div
                        className={`fixed top-10 right-0 h-fit w-64 bg-[#f5ebe0] bg-opacity-75 p-4 transform ${
                            isOpen ? 'translate-x-0' : 'translate-x-full'
                        } transition-transform duration-300 ease-in-out`}
                    >
                        {/* Filter Content */}
                        <div
                            id={constants.filters_container_id}
                            className="mt-2"
                        >
                            <h2 className="text-2xl font-bold">Filtres</h2>
                            {/* Add your filter options here */}
                            <div className="mt-2 flex border-b dark:border-white border-black">
                                <button
                                    className={`flex-1 text-center py-2 ${
                                        selectedTab === 'general'
                                            ? 'border-b-2 dark:border-white border-black dark:text-white text-black'
                                            : 'text-gray-500'
                                    }`}
                                    onClick={() => setSelectedTab('general')}
                                >
                                    Général
                                </button>
                                <button
                                    className={`flex-1 text-center py-2 ${
                                        selectedTab === 'trend'
                                            ? 'border-b-2 dark:border-white border-black dark:text-white text-black'
                                            : 'text-gray-500'
                                    }`}
                                    onClick={() => setSelectedTab('trend')}
                                >
                                    Avancé
                                </button>
                            </div>
                            {selectedTab === 'general' ? (
                                <div className="mt-4 flex flex-col">
                                    <label>Taille Entreprise</label>
                                    <Dropdown
                                        inputValue={
                                            filterData.taille_entreprise
                                        }
                                        options={Object.values(
                                            filters.TailleEntrepriseFilters,
                                        )}
                                        onChange={(value: any) =>
                                            handleChange(
                                                MainDataFields.TAILLE_ENTREPRISE,
                                                value,
                                            )
                                        }
                                    />
                                    <label>Année Fondation</label>
                                    <Dropdown
                                        inputValue={filterData.annee_fondation}
                                        options={Object.values(
                                            filters.AnneFondationFilters,
                                        )}
                                        onChange={(value: any) =>
                                            handleChange(
                                                MainDataFields.ANNEE_FONDATION,
                                                value,
                                            )
                                        }
                                    />
                                    <label>Nombre Génération</label>
                                    <Dropdown
                                        inputValue={
                                            filterData.dirigeant?.generation
                                        }
                                        options={Object.values(
                                            filters.NombreGenerationsFilters,
                                        )}
                                        onChange={(value: any) =>
                                            handleChange(
                                                MainDataFields.DIRIGEANT_GENERATION,
                                                value,
                                            )
                                        }
                                    />
                                    {/* Add more filter options as needed */}
                                </div>
                            ) : (
                                <div className="mt-4 flex flex-col">
                                    <label>Région</label>
                                    <Dropdown
                                        inputValue={
                                            filterData.coordonnees?.region
                                        }
                                        options={Object.values(
                                            filters.EntrepriseRegionFilters,
                                        )}
                                        onChange={(value: any) =>
                                            handleChange(
                                                MainDataFields.COORDONNES_REGION,
                                                value,
                                            )
                                        }
                                    />
                                    <label>Secteur Activité</label>
                                    {/* <Dropdown
                                inputValue={
                                    filterData.Avancee.Entreprise
                                        .secteurActivite
                                }
                                options={Object.values(
                                    filters.SecteurActiviteFilters,
                                )}
                                onChange={(value: any) =>
                                    handleChange(
                                        filters.FilterTypes
                                            .ENTREPRISE_SECTEUR_ACTIVITE,
                                        value,
                                    )
                                }
                            /> */}
                                    <label>Revenu Annuel</label>
                                    {/* <Dropdown
                                inputValue={
                                    filterData.Avancee.Entreprise.revenuAnnuel
                                }
                                options={Object.values(filters.RevenuFilters)}
                                onChange={(value: any) =>
                                    handleChange(
                                        filters.FilterTypes
                                            .ENTREPRISE_REVENU_ANNUEL,
                                        value,
                                    )
                                }
                            /> */}
                                    {/* Add more filter options as needed */}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default FilterMenu;
