import { TabContent } from '@/components/interface/tab-content';
import { useEffect, useState } from 'react';
import { Tab } from './tab';

interface TabProps {
    tabs: TabContent[];
    className?: string;
}

export function TabContainer({ tabs, className }: TabProps) {
    const [containerContent, setTabContent] = useState<TabContent[]>(tabs);
    const [selectedTab, setSelectedTab] = useState<TabContent>(tabs[0]);

    useEffect(() => {
        setTabContent(tabs);
    }, [tabs]);

    return (
        <div className="w-fit z-10">
            {/* Tab Headers */}
            <div
                className={`flex flex-wrap items-center justify-start space-x-2 mb-4 border-b border-black dark:border-white ${className}`}
            >
                {containerContent.map((tab) => {
                    if (tab.visible) {
                        const isActive = tab.title === selectedTab.title;
                        return (
                            <div
                                key={tab.title}
                                onClick={() => setSelectedTab(tab)}
                                className={`dark:text-white text-balck bg-opacity-75 cursor-pointer border-black dark:border-white text-sm md:text-base px-4 py-2 transition-all duration-200 rounded-t-xl border-b-0 ${
                                    isActive
                                        ? 'bg-blue-500'
                                        : 'hover:text-gray-700 dark:hover:text-gray-300 bg-custom-grey'
                                } ${className}`}
                            >
                                {tab.title}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>

            {/* Selected Tab Content */}
            <Tab content={selectedTab} className={className} />
        </div>
    );
}
