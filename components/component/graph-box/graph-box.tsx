/* eslint-disable react-hooks/rules-of-hooks */
// GraphBox.tsx
import React, { useEffect, useState } from 'react';
import { GraphBoxType } from '@/components/enums/graph-box-enum';
import Doughnut from './doughnut-chart';
import GraphBoxContent from '@/components/interface/graph-box-content';
import HorizontalBarChart from './horizontal-bar-chart';
import VerticalBarChart from './vertical-bar-chart';
import StackedBarChart from './stacked-bar-chart';
import DoubleHorizontalChart from './double-horizontal-chart';
import {
    useDoughnutChartAnalysis,
    useStackedBarChartAnalysis,
    doubleHorizontalBarChartAnalysis,
} from '@/services/data-analysis-service';
import { ChartContent } from '@/components/interface/chart-content';
import useGlobalDataStore from '@/stores/global-data-store';
import { ChartSize } from '@/components/enums/chart-size-enum';
import { MainDataFields } from '@/components/enums/data-types-enum';
import useGlobalFilterStore from '@/stores/global-filter-store';
import { filterPredicate } from '@/services/filtering-service';
import {
    ChartData,
    ChartDataMultipleFileds,
} from '@/components/interface/chart-data';
import { CompanyInfo } from '@/components/interface/company';
import { GraphDataHttpRequestService } from '@/services/data-http-request-service';

interface GraphBoxProps {
    content: GraphBoxContent;
    chartSize?: ChartSize;
}

const GraphBox: React.FC<GraphBoxProps> = ({
    content,
    chartSize = ChartSize.MEDIUM,
}) => {
    const {
        studyFilteredData,
        studyCompanyData,
        setStudyFilteredData,
        loading,
    } = useGlobalDataStore((state: any) => ({
        studyFilteredData: state.studyFilteredData,
        studyCompanyData: state.studyCompanyData,
        setStudyFilteredData: state.setStudyFilteredData,
        loading: state.loading,
    }));
    const [chartContent, setChartContent] = useState<ChartContent | null>(null);
    const { filterData, setFilter, getFilter } = useGlobalFilterStore();
    const [frozen, setFrozen] = useState<boolean>(false);

    function filterNewData(dataField: MainDataFields, entry: ChartData) {
        const currentFilter = getFilter(dataField);
        if (currentFilter === entry.name) {
            setFilter(dataField, 'toutes');
        } else {
            setFilter(dataField, entry.name);
        }
        setFrozen(true);
        const newData = studyCompanyData.filter((company: CompanyInfo) =>
            filterPredicate(filterData, company),
        );
        setStudyFilteredData(newData);
    }

    const [chartData, setChartData] = useState<
        ChartData[] | ChartDataMultipleFileds[]
    >([]);

    async function fetchMultiple(donnes: MainDataFields[]) {
        const result = await GraphDataHttpRequestService.getChartData(
            donnes[0],
        );
        const tempResult: ChartDataMultipleFileds[] = [
            {
                name: 'groupe1',
                value1: 1,
                value2: 3,
            },
            {
                name: 'groupe2',
                value1: 1,
                value2: 3,
            },
        ];
        setChartData(tempResult);
    }

    async function fetch(donnes: MainDataFields) {
        const result = await GraphDataHttpRequestService.getChartData(donnes);
        setChartData(result);
    }

    useEffect(() => {
        if (
            content.graphType === GraphBoxType.DOUGHNUT ||
            content.graphType === GraphBoxType.VERTICAL_BARCHART ||
            content.graphType === GraphBoxType.HORIZONTAL_BARCHART
        ) {
            fetch(content.donnes[0]);
        } else {
            fetchMultiple(content.donnes);
        }
    }, [content]);

    useEffect(() => {
        const filterChartData = () => {
            if (frozen) {
                setFrozen(false);
                return;
            }
            switch (content.graphType) {
                case GraphBoxType.HORIZONTAL_BARCHART:

                case GraphBoxType.VERTICAL_BARCHART:

                case GraphBoxType.DOUGHNUT:
                // const tempChartData: ChartContent = {
                //     donnees: content.donnes,
                //     data: chartData,
                //     totalData: 1000,
                // };

                // setChartContent(tempChartData);
                // break;
                case GraphBoxType.DOUBLE_HORIZONTAL_BARCHART:
                // const doubleHorizontalData =
                //     doubleHorizontalBarChartAnalysis(
                //         content.donnes,
                //         studyFilteredData,
                //     );
                // setChartContent(doubleHorizontalData);
                // break;

                case GraphBoxType.STACKED_BARCHART:
                // const stackedData = useStackedBarChartAnalysis(
                //     content.donnes,
                //     studyFilteredData,
                // );
                // setChartContent(stackedData);
                // break;
                default:
                    // const emptyContent: ChartContent = {
                    //     donnees: [MainDataFields.ANNEE_FONDATION],
                    //     data: [],
                    //     totalData: 0,
                    // };
                    // setChartContent(emptyContent);
                    // break;
                    const tempChartData: ChartContent = {
                        donnees: content.donnes,
                        data: chartData,
                        totalData: 1000,
                    };

                    setChartContent(tempChartData);
                    break;
            }
        };

        filterChartData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content, studyFilteredData, chartData]);

    if (loading) {
        return (
            <div className="py-8 px-8 pointer-events-auto">
                <p>Loading...</p>
            </div>
        );
    }

    if (!chartContent) {
        return (
            <div className="py-8 px-8 pointer-events-auto">
                <p>No data available or an error occurred.</p>
            </div>
        );
    }

    switch (content.graphType) {
        case GraphBoxType.DOUBLE_HORIZONTAL_BARCHART:
            return (
                <DoubleHorizontalChart
                    chartContent={chartContent}
                    chartSize={chartSize}
                />
            );
        case GraphBoxType.DOUGHNUT:
            return (
                <Doughnut
                    chartContent={chartContent}
                    chartSize={chartSize}
                    filterData={filterNewData}
                />
            );
        case GraphBoxType.HORIZONTAL_BARCHART:
            return (
                <HorizontalBarChart
                    chartContent={chartContent}
                    chartSize={chartSize}
                    filterData={filterNewData}
                />
            );
        case GraphBoxType.VERTICAL_BARCHART:
            return (
                <VerticalBarChart
                    chartContent={chartContent}
                    chartSize={chartSize}
                    filterData={filterNewData}
                />
            );
        case GraphBoxType.STACKED_BARCHART:
            return (
                <StackedBarChart
                    chartContent={chartContent}
                    chartSize={chartSize}
                />
            );
        default:
            return (
                <div className="py-8 px-8 pointer-events-auto">
                    <p>No data available or an error occurred.</p>
                </div>
            );
    }
};

export default GraphBox;
