'use client';
import DataCard from '@/components/component/data-card/data-card';
import PageContentContainer from '@/components/component/page-content-container/page-content-container';
import { DataCardType } from '@/components/enums/data-card-type-enum';
import RepertoirePageTutorial from '@/components/component/tutorials/repertoire-page-tutorial';
import useMapStore from '@/stores/global-map-store';
import { MapType } from '@/components/enums/map-type-enum';
import { useEffect, useState } from 'react';
import { Language } from '@/components/enums/language';
import { RepertoirePromptsTranslations } from '@/constants/translations/page-prompts';
import useDataStore from '@/reducer/dataStore';
import useGlobalUserStore from '@/stores/global-user-store';
import { TutorialPages, UserType } from '@/components/enums/user-type-enum';
import {
    UpArrowSVG,
    FactorySVG,
} from '@/components/component/svg-icons/svg-icons';
import Image from 'next/image';
import flag_quebec from '@/public/images/flag-quebec.png';
import flag_canada from '@/public/images/flag-canada.png';
import { GraphDataHttpRequestService } from '@/services/data-http-request-service';

const DataCardDiv: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <div
            className={`w-[270px] h-[120px] bg-[#f5ebe0] dark:bg-[#363636] dark:bg-opacity-50 dark:text-white backdrop-filter
                 backdrop-blur bg-opacity-50 saturate-100 backdrop-contrast-100 rounded-xl shadow-3xl pointer-events-auto
                 flex flex-col items-center space-y-1 relative`}
        >
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

    const [nombreEntreprises, setNombreEntreprises] = useState<number | null>(
        null,
    );
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchNombreEntreprises() {
            const nombre =
                await GraphDataHttpRequestService.getLengthRepertoireData();
            if (nombre > 0) {
                setNombreEntreprises(nombre);
            } else {
                setLoading(false);
            }
        }

        if (!loading && !nombreEntreprises) {
            setLoading(true);
            fetchNombreEntreprises();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (mapType !== MapType.REPERTOIRE) {
            setMapStyle(MapType.REPERTOIRE);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapType, setMapStyle]);

    const fetchedData = {
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
            <div className="flex flex-col space-y-4 max-w-[550px] mt-16">
                <div className="flex flex-row gap-4 w-full">
                    <DataCardDiv>
                        <h1 className="w-full text-sm text-center pt-1">
                            {RepertoirePromptsTranslations.div1_sentence[lang]}
                        </h1>
                        {nombreEntreprises && (
                            <div className="flex flex-row justify-evenly items-center w-[70%]">
                                <UpArrowSVG className="w-14 h-14"></UpArrowSVG>
                                <p className="text-4xl">{nombreEntreprises}</p>
                            </div>
                        )}
                        {!nombreEntreprises && (
                            <div className="loader-circle-small"></div>
                        )}
                        <p className="text-xs text-left w-full pl-24">
                            {
                                RepertoirePromptsTranslations.div1_descriptive[
                                    lang
                                ]
                            }
                        </p>
                        <Image
                            src={flag_quebec}
                            alt="flag_quebec"
                            height={50}
                            width={50}
                            className="rounded-3xl absolute bottom-1 right-1"
                        ></Image>
                    </DataCardDiv>
                    <DataCardDiv>
                        <h1 className="w-full text-sm text-center pt-1">
                            {RepertoirePromptsTranslations.div2_sentence[lang]}
                        </h1>
                        <div className="flex flex-row justify-evenly items-center w-[80%]">
                            <FactorySVG className="w-12 h-12"></FactorySVG>
                            <p className="text-4xl">63,1 %</p>
                        </div>
                        <p className="text-xs text-center w-[77%] text-wrap self-start pl-2 mb-1">
                            {
                                RepertoirePromptsTranslations.div2_descriptive[
                                    lang
                                ]
                            }
                        </p>
                        <Image
                            src={flag_canada}
                            alt="flag_canada"
                            height={50}
                            width={50}
                            className="rounded-3xl absolute bottom-1 right-1"
                        ></Image>
                    </DataCardDiv>
                </div>
                <DataCard content={fetchedData.thirdField} year={2022} />
            </div>
        </PageContentContainer>
    );
}

export default Repertoire;
