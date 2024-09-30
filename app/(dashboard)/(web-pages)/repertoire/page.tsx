'use client';
import DataCard from '@/components/component/data-card/data-card';
import PageContentContainer from '@/components/component/page-content-container/page-content-container';
import { DataCardType } from '@/components/enums/data-card-type-enum';
import { GraphBoxType } from '@/components/enums/graph-box-enum';
import { AlbumDataFields } from '@/components/enums/data-types-enum';
import RepertoirePageTutorial from '@/components/component/tutorials/repertoire-page-tutorial';
import useMapStore from '@/stores/global-map-store';
import { MapType } from '@/components/enums/map-type-enum';
import { useEffect, useState } from 'react';
import { Language } from '@/components/enums/language';
import { RepertoirePromptsTranslations } from '@/constants/translations/page-prompts';
import useDataStore from '@/reducer/dataStore';
import { chartPalette } from '@/constants/color-palet';
import { PieChart, Pie, Cell, Label } from 'recharts';
import useGlobalDataStore from '@/stores/global-data-store';
import useGlobalUserStore from '@/stores/global-user-store';
import { TutorialPages, UserType } from '@/components/enums/user-type-enum';

const data = [
    { name: 'Group A', value: 63.1 },
    { name: 'Group B', value: 36.9 },
];

const findHighestValue = (data: any) => {
    let highest = data[0].value;
    data.forEach((item: any) => {
        if (item.value > highest) {
            highest = item.value;
        }
    });
    return highest;
};

const highestValue = findHighestValue(data);

const Donut = ({ size }: { size: number }) => {
    return (
        <PieChart width={size + 10} height={size + 10}>
            <Pie
                data={data}
                cx={size / 2}
                cy={size / 2}
                innerRadius={size / 2.6}
                outerRadius={size / 2.2}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
                isAnimationActive={false}
                stroke="black" // Set the stroke to black for the edge
            >
                <Label
                    value={highestValue + '%'}
                    position="center"
                    style={{ fontSize: `${size / 5.2}px` }}
                    className=" dark:fill-white fill-black"
                />
                {data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={chartPalette[index % chartPalette.length]}
                    />
                ))}
            </Pie>
        </PieChart>
    );
};

const DataCardDiv: React.FC<{
    title: string;
    children: React.ReactNode;
}> = ({ children, title }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <div
            className={`w-[500px] bg-[#f5ebe0] dark:bg-[#363636] dark:bg-opacity-50 dark:text-white backdrop-filter
                 backdrop-blur bg-opacity-50 saturate-100 backdrop-contrast-100 rounded-xl shadow-3xl py-8 px-8 pointer-events-auto
                 flex flex-col items-center h-auto space-y-1`}
        >
            <button
                onClick={() => setIsCollapsed((prev) => !prev)}
                className="absolute top-2 right-2 z-20"
            >
                {isCollapsed ? (
                    <span className="text-lg text-black dark:text-white">
                        &#9650;
                    </span>
                ) : (
                    <span className="text-lg text-black dark:text-white">
                        &#9660;
                    </span>
                )}
            </button>
            <span
                className={`text-md dark:font-semi-bold text-md text-center w-[80%]`}
            >
                {title}
            </span>
            {!isCollapsed && children}
        </div>
    );
};

function Repertoire() {
    const lang: Language = useDataStore((state) => state.lang);

    const { mapType, setMapStyle } = useMapStore((state) => ({
        setMapStyle: state.setMapStyle,
        mapType: state.mapType,
    }));

    const { user, tutorials, updateCompletedTutorials } = useGlobalUserStore(
        (state: any) => ({
            user: state.user,
            tutorials: state.tutorials,
            updateCompletedTutorials: state.updateCompletedTutorials,
        }),
    );

    function onComplete() {
        const newTuts = [...tutorials];
        newTuts[TutorialPages.REPERTOIRE] = true;
        updateCompletedTutorials(newTuts);
    }

    useEffect(() => {
        if (user !== UserType.VISITOR) {
            if (!tutorials[TutorialPages.REPERTOIRE]) {
                const tour = RepertoirePageTutorial(onComplete);
                tour.start();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const repertoireData = useGlobalDataStore(
        (state: any) => state.repertoireData,
    );

    useEffect(() => {
        if (mapType !== MapType.REPERTOIRE) {
            setMapStyle(MapType.REPERTOIRE);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapType, setMapStyle]);

    const fetchedData = {
        firstField: {
            type: DataCardType.SIMPLE,
            title: RepertoirePromptsTranslations.data_card1_title,
            description: {
                FR:
                    repertoireData.length +
                    ' ' +
                    RepertoirePromptsTranslations.data_card1_description['FR'],
                EN:
                    repertoireData.length +
                    ' ' +
                    RepertoirePromptsTranslations.data_card1_description['EN'],
            },

            graphData: [],
        },
        secondField: {
            type: DataCardType.SIMPLE_GRAPH,
            title: RepertoirePromptsTranslations.data_card2_title,
            description: RepertoirePromptsTranslations.data_card2_description,
            graphData: [
                {
                    graphType: GraphBoxType.DOUGHNUT,
                    donnes: [AlbumDataFields.DIRIGEANT_AGE],
                },
            ],
        },
        thirdField: {
            type: DataCardType.SEARCH,
            title: RepertoirePromptsTranslations.data_card3_title,
            description: { FR: '', EN: '' },
            graphData: [],
        },
    };
    return (
        <PageContentContainer
            filterMenu={true}
            className="overflow-auto pb-10 pl-[30px]"
        >
            <h1 className="text-2xl tracking-wide text-black dark:text-white z-10 mt-12 mb-2 cursor-default">
                {RepertoirePromptsTranslations.page_title[lang]}
            </h1>
            <div className="flex flex-col space-y-4">
                <DataCard content={fetchedData.firstField} year={2022} />
                {/* <DataCard content={fetchedData.secondField} /> */}
                <DataCardDiv title="Proportion d'entreprises familiales privées au Québec">
                    <div className="flex flex-row items-center justify-center">
                        <Donut size={90}></Donut>
                        <p className="text-xs">
                            {' '}
                            {
                                RepertoirePromptsTranslations.graph_description[
                                    lang
                                ]
                            }
                        </p>
                    </div>
                </DataCardDiv>
                <DataCard content={fetchedData.thirdField} year={2022} />
            </div>
        </PageContentContainer>
    );
}

export default Repertoire;
