import { TabContent } from '@/components/interface/tab-content';
import { useEffect, useState } from 'react';
import { Tab } from './tab';
import { tabColors } from '@/constants/color-palet';
import { TableauxTraductionsTabs } from '@/services/translations';
import useDataStore from '@/reducer/dataStore';
import { DataBaseOrigin } from '@/components/enums/data-types-enum';
import { Language } from '@/components/enums/language';

interface TabProps {
    tabs: TabContent[];
    className?: string;
    setMap?: (dataType: DataBaseOrigin) => void;
}

export function TabContainer({
    tabs,
    className,
    setMap = (temp) => {},
}: TabProps) {
    const [containerContent, setContainerContent] = useState<
        TabContent[] | undefined
    >(undefined);
    const [selectedTab, setSelectedTab] = useState<number>(0); // Initialize with 0

    const lang: Language = useDataStore((state) => state.lang);

    useEffect(() => {
        if (tabs !== containerContent && tabs) {
            setContainerContent(tabs);

            if (!selectedTab) {
                setSelectedTab(tabs.findIndex((tab) => tab.visible)); // Set first tab as active if none is selected
                setMap(tabs[selectedTab].tabType);
            }
        }
    }, [tabs, containerContent, selectedTab]);

    useEffect(() => {
        if (containerContent) {
            setMap(containerContent[selectedTab].tabType);
        }
    }, [selectedTab]);

    return (
        <div className="w-fit z-10">
            {/* Tab Headers */}
            <div
                className={`flex flex-wrap items-center justify-start space-x-2 mb-4 border-b border-black dark:border-white ${className}`}
            >
                {containerContent &&
                    containerContent.map((tab, index) => {
                        if (tab.visible) {
                            const isActive = index === selectedTab;

                            const tabTitle = TableauxTraductionsTabs.get(
                                tab.tabType,
                            );
                            const title = tabTitle
                                ? tabTitle.titre[lang] || 'No title'
                                : 'No title';
                            const color = tabColors[tab.tabType];

                            return (
                                <div
                                    key={`${tab.tabType}-${index}`} // Unique key
                                    onClick={() => setSelectedTab(index)} // Set the active tab
                                    className={`dark:text-white hover:bg-gray-700 dark:hover:bg-gray-300 text-black bg-opacity-75 cursor-pointer border-black dark:border-white md:text-xs lg:tx-sm px-4 py-2 transition-all duration-200 rounded-t-xl border-b-0 ${className}`}
                                    style={{
                                        backgroundColor: isActive
                                            ? '#3b82f6'
                                            : color,
                                    }}
                                >
                                    <p>{title}</p>
                                </div>
                            );
                        }
                        return null;
                    })}
            </div>

            {/* Selected Tab Content */}
            {containerContent && selectedTab !== undefined && (
                <Tab
                    content={containerContent[selectedTab]}
                    className={className}
                />
            )}
        </div>
    );
}
