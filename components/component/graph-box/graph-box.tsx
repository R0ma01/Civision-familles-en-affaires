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
import { ChartContent } from '@/components/interface/chart-content';
import { ChartSize } from '@/components/enums/chart-size-enum';
import { MainDataFields } from '@/components/enums/data-types-enum';
import useGlobalFilterStore from '@/stores/global-filter-store';
import {
    ChartData,
    ChartDataMultipleFileds,
} from '@/components/interface/chart-data';
import { GraphDataHttpRequestService } from '@/services/data-http-request-service';

interface GraphBoxProps {
    content: GraphBoxContent;
    chartSize?: ChartSize;
}

const GraphBox: React.FC<GraphBoxProps> = ({ content, chartSize }) => {
    const [chartContent, setChartContent] = useState<ChartContent | null>(null);
    const filterData = useGlobalFilterStore((state) => state.filterData);
    const setFilter = useGlobalFilterStore((state) => state.setFilter);
    const getFilter = useGlobalFilterStore((state) => state.getFilter);

    const [frozen, setFrozen] = useState<boolean>(false);
    const [size, setChartSize] = useState<ChartSize>(
        chartSize ? chartSize : ChartSize.MEDIUM,
    );

    function filterNewData(dataField: MainDataFields, entry: ChartData) {
        const currentFilter = getFilter(dataField);
        if (currentFilter === entry.name) {
            setFilter(dataField, 'toutes');
        } else {
            setFilter(dataField, entry.name);
        }
        setFrozen(true);
    }

    const [chartData, setChartData] = useState<
        (ChartData | ChartDataMultipleFileds)[]
    >([]);

    const [nanData, setNanData] = useState<ChartData | ChartDataMultipleFileds>(
        { name: 'NaN', value: 0 },
    );

    useEffect(() => {
        async function fetchMultiple(donnes: MainDataFields[]) {
            const result = await GraphDataHttpRequestService.getChartData(
                donnes,
                filterData,
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
            setChartData(result ? result : tempResult);
        }

        async function fetch(donnes: MainDataFields[]) {
            const result = await GraphDataHttpRequestService.getChartData(
                donnes,
                filterData,
            );

            console.log(donnes);
            console.log(result);
            // const nanResult = result.findIndex(
            //     (item) => item.name.toString() === 'NaN',
            // );
            // const newResult = result.filter(
            //     (item) => item.name.toString() !== 'NaN',
            // );
            // if (nanResult > -1) setNanData(result[nanResult]);

            const tempResult: ChartData[] = [
                {
                    name: 'groupe1',
                    value: 1,
                },
                {
                    name: 'groupe2',
                    value: 1,
                },
            ];
            setChartData(result ? result : tempResult);
        }

        if (
            content.graphType === GraphBoxType.DOUGHNUT ||
            content.graphType === GraphBoxType.VERTICAL_BARCHART ||
            content.graphType === GraphBoxType.HORIZONTAL_BARCHART
        ) {
            fetch(content.donnes);
        } else {
            fetchMultiple(content.donnes);
        }
    }, [content, filterData]);

    useEffect(() => {
        async function fetchMultiple(donnes: MainDataFields[]) {
            const result = await GraphDataHttpRequestService.getChartData(
                donnes,
                filterData,
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
            setChartData(result ? result : tempResult);
        }

        async function fetch(donnes: MainDataFields[]) {
            const result = await GraphDataHttpRequestService.getChartData(
                donnes,
                filterData,
            );

            // const nanResult = result.findIndex(
            //     (item) => item.name.toString() === 'NaN',
            // );
            // const newResult = result.filter(
            //     (item) => item.name.toString() !== 'NaN',
            // );
            // if (nanResult > -1) setNanData(result[nanResult]);
            const tempResult: ChartData[] = [
                {
                    name: 'groupe1',
                    value: 1,
                },
                {
                    name: 'groupe2',
                    value: 1,
                },
            ];
            setChartData(result ? result : tempResult);
        }

        if (
            content.graphType === GraphBoxType.DOUGHNUT ||
            content.graphType === GraphBoxType.VERTICAL_BARCHART ||
            content.graphType === GraphBoxType.HORIZONTAL_BARCHART
        ) {
            fetch(content.donnes);
        } else {
            fetchMultiple(content.donnes);
        }
    }, [filterData, content]);

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

                case GraphBoxType.DOUBLE_HORIZONTAL_BARCHART:

                case GraphBoxType.STACKED_BARCHART:

                default:
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
    }, [content, chartData, filterData]);

    useEffect(() => {
        if (!chartSize) {
            if (chartData) {
                setChartSize(ChartSize.LARGE);
            } else {
                setChartSize(ChartSize.MEDIUM);
            }
        }
    }, [chartData, chartSize]);

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
                <>
                    <DoubleHorizontalChart
                        chartContent={chartContent}
                        chartSize={size}
                    />{' '}
                    {size !== ChartSize.SMALL && (
                        <p className="text-red-600 text-left">
                            *les {nanData.value} valeurs de {nanData.name} ne
                            sont pas prises en compte ici
                        </p>
                    )}
                </>
            );
        case GraphBoxType.DOUGHNUT:
            return (
                <>
                    <div>
                        <Doughnut
                            chartContent={chartContent}
                            chartSize={size}
                            filterData={filterNewData}
                        />{' '}
                    </div>
                    {size !== ChartSize.SMALL && (
                        <p className="text-red-600 text-left">
                            *les {nanData.value} valeurs de {nanData.name} ne
                            sont pas prises en compte ici
                        </p>
                    )}
                </>
            );
        case GraphBoxType.HORIZONTAL_BARCHART:
            return (
                <>
                    <HorizontalBarChart
                        chartContent={chartContent}
                        chartSize={size}
                        filterData={filterNewData}
                    />
                    {size !== ChartSize.SMALL && (
                        <p className="text-red-600 text-left">
                            *les {nanData.value} valeurs de {nanData.name} ne
                            sont pas prises en compte ici
                        </p>
                    )}
                </>
            );
        case GraphBoxType.VERTICAL_BARCHART:
            return (
                <>
                    <VerticalBarChart
                        chartContent={chartContent}
                        chartSize={size}
                        filterData={filterNewData}
                    />
                    {size !== ChartSize.SMALL && (
                        <p className="text-red-600 text-left">
                            *les {nanData.value} valeurs de {nanData.name} ne
                            sont pas prises en compte ici
                        </p>
                    )}
                </>
            );
        case GraphBoxType.STACKED_BARCHART:
            return (
                <>
                    <div>
                        {' '}
                        <StackedBarChart
                            chartContent={chartContent}
                            chartSize={size}
                        />
                    </div>

                    {size !== ChartSize.SMALL && (
                        <p className="text-red-600 text-left">
                            *les {nanData.value} valeurs de {nanData.name} ne
                            sont pas prises en compte ici
                        </p>
                    )}
                </>
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
