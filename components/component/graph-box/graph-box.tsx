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
import { ChartData } from '@/components/interface/chart-data';
import { CompanyInfo } from '@/components/interface/company';

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
    const [chartData, setChartData] = useState<ChartContent | null>(null);

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

    useEffect(() => {
        const filterChartData = () => {
            if (frozen) {
                setFrozen(false);
                return;
            }
            switch (content.graphType) {
                case GraphBoxType.DOUGHNUT:
                    const doughnutData = useDoughnutChartAnalysis(
                        content.donnes,
                        studyFilteredData,
                    );
                    setChartData(doughnutData);
                    break;
                case GraphBoxType.DOUBLE_HORIZONTAL_BARCHART:
                    const doubleHorizontalData =
                        doubleHorizontalBarChartAnalysis(
                            content.donnes,
                            studyFilteredData,
                        );
                    setChartData(doubleHorizontalData);
                    break;
                case GraphBoxType.HORIZONTAL_BARCHART:
                    const horizontalData = useDoughnutChartAnalysis(
                        content.donnes,
                        studyFilteredData,
                    );
                    setChartData(horizontalData);
                    break;
                case GraphBoxType.VERTICAL_BARCHART:
                    const verticalData = useDoughnutChartAnalysis(
                        content.donnes,
                        studyFilteredData,
                    );
                    setChartData(verticalData);
                    break;
                case GraphBoxType.STACKED_BARCHART:
                    const stackedData = useStackedBarChartAnalysis(
                        content.donnes,
                        studyFilteredData,
                    );
                    setChartData(stackedData);
                    break;
                default:
                    const emptyContent: ChartContent = {
                        donnees: [MainDataFields.ANNEE_FONDATION],
                        data: [],
                        totalData: 0,
                    };
                    setChartData(emptyContent);
                    break;
            }
        };

        filterChartData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content, studyFilteredData]);

    if (loading) {
        return (
            <div className="py-8 px-8 pointer-events-auto">
                <p>Loading...</p>
            </div>
        );
    }

    if (!chartData) {
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
                    chartContent={chartData}
                    chartSize={chartSize}
                />
            );
        case GraphBoxType.DOUGHNUT:
            return (
                <Doughnut
                    chartContent={chartData}
                    chartSize={chartSize}
                    filterData={filterNewData}
                />
            );
        case GraphBoxType.HORIZONTAL_BARCHART:
            return (
                <HorizontalBarChart
                    chartContent={chartData}
                    chartSize={chartSize}
                    filterData={filterNewData}
                />
            );
        case GraphBoxType.VERTICAL_BARCHART:
            return (
                <VerticalBarChart
                    chartContent={chartData}
                    chartSize={chartSize}
                    filterData={filterNewData}
                />
            );
        case GraphBoxType.STACKED_BARCHART:
            return (
                <StackedBarChart
                    chartContent={chartData}
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
