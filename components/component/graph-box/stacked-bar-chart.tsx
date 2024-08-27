import { ChartSize } from '@/components/enums/chart-size-enum';
import React from 'react';
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

interface StackedBarChartProps {
    chartContent: ChartContent;
    chartSize?: ChartSize;
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({
    chartContent,
    chartSize = ChartSize.SMALL,
}) => {
    console.log(chartContent);
    return (
        <div
            className={`dark:text-white ${chartSize === ChartSize.SMALL ? 'text-sm' : 'text-base'}`}
        >
            <ResponsiveContainer width={chartSize} height={chartSize}>
                <BarChart data={chartContent.data}>
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
                    {Object.keys(chartContent.data[0])
                        .filter((key) => key !== 'name')
                        .map((key, index) => (
                            <Bar
                                key={key}
                                dataKey={key}
                                stackId={key}
                                fill={chartPalette[index % chartPalette.length]}
                            />
                        ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StackedBarChart;
