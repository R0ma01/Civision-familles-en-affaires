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

import {
    AlbumDataFields,
    FournisseurDataFields,
} from '@/components/enums/data-types-enum';
import useGlobalFilterStore from '@/stores/global-filter-store';
import useGlobalDataStore from '@/stores/global-data-store';
import { ButtonType } from '@/components/enums/button-type-enum';
import useMapStore from '@/stores/global-map-store';
import { html_object_constants, value_constants } from '@/constants/constants';
import { MapType } from '@/components/enums/map-type-enum';
import { PossibleDataFileds } from '@/services/tableaux-taitement';
import { Language } from '@/components/enums/language';
import useDataStore from '@/reducer/dataStore';
import { SharedPromptsTranslations } from '@/constants/translations/page-prompts';
import { TableauxTraductionsMainDataFields } from '@/services/translations';

interface FilterMenuProps {
    toggleContentVisibility?: () => void;
    fournisseurMenu?: boolean;
}
const FilterMenu: React.FC<FilterMenuProps> = ({
    toggleContentVisibility = () => {},
}) => {
    const lang: Language = useDataStore((state) => state.lang);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedTab, setSelectedTab] = useState<string>('general');
    const { matchStage, setFilter } = useGlobalFilterStore((state: any) => ({
        matchStage: state.matchStage,
        setFilter: state.setFilter,
    }));
    const { mapType, map } = useMapStore((state) => {
        return { mapType: state.mapType, map: state.map };
    });
    const { filterStudyData, filterRepertoireData, filterFournisseurData } =
        useGlobalDataStore((state: any) => ({
            fetchStudyData: state.fetchStudyData,
            filterStudyData: state.filterStudyData,
            filterRepertoireData: state.filterRepertoireData,
            filterFournisseurData: state.filterFournisseurData,
        }));

    const [visible, setVisible] = useState<boolean>(true);

    const toggleTab = () => {
        setIsOpen(!isOpen);
    };

    const toggleVicibility = () => {
        setVisible(!visible);
        toggleContentVisibility();
    };

    async function handleChange(field: any, newFieldValue: any) {
        setFilter(field, newFieldValue);

        switch (mapType) {
            case MapType.REPERTOIRE:
                filterRepertoireData();
                break;
            case MapType.PAGE_INFORMATION:
                filterStudyData();
                break;
            case MapType.FOURNISSEURS:
                break;

            default:
                filterFournisseurData();
                break;
        }
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

    function filterEntrails() {
        switch (mapType) {
            case MapType.REPERTOIRE:
                return (
                    <>
                        <div
                            className={`fixed top-10 right-0 h-fit w-64 bg-[#f5ebe0] bg-opacity-75 p-4 transform ${
                                isOpen ? 'translate-x-0' : 'translate-x-full'
                            } transition-transform duration-300 ease-in-out`}
                        >
                            <div>NO FILTERS YET</div>
                        </div>
                    </>
                );

            case MapType.PAGE_INFORMATION:
                return (
                    <>
                        {/* Side Filter Tab */}
                        <div
                            className={`fixed top-10 right-0 h-fit w-64 bg-[#f5ebe0] bg-opacity-75 p-4 transform ${
                                isOpen ? 'translate-x-0' : 'translate-x-full'
                            } transition-transform duration-300 ease-in-out`}
                        >
                            {/* Filter Content */}
                            <div
                                id={html_object_constants.filters_container_id}
                                className="mt-2"
                            >
                                <h2 className="text-2xl font-bold">
                                    {SharedPromptsTranslations.filters[lang]}
                                </h2>
                                {/* Add your filter options here */}
                                <div className="mt-2 flex border-b dark:border-white border-black">
                                    <button
                                        className={`flex-1 text-center py-2 ${
                                            selectedTab === 'general'
                                                ? 'border-b-2 dark:border-white border-black dark:text-white text-black'
                                                : 'text-gray-500'
                                        }`}
                                        onClick={() =>
                                            setSelectedTab('general')
                                        }
                                    >
                                        {
                                            SharedPromptsTranslations
                                                .general_filters[lang]
                                        }
                                    </button>
                                    <button
                                        className={`flex-1 text-center py-2 ${
                                            selectedTab === 'trend'
                                                ? 'border-b-2 dark:border-white border-black dark:text-white text-black'
                                                : 'text-gray-500'
                                        }`}
                                        onClick={() => setSelectedTab('trend')}
                                    >
                                        {
                                            SharedPromptsTranslations
                                                .advanced_filters[lang]
                                        }
                                    </button>
                                </div>
                                {selectedTab === 'general' ? (
                                    <div className="mt-4 flex flex-col">
                                        <label>
                                            {
                                                TableauxTraductionsMainDataFields.get(
                                                    AlbumDataFields.TAILLE_ENTREPRISE,
                                                )?.label[lang]
                                            }
                                        </label>
                                        <Dropdown
                                            inputValue={
                                                matchStage[
                                                    AlbumDataFields
                                                        .TAILLE_ENTREPRISE
                                                ]
                                                    ? matchStage[
                                                          AlbumDataFields
                                                              .TAILLE_ENTREPRISE
                                                      ]['$in'][0]
                                                    : value_constants.all_values_string_filter
                                            }
                                            options={[
                                                'toutes',
                                                ...(PossibleDataFileds.get(
                                                    AlbumDataFields.TAILLE_ENTREPRISE,
                                                ) || []),
                                            ]}
                                            onChange={(value: any) =>
                                                handleChange(
                                                    AlbumDataFields.TAILLE_ENTREPRISE,
                                                    value,
                                                )
                                            }
                                        />
                                        <label>
                                            {
                                                TableauxTraductionsMainDataFields.get(
                                                    AlbumDataFields.ANNEE_FONDATION,
                                                )?.label[lang]
                                            }
                                        </label>
                                        <Dropdown
                                            inputValue={
                                                matchStage[
                                                    AlbumDataFields
                                                        .ANNEE_FONDATION
                                                ]
                                                    ? matchStage[
                                                          AlbumDataFields
                                                              .ANNEE_FONDATION
                                                      ]['$in'][0]
                                                    : value_constants.all_values_string_filter
                                            }
                                            options={[
                                                'toutes',
                                                ...(PossibleDataFileds.get(
                                                    AlbumDataFields.ANNEE_FONDATION,
                                                ) || []),
                                            ]}
                                            onChange={(value: any) =>
                                                handleChange(
                                                    AlbumDataFields.ANNEE_FONDATION,
                                                    value,
                                                )
                                            }
                                        />
                                        <label>
                                            {
                                                TableauxTraductionsMainDataFields.get(
                                                    AlbumDataFields.DIRIGEANT_GENERATION,
                                                )?.label[lang]
                                            }
                                        </label>
                                        <Dropdown
                                            inputValue={
                                                matchStage[
                                                    AlbumDataFields
                                                        .DIRIGEANT_GENERATION
                                                ]
                                                    ? matchStage[
                                                          AlbumDataFields
                                                              .DIRIGEANT_GENERATION
                                                      ]['$in'][0]
                                                    : value_constants.all_values_string_filter
                                            }
                                            options={[
                                                'toutes',
                                                ...(PossibleDataFileds.get(
                                                    AlbumDataFields.DIRIGEANT_GENERATION,
                                                ) || []),
                                            ]}
                                            onChange={(value: any) =>
                                                handleChange(
                                                    AlbumDataFields.DIRIGEANT_GENERATION,
                                                    value,
                                                )
                                            }
                                        />
                                        {/* Add more filter options as needed */}
                                    </div>
                                ) : (
                                    <div className="mt-4 flex flex-col">
                                        <label>
                                            {
                                                TableauxTraductionsMainDataFields.get(
                                                    AlbumDataFields.COORDONNES_REGION,
                                                )?.label[lang]
                                            }
                                        </label>
                                        <Dropdown
                                            inputValue={
                                                matchStage[
                                                    AlbumDataFields
                                                        .COORDONNES_REGION
                                                ]
                                                    ? matchStage[
                                                          AlbumDataFields
                                                              .COORDONNES_REGION
                                                      ]['$in'][0]
                                                    : value_constants.all_values_string_filter
                                            }
                                            options={[
                                                'toutes',
                                                ...(PossibleDataFileds.get(
                                                    AlbumDataFields.COORDONNES_REGION,
                                                ) || []),
                                            ]}
                                            onChange={(value: any) =>
                                                handleChange(
                                                    AlbumDataFields.COORDONNES_REGION,
                                                    value,
                                                )
                                            }
                                        />
                                        <label>
                                            {
                                                TableauxTraductionsMainDataFields.get(
                                                    AlbumDataFields.SECTEUR_ACTIVITE,
                                                )?.label[lang]
                                            }
                                        </label>
                                        <Dropdown
                                            inputValue={
                                                matchStage[
                                                    AlbumDataFields
                                                        .SECTEUR_ACTIVITE
                                                ]
                                                    ? matchStage[
                                                          AlbumDataFields
                                                              .SECTEUR_ACTIVITE
                                                      ]['$in'][0]
                                                    : value_constants.all_values_string_filter
                                            }
                                            options={[
                                                'toutes',
                                                ...(PossibleDataFileds.get(
                                                    AlbumDataFields.SECTEUR_ACTIVITE,
                                                ) || []),
                                            ]}
                                            onChange={(value: any) =>
                                                handleChange(
                                                    AlbumDataFields.SECTEUR_ACTIVITE,
                                                    value,
                                                )
                                            }
                                        />
                                        <label>
                                            {
                                                TableauxTraductionsMainDataFields.get(
                                                    AlbumDataFields.REVENUS_RANG,
                                                )?.label[lang]
                                            }
                                        </label>
                                        <Dropdown
                                            inputValue={
                                                matchStage[
                                                    AlbumDataFields.REVENUS_RANG
                                                ]
                                                    ? matchStage[
                                                          AlbumDataFields
                                                              .REVENUS_RANG
                                                      ]['$in'][0]
                                                    : value_constants.all_values_string_filter
                                            }
                                            options={[
                                                'toutes',
                                                ...(PossibleDataFileds.get(
                                                    AlbumDataFields.REVENUS_RANG,
                                                ) || []),
                                            ]}
                                            onChange={(value: any) =>
                                                handleChange(
                                                    AlbumDataFields.REVENUS_RANG,
                                                    value,
                                                )
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                );
            case MapType.FOURNISSEURS:
                return (
                    <>
                        <div
                            className={`fixed top-10 right-0 h-fit w-64 bg-[#f5ebe0] bg-opacity-75 p-4 transform ${
                                isOpen ? 'translate-x-0' : 'translate-x-full'
                            } transition-transform duration-300 ease-in-out`}
                        >
                            {/* Filter Content */}
                            <div
                                id={html_object_constants.filters_container_id}
                                className="mt-2"
                            >
                                <h2 className="text-2xl font-bold">
                                    {SharedPromptsTranslations.filters[lang]}
                                </h2>
                                {/* Add your filter options here */}
                                <div className="flex flex-col">
                                    <label>
                                        {
                                            TableauxTraductionsMainDataFields.get(
                                                FournisseurDataFields.SECTEURS_GEOGRAPHIQUES,
                                            )?.label[lang]
                                        }
                                    </label>
                                    <Dropdown
                                        inputValue={
                                            matchStage[
                                                FournisseurDataFields
                                                    .SECTEURS_GEOGRAPHIQUES
                                            ]
                                                ? matchStage[
                                                      FournisseurDataFields
                                                          .SECTEURS_GEOGRAPHIQUES
                                                  ]['$in'][0]
                                                : value_constants.all_values_string_filter
                                        }
                                        options={Object.keys(
                                            TableauxTraductionsMainDataFields.get(
                                                FournisseurDataFields.SECTEURS_GEOGRAPHIQUES,
                                            )?.dataLabels || {}, // Fallback to an empty object if dataLabels is undefined
                                        )}
                                        onChange={(value: any) =>
                                            handleChange(
                                                FournisseurDataFields.SECTEURS_GEOGRAPHIQUES,
                                                value,
                                            )
                                        }
                                    />
                                    <label>
                                        {' '}
                                        {
                                            TableauxTraductionsMainDataFields.get(
                                                FournisseurDataFields.SERVICES_OFFERTS,
                                            )?.label[lang]
                                        }
                                    </label>
                                    <Dropdown
                                        inputValue={
                                            matchStage[
                                                FournisseurDataFields
                                                    .SERVICES_OFFERTS
                                            ]
                                                ? matchStage[
                                                      FournisseurDataFields
                                                          .SERVICES_OFFERTS
                                                  ]['$in'][0]
                                                : value_constants.all_values_string_filter
                                        }
                                        options={Object.keys(
                                            TableauxTraductionsMainDataFields.get(
                                                FournisseurDataFields.SERVICES_OFFERTS,
                                            )?.dataLabels || {}, // Fallback to an empty object if dataLabels is undefined
                                        )}
                                        dataField={
                                            FournisseurDataFields.SERVICES_OFFERTS
                                        }
                                        onChange={(value: any) =>
                                            handleChange(
                                                FournisseurDataFields.SERVICES_OFFERTS,
                                                value,
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                );

            default:
                break;
        }
    }

    return (
        <div
            id={html_object_constants.filter_menu_id}
            className="relative z-20 h-[300px]"
        >
            {/* Toggle Button */}
            <Button
                id={html_object_constants.toggle_filter_tab_id}
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
                id={html_object_constants.zoom_in_tab_id}
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
                id={html_object_constants.zoom_out_tab_id}
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
                id={html_object_constants.hide_content_tab_id}
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
            {filterEntrails()}
        </div>
    );
};

export default FilterMenu;
