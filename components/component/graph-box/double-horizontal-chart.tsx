import { ChartSize } from '@/components/enums/chart-size-enum';
import React, { useEffect, useState, useRef } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { chartPalette } from '@/constants/color-palet';
import { ChartContent } from '@/components/interface/chart-content';
import {
    ChartData,
    ChartDataMultipleFileds,
} from '@/components/interface/chart-data';

interface SimpleDoubleHorizontalBarChartProps {
    chartContent: ChartContent;
    chartSize?: ChartSize;
}

// Custom label component to handle long text
const CustomYAxisLabel = (props: any) => {
    const { x, y, value } = props;
    const text = value ?? ''; // Default to an empty string if value is undefined
    const textLength = text.length;
    const rotateAngle = textLength > 15 ? -45 : 0; // Adjust threshold as needed

    return (
        <text
            x={x}
            y={y}
            dy={4}
            textAnchor="end"
            fill="inherit"
            fontSize={12}
            transform={`rotate(${rotateAngle} ${x} ${y})`}
        >
            {text}
        </text>
    );
};

const DoubleHorizontalBarChart: React.FC<
    SimpleDoubleHorizontalBarChartProps
> = ({ chartContent, chartSize = ChartSize.SMALL }) => {
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
        <div className="dark:text-white">
            <ResponsiveContainer width={chartSize} height={chartSize}>
                <BarChart layout="vertical" data={chartData}>
                    <XAxis
                        type="number"
                        stroke="currentColor"
                        fill="currentColor"
                    />
                    <YAxis
                        dataKey="name"
                        type="category"
                        width={70}
                        tick={<CustomYAxisLabel fill="currentColor" />}
                        stroke="currentColor"
                    />
                    <Tooltip />
                    {chartData &&
                        chartData.length > 0 &&
                        Object.keys(chartData[0])
                            .filter((key) => key !== 'name') // Exclude the 'name' key
                            .map((key, index) => (
                                <Bar
                                    key={key}
                                    dataKey={key}
                                    fill={
                                        chartPalette[
                                            index % chartPalette.length
                                        ]
                                    }
                                    barSize={chartSize / 20} // Adjust the bar size as needed
                                />
                            ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DoubleHorizontalBarChart;
