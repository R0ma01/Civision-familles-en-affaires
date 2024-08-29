import { ChartSize } from '@/components/enums/chart-size-enum';
import { ChartContent } from '@/components/interface/chart-content';
import React, { useEffect, useState, useRef } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    Cell,
} from 'recharts';
import { chartPalette } from '@/constants/color-palet';
import { MainDataFields } from '@/components/enums/data-types-enum';
import {
    ChartData,
    ChartDataMultipleFileds,
} from '@/components/interface/chart-data';

interface SimpleHorizontalBarChartProps {
    chartContent: ChartContent;
    chartSize?: ChartSize;
    filterData?: (dataField: MainDataFields, entry: any) => void;
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div
                className="custom-tooltip"
                style={{
                    cursor: 'pointer',
                    background: 'white',
                    color: 'black',
                    padding: '5px',
                    border: '1px solid #ccc',
                }}
            >
                <p>{`${payload[0].payload.name} : ${payload[0].payload.value}`}</p>
            </div>
        );
    }
    return null;
};

const HorizontalBarChart: React.FC<SimpleHorizontalBarChartProps> = ({
    chartContent,
    chartSize = ChartSize.SMALL,
    filterData = (entry: any) => {},
}) => {
    const [chartData, setChartData] = useState<
        ChartData[] | ChartDataMultipleFileds[] | undefined
    >(undefined);

    const originalOrder = useRef<
        ChartData[] | ChartDataMultipleFileds[] | undefined
    >(undefined);

    useEffect(() => {
        if (chartContent.data.length > 0) {
            if (!originalOrder.current) {
                // Save the initial order on first render
                originalOrder.current = chartContent.data;
            } else {
                // Reorder new data to match the original order
                const updatedData = originalOrder.current.map(
                    (originalItem) => {
                        const newItem = chartContent.data.find(
                            (newItem) => newItem.name === originalItem.name,
                        );
                        return newItem
                            ? { ...originalItem, ...newItem } // Merge values from new data
                            : { ...originalItem, value: 0 };
                    },
                );

                // Add new items that were not in the original data
                chartContent.data.forEach((newItem) => {
                    if (
                        !originalOrder.current!.some(
                            (originalItem) =>
                                originalItem.name === newItem.name,
                        )
                    ) {
                        updatedData.push(newItem);
                    }
                });

                setChartData(updatedData);
                originalOrder.current = updatedData;
            }
        }
    }, [chartContent.data]);

    return (
        <div className="dark:text-white">
            <ResponsiveContainer width={chartSize + 100} height={chartSize}>
                <BarChart layout="vertical" data={chartData}>
                    {chartSize === ChartSize.SMALL ? (
                        <>
                            <XAxis
                                type="number"
                                fontSize={8}
                                width={30}
                                stroke="currentColor"
                            />
                            <YAxis
                                dataKey="name"
                                type="category"
                                width={40}
                                fontSize={8}
                                stroke="currentColor"
                            />
                        </>
                    ) : (
                        <>
                            <XAxis
                                type="number"
                                fontSize={12}
                                stroke="currentColor"
                            />
                            <YAxis
                                dataKey="name"
                                type="category"
                                width={150}
                                fontSize={12}
                                stroke="currentColor"
                            />
                        </>
                    )}

                    <Tooltip content={<CustomTooltip />} />

                    <Bar
                        dataKey="value"
                        barSize={chartSize / (10 + chartContent.data.length)}
                    >
                        {chartData &&
                            chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        chartPalette[
                                            index % chartPalette.length
                                        ]
                                    }
                                    onClick={() =>
                                        filterData(
                                            chartContent.donnees[0],
                                            entry,
                                        )
                                    }
                                />
                            ))}
                        {!chartData && <div>Chargement... </div>}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HorizontalBarChart;
