import { TabContent } from '@/components/interface/tab-content';
import { useEffect, useState } from 'react';
import { Tab } from './tab';
import { tabColors } from '@/constants/color-palet';
import { AddCircleSVG, EditSVG, VisibleSVG } from '../svg-icons/svg-icons';
import { EditTab } from './edit-tab';
import { TableauxTraductionsTabs } from '@/services/translations';
import useDataStore from '@/reducer/dataStore';
import { Language } from '@/components/enums/language';

interface TabProps {
    tabs: TabContent[];
    className?: string;
}
//some comment
export function TabContainer({ tabs, className }: TabProps) {
    const [containerContent, setTabContent] = useState<TabContent[]>(tabs);
    const [selectedTab, setSelectedTab] = useState<{
        index: number;
        tab: TabContent;
    }>({
        index: 0,
        tab: tabs[0],
    });

    const lang: Language = useDataStore((state) => state.lang);

    useEffect(() => {
        setTabContent(tabs);
    }, [tabs]);

    return (
        <div className="w-fit z-10">
            {/* Tab Headers */}
            <div
                className={`flex flex-wrap items-center justify-start space-x-2 mb-4 border-b border-black dark:border-white ${className}`}
            >
                {containerContent.map((tab, index) => {
                    if (tab.visible) {
                        const isActive = index === selectedTab.index;
                        const tabTitle = TableauxTraductionsTabs.get(
                            tab.tabType,
                        );
                        const title = tabTitle
                            ? tabTitle.titre[lang] || 'No title'
                            : 'No title';
                        const color = tabColors[tab.tabType];
                        return (
                            <div
                                key={title}
                                onClick={() =>
                                    setSelectedTab({ index: index, tab: tab })
                                }
                                className={`dark:text-white hover:bg-gray-700 dark:hover:bg-gray-300 text-balck bg-opacity-75 cursor-pointer border-black dark:border-white md:text-xs lg:tx-sm px-4 py-2 transition-all duration-200 rounded-t-xl border-b-0 ${className}`}
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
            <Tab content={selectedTab.tab} className={className} />
        </div>
    );
}
