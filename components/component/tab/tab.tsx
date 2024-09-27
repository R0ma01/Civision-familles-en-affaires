import { TabContent } from '@/components/interface/tab-content';
import { useEffect, useState } from 'react';
import DataCard from '../data-card/data-card';
import useDataStore from '@/reducer/dataStore';
import { Language } from '@/components/enums/language';

interface TabProps {
    content: TabContent;
    className?: string;
}
//some comment
export function Tab({ content, className }: TabProps) {
    const [tabContent, setTabContent] = useState<TabContent>(content);
    const lang: Language = useDataStore((state) => state.lang);
    useEffect(() => {
        setTabContent(content);
    }, [content]);

    return (
        <div
            className={`p-4 space-y-6 rounded-lg shadow-sm transition-all duration-300 ${className}`}
        >
            <p className="text-base text-gray-600 dark:text-gray-300">
                {tabContent.description[lang]}
            </p>

            {/* Render Data Cards */}
            <div className="grid gap-4">
                {tabContent.cards.map((card, idx) => (
                    <DataCard key={idx} content={card} />
                ))}
            </div>
        </div>
    );
}
