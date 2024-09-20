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
import { DataBaseOrigin } from '@/components/enums/data-types-enum';
import Button from '../buttons/button';
import { ButtonType } from '@/components/enums/button-type-enum';

interface TabProps {
    tabs: TabContent[];
    className?: string;
    handleInputChange: (index: number, tab: TabContent) => void;
    handleTabAdd: (e: any) => void;
    handleTabDelete: (index: number) => void;
}

export function EditTabContainer({
    tabs,
    className,
    handleInputChange,
    handleTabAdd,
    handleTabDelete,
}: TabProps) {
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
    const lang: Language = useDataStore((state) => state.lang);

    useEffect(() => {
        // Ensure the selectedTabIndex is valid when tabs change
        if (selectedTabIndex >= tabs.length) {
            setSelectedTabIndex(tabs.length - 1);
        }
    }, [tabs, selectedTabIndex]);

    const selectedTab = tabs[selectedTabIndex] || tabs[0];

    return (
        <div className="w-fit z-10 flex flex-col max-w-[80%]">
            {/* Tab Headers */}
            <div className="flex flex-row">
                <div
                    className={`relative flex flex-row items-center justify-start space-x-2 border-b border-black dark:border-white`}
                >
                    {tabs.map((tab, index) => {
                        const isActive = index === selectedTabIndex;
                        const color = tabColors[tab.tabType];

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
                                className={`dark:text-white hover:bg-gray-700 dark:hover:bg-gray-300 text-black bg-opacity-75 cursor-pointer border-black dark:border-white md:text-xs lg:text-sm px-4 py-2 transition-all duration-200 rounded-t-xl border-b-0 ${className} flex flex-row items-center`}
                                style={{
                                    backgroundColor: isActive
                                        ? color
                                        : '#374151',
                                }}
                            >
                                <Dropdown
                                    onChange={handleTabTypeChange}
                                    inputValue={tab.tabType}
                                    options={Object.values(DataBaseOrigin)}
                                    displayValue={(value: DataBaseOrigin) => {
                                        const tabTitle =
                                            TableauxTraductionsTabs.get(value);
                                        const title = tabTitle
                                            ? tabTitle.titre[lang] || 'No title'
                                            : 'No title';
                                        return title;
                                    }}
                                    style={{
                                        backgroundColor: isActive
                                            ? color
                                            : '#374151',
                                    }}
                                    className={`${isActive ? 'dark:text-black' : ''} border-none shadow-none z-20`}
                                ></Dropdown>
                                {isActive && (
                                    <>
                                        {' '}
                                        <Button
                                            onClick={togglevisibility}
                                            buttonType={ButtonType.ICON}
                                        >
                                            {tab.visible ? (
                                                <VisibleSVG></VisibleSVG>
                                            ) : (
                                                <InvisibleSVG></InvisibleSVG>
                                            )}
                                        </Button>
                                        <Button
                                            onClick={deleteTab}
                                            buttonType={ButtonType.ICON}
                                        >
                                            <TrashSVG className="fill-red-600"></TrashSVG>
                                        </Button>
                                    </>
                                )}
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
                ></EditTab>
            )}
        </div>
    );
}
