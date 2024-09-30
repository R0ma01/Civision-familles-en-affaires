import { TabContent, YearTab } from '@/components/interface/tab-content';
import { useEffect, useState } from 'react';
import DataCard from '../data-card/data-card';
import useDataStore from '@/reducer/dataStore';
import { Language } from '@/components/enums/language';
import { StudyYears } from '@/components/enums/data-types-enum';
import Dropdown from '@/components/component/drop-down-menu/drop-down-menu';

interface TabProps {
    content: TabContent;
    className?: string;
}
//some comment
export function Tab({ content, className }: TabProps) {
    const [tabContent, setTabContent] = useState<TabContent>(content);
    const [currentYear, setCurrentYear] = useState<StudyYears | undefined>(
        undefined,
    );
    const lang: Language = useDataStore((state) => state.lang);
    useEffect(() => {
        setTabContent(content);
        if (content.years[0]) {
            setCurrentYear(content.years[0]);
        }
    }, [content]);

    return (
        <div
            className={`p-4 space-y-6 rounded-lg transition-all duration-300 ${className}`}
        >
            {currentYear && (
                <>
                    <Dropdown
                        inputValue={currentYear}
                        options={tabContent.years}
                        dataField={'none'}
                        onChange={(value: any) => {
                            setCurrentYear(value);
                        }}
                    />
                </>
            )}
            {currentYear && (
                <>
                    <p className="text-base text-gray-600 dark:text-gray-300">
                        {tabContent.description[lang]}
                    </p>

                    {/* Render Data Cards */}
                    <div className="grid gap-4">
                        {tabContent.cards.map((card, idx) => (
                            <DataCard
                                key={idx}
                                content={card}
                                year={currentYear}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
