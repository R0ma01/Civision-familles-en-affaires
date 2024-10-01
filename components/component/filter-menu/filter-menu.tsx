import React, { useState, useEffect } from 'react';
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
    RepertoireDataFields,
    IndexeDataFieldsA,
    IndexeDataFieldsB,
} from '@/components/enums/data-types-enum';
import useGlobalFilterStore from '@/stores/global-filter-store';
import useGlobalDataStore from '@/stores/global-data-store';
import { ButtonType } from '@/components/enums/button-type-enum';
import useMapStore from '@/stores/global-map-store';
import { html_object_constants, value_constants } from '@/constants/constants';
import { MapType } from '@/components/enums/map-type-enum';
import { Language } from '@/components/enums/language';
import useDataStore from '@/reducer/dataStore';
import { SharedPromptsTranslations } from '@/constants/translations/page-prompts';
import { GraphTextService } from '@/services/translations';

const filterConfigurations = {
    [MapType.REPERTOIRE]: {
        general: [RepertoireDataFields.NB_EMPLO],
    },
    [MapType.PAGE_INFORMATION_ALBUM]: {
        general: [
            AlbumDataFields.TAILLE_ENTREPRISE,
            AlbumDataFields.ANNEE_FONDATION,
            AlbumDataFields.DIRIGEANT_GENERATION,
        ],
        advanced: [
            AlbumDataFields.COORDONNES_REGION,
            AlbumDataFields.SECTEUR_ACTIVITE,
            AlbumDataFields.REVENUS_RANG,
        ],
    },
    [MapType.FOURNISSEURS]: {
        general: [
            FournisseurDataFields.SECTEURS_GEOGRAPHIQUES,
            FournisseurDataFields.SERVICES_OFFERTS,
        ],
    },
    [MapType.PAGE_INFORMATION_INDEX_VOLETA]: {
        general: [IndexeDataFieldsA.Q0QC, IndexeDataFieldsA.QE6],
        advanced: [
            IndexeDataFieldsA.QE1x,
            IndexeDataFieldsA.QE1Cx,
            IndexeDataFieldsA.QE3,
        ],
    },
    [MapType.PAGE_INFORMATION_INDEX_VOLETB]: {
        general: [
            IndexeDataFieldsB.Q0QC,
            IndexeDataFieldsB.QD8,
            IndexeDataFieldsB.QZ19,
        ],
        advanced: [IndexeDataFieldsB.QDA1r6, IndexeDataFieldsB.QD11],
    },
};

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

    const { matchStage, setFilter, resetFilters } = useGlobalFilterStore(
        (state: any) => ({
            matchStage: state.matchStage,
            setFilter: state.setFilter,
            resetFilters: state.resetFilters,
        }),
    );

    const { mapType, map } = useMapStore((state) => ({
        mapType: state.mapType,
        map: state.map,
    }));

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

    const {
        filterStudyData,
        filterRepertoireData,
        filterFournisseurData,
        filterIndexeAData,
        filterIndexeBData,
    } = useGlobalDataStore((state: any) => ({
        filterStudyData: state.filterStudyData,
        filterRepertoireData: state.filterRepertoireData,
        filterFournisseurData: state.filterFournisseurData,
        filterIndexeAData: state.filterIndexeAData,
        filterIndexeBData: state.filterIndexeBData,
    }));

    const [visible, setVisible] = useState<boolean>(true);

    const toggleTab = () => {
        setIsOpen(!isOpen);
    };

    const toggleVisibility = () => {
        setVisible(!visible);
        toggleContentVisibility();
    };

    async function handleChange(field: any, newFieldValue: any) {
        setFilter(field, newFieldValue);
        switch (mapType) {
            case MapType.REPERTOIRE:
                filterRepertoireData();
                break;
            case MapType.PAGE_INFORMATION_ALBUM:
                filterStudyData();
                break;
            case MapType.PAGE_INFORMATION_INDEX_VOLETA:
                filterIndexeAData();
                break;
            case MapType.PAGE_INFORMATION_INDEX_VOLETB:
                filterIndexeBData();
                break;
            case MapType.FOURNISSEURS:
                filterFournisseurData();
                break;
            default:
                break;
        }
    }

    const renderFilters = () => {
        const filters: Record<string, string[]> = filterConfigurations[mapType];
        if (!filters) return null;

        return (
            <div className="mt-2 flex flex-col">
                {filters[selectedTab]?.map((filter: any, index: number) => (
                    <FilterItem
                        key={index}
                        filterData={filter}
                        lang={lang}
                        matchStage={matchStage}
                        handleChange={handleChange}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="relative z-20 h-[300px]">
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
                onClick={toggleVisibility}
                scaleOnHover={false}
                className={`fixed top-1/4 transform translate-y-[35px] bg-[#f5ebe0] bg-opacity-75 right-0 p-2 rounded-l-md rounded-r-none ${
                    isOpen ? '-translate-x-64' : 'block'
                } transition-transform duration-300 ease-in-out`}
            >
                {visible && <VisibleSVG className="fill-gray-500" />}
                {!visible && <InvisibleSVG className="fill-gray-500" />}
            </Button>

            <div
                className={`fixed top-10 right-0 h-[350px] w-64 bg-[#f5ebe0] bg-opacity-75 p-4 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}
            >
                <h2 className="text-2xl font-bold">
                    {SharedPromptsTranslations.filters[lang]}
                </h2>
                <div className="mt-2 flex border-b dark:border-white border-black">
                    {Object.keys(filterConfigurations[mapType]).map((tab) => (
                        <button
                            key={tab}
                            className={`flex-1 text-center py-2 ${selectedTab === tab ? 'border-b-2 dark:border-white border-black dark:text-white text-black' : 'text-gray-500'}`}
                            onClick={() => setSelectedTab(tab)}
                        >
                            {SharedPromptsTranslations[`${tab}_filters`][lang]}
                        </button>
                    ))}
                </div>
                {renderFilters()}
            </div>
        </div>
    );
};

export default FilterMenu;

interface FilterItemProps {
    filterData: any;
    lang: Language;
    matchStage: any;
    handleChange: (param1: any, param2: any) => void;
}

function FilterItem({
    lang,
    matchStage,
    handleChange,
    filterData,
}: FilterItemProps) {
    const labelTitle =
        GraphTextService.getLabel(filterData, lang) ||
        SharedPromptsTranslations.error[lang];

    return (
        <div>
            <label>{labelTitle}</label>
            <Dropdown
                inputValue={
                    matchStage[filterData]
                        ? matchStage[filterData]['$in'][0]
                        : value_constants.all_values_string_filter
                }
                options={['toutes', ...GraphTextService.getKeys(filterData)]}
                dataField={filterData}
                onChange={(value: any) => {
                    handleChange(filterData, value);
                }}
            />
        </div>
    );
}
