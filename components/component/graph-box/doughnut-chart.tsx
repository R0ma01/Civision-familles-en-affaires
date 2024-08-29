import { useState, useEffect, useRef } from 'react';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from 'recharts';
import { chartPalette } from '@/constants/color-palet';
import { ChartSize } from '@/components/enums/chart-size-enum';
import { ChartContent } from '@/components/interface/chart-content';
import { MainDataFields } from '@/components/enums/data-types-enum';
import {
    ChartData,
    ChartDataMultipleFileds,
} from '@/components/interface/chart-data';

interface DoughnutChartProps {
    chartContent: ChartContent;
    chartSize?: ChartSize;
    interactive?: boolean;
    filterData?: (dataField: MainDataFields, entry: any) => void;
}

const Doughnut: React.FC<DoughnutChartProps> = ({
    chartContent,
    chartSize = ChartSize.SMALL,
    filterData = (entry: any) => {},
}) => {
    const [activeSlice, setActiveSlice] = useState<string | null>(null);
    const originalOrder = useRef<
        ChartData[] | ChartDataMultipleFileds[] | undefined
    >(undefined);

    const radiusMap = {
        [ChartSize.SMALL]: { inner: '30%', outer: '70%' },
        [ChartSize.MEDIUM]: { inner: '40%', outer: '85%' },
        [ChartSize.LARGE]: { inner: '35%', outer: '65%' },
    };

    const { inner, outer } = radiusMap[chartSize];

    const [chartData, setChartData] = useState<
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
                            ? { ...originalItem, value: newItem.value }
                            : { ...originalItem, value: 0 };
                    },
                );

                // Add new items that were not in the original data
                chartContent.data.forEach((newItem: any) => {
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

    const width = chartSize === ChartSize.SMALL ? chartSize : chartSize + 100;

    return (
        <div className="dark:text-white">
            <ResponsiveContainer height={chartSize} width={width}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={outer}
                        innerRadius={inner}
                        dataKey="value"
                        onClick={({ name }) =>
                            setActiveSlice(activeSlice === name ? null : name)
                        }
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
                        {!chartData && <div>Chargement...</div>}
                    </Pie>
                    <Tooltip />
                    <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                        wrapperStyle={{
                            paddingLeft: '10px',
                            lineHeight:
                                chartSize === ChartSize.SMALL ? '10px' : '24px',
                        }}
                        iconSize={chartSize === ChartSize.SMALL ? 8 : 12}
                        formatter={(value) => {
                            return chartSize === ChartSize.SMALL ? (
                                <span
                                    style={{
                                        fontSize: '6px',
                                        color: 'currentColor',
                                    }}
                                >
                                    {value}
                                </span>
                            ) : (
                                <span
                                    style={{
                                        fontSize: '12px',
                                        color: 'currentColor',
                                    }}
                                >
                                    {value}
                                </span>
                            );
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Doughnut;
