import { ChartSize } from '@/components/enums/chart-size-enum';
import { ChartContent } from '@/components/interface/chart-content';
import React, { useEffect } from 'react';
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
    return (
        <div className="dark:text-white">
            <ResponsiveContainer width={chartSize + 100} height={chartSize}>
                <BarChart layout="vertical" data={chartContent.data}>
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
                        {chartContent.data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={chartPalette[index % chartPalette.length]}
                                onClick={() =>
                                    filterData(chartContent.donnees[0], entry)
                                }
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HorizontalBarChart;
