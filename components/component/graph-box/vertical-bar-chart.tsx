import React, { useEffect, useState, useRef } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    Cell,
    Legend,
} from 'recharts';
import { chartPalette } from '@/constants/color-palet';
import { ChartContent } from '@/components/interface/chart-content';
import { ChartSize } from '@/components/enums/chart-size-enum';
import { MainDataFields } from '@/components/enums/data-types-enum';
import {
    ChartData,
    ChartDataMultipleFileds,
} from '@/components/interface/chart-data';
import { GraphTextService } from '@/services/translations';
import { Language } from '@/components/enums/language';

interface VerticalBarChartProps {
    chartContent: ChartContent;
    chartSize?: ChartSize;
    filterData?: (dataField: MainDataFields, entry: any) => void;
}

const VerticalBarChart: React.FC<VerticalBarChartProps> = ({
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

    const [size, setSize] = useState<ChartSize>(chartSize);

    useEffect(() => {
        setSize(chartSize);
    }, [chartSize]);

    useEffect(() => {
        if (chartContent.data.length > 0) {
            if (!originalOrder.current) {
                // Save the initial order on first render
                originalOrder.current = chartContent.data as ChartData[];
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

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const customLabel = GraphTextService.getFieldLabel(
                chartContent.donnees[0],
                payload[0].payload.name,
                Language.FR,
            );

            return (
                <div className="custom-tooltip bg-white p-2 shadow-lg rounded text-black max-w-[200px] text-wrap">
                    <p className="label font-bold text-black">{customLabel}</p>
                    <p className="intro text-black">{`${payload[0].payload.value}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="flex flex-col h-auto dark:text-white">
            <ResponsiveContainer width={size} height={size}>
                <BarChart data={chartContent.data}>
                    {size === ChartSize.SMALL ? (
                        <>
                            <YAxis
                                type="number"
                                fontSize={8}
                                stroke="currentColor"
                                width={25}
                            />
                            <XAxis
                                dataKey="name"
                                type="category"
                                fontSize={8}
                                stroke="currentColor"
                            />
                        </>
                    ) : (
                        <>
                            <YAxis
                                type="number"
                                fontSize={12}
                                stroke="currentColor"
                                width={25}
                            />
                            <XAxis
                                dataKey="name"
                                type="category"
                                fontSize={12}
                                stroke="currentColor"
                                tickFormatter={(value: any, index: number) =>
                                    GraphTextService.getFieldLabel(
                                        chartContent.donnees[0],
                                        value,
                                        Language.FR,
                                    ).toString()
                                }
                            />
                        </>
                    )}
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                        dataKey="value"
                        barSize={size / (10 + chartContent.data.length)}
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
                                    onClick={() => {
                                        filterData(
                                            chartContent.donnees[0],
                                            entry,
                                        );
                                    }}
                                />
                            ))}
                        {!chartData && <div className="loader-circle"></div>}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default VerticalBarChart;
