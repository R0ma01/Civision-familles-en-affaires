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
import { ChartSize } from '@/components/enums/chart-size-enum';
import { ChartContent } from '@/components/interface/chart-content';
import {
    ChartData,
    ChartDataMultipleFileds,
} from '@/components/interface/chart-data';
import { MainDataFields } from '@/components/enums/data-types-enum';

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

    const [size, setSize] = useState<ChartSize>(chartSize);

    useEffect(() => {
        setSize(chartSize);
    }, [chartSize]);
    const [yAxisWidth, setYAxisWidth] = useState<number>(40);

    // Calculate dynamic height based on the number of data points
    const calculateHeight = () => {
        const dataLength = chartContent.data.length;
        const baseHeight = size === ChartSize.SMALL ? 150 : 300;
        const dynamicHeight =
            size === ChartSize.SMALL
                ? baseHeight // Fixed height for SMALL
                : Math.max(baseHeight, dataLength * 40); // 30px per line for other sizes
        return dynamicHeight;
    };

    useEffect(() => {
        if (chartContent.data?.length > 0) {
            if (!originalOrder.current) {
                originalOrder.current = chartContent.data as ChartData[];
            } else {
                const updatedData = originalOrder.current.map(
                    (originalItem) => {
                        const newItem = chartContent.data.find(
                            (newItem) => newItem.name === originalItem.name,
                        );
                        return newItem
                            ? { ...originalItem, ...newItem }
                            : { ...originalItem, value: 0 };
                    },
                );

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

            // Calculate the longest label's width and set the Y-axis width
            const longestLabel = Math.max(
                ...chartContent.data.map((item) => item.name?.length),
            );
            const calculatedWidth = Math.min(longestLabel * 8, 150); // Adjust multiplier and max width as needed
            setYAxisWidth(calculatedWidth);
        }
    }, [chartContent.data]);

    return (
        <div className="dark:text-white">
            <ResponsiveContainer width={size + 100} height={calculateHeight()}>
                <BarChart layout="vertical" data={chartData}>
                    {size === ChartSize.SMALL ? (
                        <>
                            <XAxis
                                type="number"
                                fontSize={8}
                                stroke="currentColor"
                            />
                            <YAxis
                                dataKey="name"
                                type="category"
                                width={yAxisWidth}
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
                                width={yAxisWidth}
                                fontSize={12}
                                stroke="currentColor"
                            />
                        </>
                    )}

                    <Tooltip content={<CustomTooltip />} />

                    <Bar
                        dataKey="value"
                        barSize={
                            size === ChartSize.SMALL
                                ? 10
                                : size === ChartSize.MEDIUM
                                  ? 15
                                  : 20
                        }
                    >
                        s
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
