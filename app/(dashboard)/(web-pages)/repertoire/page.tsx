'use client';
import DataCard from '@/components/component/data-card/data-card';
import PageContentContainer from '@/components/component/page-content-container/page-content-container';
import { DataCardType } from '@/components/enums/data-card-type-enum';
import { GraphBoxType } from '@/components/enums/graph-box-enum';
import { AlbumDataFields } from '@/components/enums/data-types-enum';
import RepertoirePageTutorial from '@/components/component/tutorials/repertoire-page-tutorial';
import useMapStore from '@/stores/global-map-store';
import { MapType } from '@/components/enums/map-type-enum';
import { useEffect } from 'react';
import { Language } from '@/components/enums/language';
import { RepertoirePromptsTranslations } from '@/constants/translations/page-prompts';
import useDataStore from '@/reducer/dataStore';

function Repertoire() {
    const lang: Language = useDataStore((state) => state.lang);

    const tour = RepertoirePageTutorial();

    const { mapType, setMapStyle } = useMapStore((state) => ({
        setMapStyle: state.setMapStyle,
        mapType: state.mapType,
    }));

    useEffect(() => {
        if (mapType !== MapType.REPERTOIRE) {
            setMapStyle(MapType.REPERTOIRE);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapType, setMapStyle]);

    const fetchedData = {
        firstField: {
            type: DataCardType.SIMPLE,
            title: RepertoirePromptsTranslations.data_card1_title[lang],
            description:
                RepertoirePromptsTranslations.data_card1_description[lang],
            graphData: [],
        },
        secondField: {
            type: DataCardType.SIMPLE_GRAPH,
            title: RepertoirePromptsTranslations.data_card2_title[lang],
            description:
                RepertoirePromptsTranslations.data_card2_description[lang],
            graphData: [
                {
                    graphType: GraphBoxType.DOUGHNUT,
                    donnes: [AlbumDataFields.DIRIGEANT_AGE],
                },
            ],
        },
        thirdField: {
            type: DataCardType.SEARCH,
            title: RepertoirePromptsTranslations.data_card3_title[lang],
            description: ``,
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
                <DataCard content={fetchedData.firstField} />
                <DataCard content={fetchedData.secondField} />
                <DataCard content={fetchedData.thirdField} />
            </div>
        </PageContentContainer>
    );
}

export default Repertoire;
