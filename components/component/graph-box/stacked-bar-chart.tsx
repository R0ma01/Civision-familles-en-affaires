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
    CartesianGrid,
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
        (ChartData | ChartDataMultipleFileds)[] | undefined
    >(undefined);
    const [stackedKeys, setStackedKey] = useState<string[]>([]);

    useEffect(() => {
        if (chartContent.data.length > 0) {
            // No transformation needed, we can directly use the data
            setChartData(chartContent.data);
        }
    }, [chartContent.data]);

    // Extract all fields (keys) from the first element of chartData (excluding 'name')
    useEffect(() => {
        if (chartData) {
            if (chartData.length > 0) {
                setStackedKey(Object.keys(chartData[0]));
            }
        }
    }, [chartData]);

    return (
        <div>
            <ResponsiveContainer width={chartSize} height={chartSize}>
                <BarChart
                    data={chartData}
                    margin={
                        chartSize !== ChartSize.SMALL
                            ? {
                                  top: 20,
                                  right: 30,
                                  left: 20,
                                  bottom: 5,
                              }
                            : {}
                    }
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    {chartSize !== ChartSize.SMALL && <Legend />}

                    {stackedKeys.map((key, index) => {
                        if (key !== 'name') {
                            return (
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
                            );
                        }
                    })}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StackedBarChart;
