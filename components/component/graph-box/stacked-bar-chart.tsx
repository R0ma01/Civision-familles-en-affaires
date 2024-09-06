import { ChartSize } from '@/components/enums/chart-size-enum';
import React, { useEffect, useState, useRef } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from 'recharts';
import { chartPalette } from '@/constants/color-palet';
import { ChartContent } from '@/components/interface/chart-content';
import {
    ChartData,
    ChartDataMultipleFileds,
} from '@/components/interface/chart-data';

interface StackedBarChartProps {
    chartContent: ChartContent;
    chartSize?: ChartSize;
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({
    chartContent,
    chartSize = ChartSize.SMALL,
}) => {
    const [chartData, setChartData] = useState<
        ChartData[] | ChartDataMultipleFileds[] | undefined
    >(undefined);

    const originalOrder = useRef<
        (ChartData | ChartDataMultipleFileds)[] | undefined
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
        <div
            className={`dark:text-white ${
                chartSize === ChartSize.SMALL ? 'text-sm' : 'text-base'
            }`}
        >
            <ResponsiveContainer width={chartSize} height={chartSize}>
                <BarChart data={chartData}>
                    <XAxis
                        dataKey="name"
                        stroke="currentColor"
                        tick={{ fill: 'currentColor' }}
                    />
                    <YAxis
                        stroke="currentColor"
                        tick={{ fill: 'currentColor' }}
                    />
                    <Tooltip />
                    <Legend
                        wrapperStyle={{
                            paddingLeft: '10px',
                            lineHeight:
                                chartSize === ChartSize.SMALL ? '10px' : '24px',
                        }}
                        iconSize={chartSize === ChartSize.SMALL ? 8 : 12}
                        formatter={(value) => (
                            <span
                                style={{
                                    fontSize:
                                        chartSize === ChartSize.SMALL
                                            ? '6px'
                                            : '10px',
                                    color: 'currentColor',
                                }}
                            >
                                {value}
                            </span>
                        )}
                    />
                    {chartData &&
                        Object.keys(chartData[0])
                            .filter((key) => key !== 'name')
                            .map((key, index) => (
                                <Bar
                                    key={key}
                                    dataKey={key}
                                    stackId="a"
                                    fill={
                                        chartPalette[
                                            index % chartPalette.length
                                        ]
                                    }
                                />
                            ))}

                    {!chartData && (
                        <div>
                            <p>Chargement ...</p>
                        </div>
                    )}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StackedBarChart;
