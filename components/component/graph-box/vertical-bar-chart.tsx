import React from 'react';
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
import { ChartContent } from '@/components/interface/chart-content';
import { ChartSize } from '@/components/enums/chart-size-enum';
import { MainDataFields } from '@/components/enums/data-types-enum';

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
    return (
        <div className="flex flex-col h-auto dark:text-white">
            <ResponsiveContainer width={chartSize} height={chartSize}>
                <BarChart data={chartContent.data}>
                    {chartSize === ChartSize.SMALL ? (
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
                            />
                        </>
                    )}
                    <Tooltip />
                    <Bar
                        dataKey="value"
                        barSize={chartSize / (10 + chartContent.data.length)}
                    >
                        {chartContent.data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={chartPalette[index % chartPalette.length]}
                                onClick={() => {
                                    filterData(chartContent.donnees[0], entry);
                                }}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default VerticalBarChart;
