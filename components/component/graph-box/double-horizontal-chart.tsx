import { ChartSize } from '@/components/enums/chart-size-enum';
import React, { useEffect, useState } from 'react';
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

    useEffect(() => {
        setChartData(chartContent.data);
    }, [chartContent]);
    // Check chartSize and set default values if needed
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
                    {chartContent.data.length > 0 &&
                        Object.keys(chartContent.data[0])
                            .filter((key) => key !== 'name') // Exclude the 'name' key
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
                                    barSize={chartSize / 20} // Adjust the bar size as needed
                                />
                            ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DoubleHorizontalBarChart;
