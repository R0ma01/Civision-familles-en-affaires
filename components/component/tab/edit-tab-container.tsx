// EditTabContainer.tsx
import { TabContent } from '@/components/interface/tab-content';
import { useEffect, useState } from 'react';
import { Tab } from './tab';
import { tabColors } from '@/constants/color-palet';
import {
    AddCircleSVG,
    InvisibleSVG,
    VisibleSVG,
    TrashSVG,
} from '../svg-icons/svg-icons';
import { EditTab } from './edit-tab';
import { TableauxTraductionsTabs } from '@/services/translations';
import useDataStore from '@/reducer/dataStore';
import { Language } from '@/components/enums/language';
import Dropdown from '../drop-down-menu/drop-down-menu';
import { StudyOrigin } from '@/components/enums/data-types-enum';
import Button from '../buttons/button';
import { ButtonType } from '@/components/enums/button-type-enum';

interface TabProps {
    tabs: TabContent[];
    className?: string;
    handleInputChange: (index: number, tab: TabContent) => void;
    handleTabAdd: (e: any) => void;
    handleTabDelete: (index: number) => void;
    langEdit: Language;
}

export function EditTabContainer({
    tabs,
    className,
    handleInputChange,
    handleTabAdd,
    handleTabDelete,
    langEdit,
}: TabProps) {
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
    const lang = useDataStore((state) => state.lang);
    useEffect(() => {
        // Ensure the selectedTabIndex is valid when tabs change
        if (selectedTabIndex >= tabs.length) {
            setSelectedTabIndex(tabs.length - 1);
        }
    }, [tabs, selectedTabIndex]);

    const selectedTab = tabs[selectedTabIndex] || tabs[0];

    return (
        <div className="w-fit z-10 flex flex-col max-w-[100%]">
            {/* Tab Headers */}

            <div className="flex flex-row">
                <div
                    className={`flex flex-row items-center justify-start space-x-3 mb-4`}
                >
                    {tabs.map((tab, index) => {
                        const isActive = index === selectedTabIndex;

                        function handleTabTypeChange(e: any) {
                            const inputValue = e;
                            if (inputValue === tab.tabType) {
                                return;
                            }
                            const updatedTab = { ...tab };
                            updatedTab.cards = [];
                            updatedTab.tabType = inputValue;
                            handleInputChange(index, updatedTab);
                        }

                        function togglevisibility(e: any) {
                            e.preventDefault();
                            const updatedTab = { ...tab };
                            updatedTab.visible = !tab.visible;
                            handleInputChange(index, updatedTab);
                        }

                        function deleteTab(e: any) {
                            e.preventDefault();
                            handleTabDelete(index);
                        }

                        return (
                            <div
                                key={index} // Use index as key to ensure uniqueness
                                onClick={() => setSelectedTabIndex(index)}
                                className={`hover:-translate-y-1 text-black cursor-pointer md:text-xs lg:tx-sm px-4 py-2 transition-all duration-200 rounded-lg ${isActive ? 'bg-logo-dark-blue text-white' : 'bg-white text-logo-dark-blue bg-opacity-65'} ${className} flex flex-row items-center relative`}
                            >
                                <Dropdown
                                    onChange={handleTabTypeChange}
                                    inputValue={tab.tabType}
                                    options={Object.values(StudyOrigin)}
                                    displayValue={(value: StudyOrigin) => {
                                        const tabTitle =
                                            TableauxTraductionsTabs.get(value);
                                        const title = tabTitle
                                            ? tabTitle.titre[lang] || 'No title'
                                            : 'No title';
                                        return title;
                                    }}
                                    style={{
                                        backgroundColor: isActive
                                            ? '#233B70'
                                            : '#FFFFFF00',
                                    }}
                                    className={`border-none shadow-none z-20 bg-opacity-0`}
                                ></Dropdown>

                                <Button
                                    onClick={togglevisibility}
                                    buttonType={ButtonType.ICON_ROUNDED}
                                    className="absolute -bottom-3 -right-2 hover:scale-125 bg-gray-500 border-gray-500"
                                >
                                    {tab.visible ? (
                                        <VisibleSVG className="fill-white w-4 h-4"></VisibleSVG>
                                    ) : (
                                        <InvisibleSVG className="fill-white w-4 h-4"></InvisibleSVG>
                                    )}
                                </Button>

                                <Button
                                    onClick={deleteTab}
                                    buttonType={ButtonType.ICON_ROUNDED}
                                    className="absolute -top-2 -right-2 hover:scale-125 bg-red-500 border-red-500"
                                >
                                    <TrashSVG className="fill-white w-4 h-4"></TrashSVG>
                                </Button>
                            </div>
                        );
                    })}
                </div>
                <Button
                    buttonType={ButtonType.ICON}
                    onClick={handleTabAdd}
                    className={`bg-opacity-75 cursor-pointer transition-all duration-200 rounded-t-xl ${className} ml-2`}
                >
                    <AddCircleSVG className="h-6 dark:fill-custom-grey fill-white" />
                </Button>{' '}
            </div>

            {/* Selected Tab Content */}
            {selectedTab && (
                <EditTab
                    key={selectedTabIndex} // Add key to force re-mount if necessary
                    content={selectedTab}
                    handleInputChange={(tab: TabContent) => {
                        handleInputChange(selectedTabIndex, tab);
                    }}
                    langEdit={langEdit}
                ></EditTab>
            )}
        </div>
    );
}
