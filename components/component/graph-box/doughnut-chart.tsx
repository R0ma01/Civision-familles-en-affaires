import { useState, useEffect } from 'react';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend, // Import Legend
} from 'recharts';
import { chartPalette } from '@/constants/color-palet';
import { ChartSize } from '@/components/enums/chart-size-enum';
import { ChartContent } from '@/components/interface/chart-content';
import { MainDataFields } from '@/components/enums/data-types-enum';

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
    const [chartData, setChartData] = useState(chartContent.data);

    const radiusMap = {
        [ChartSize.SMALL]: { inner: '30%', outer: '70%' },
        [ChartSize.MEDIUM]: { inner: '40%', outer: '85%' },
        [ChartSize.LARGE]: { inner: '35%', outer: '65%' },
    };

    const { inner, outer } = radiusMap[chartSize];

    useEffect(() => {
        setChartData(chartContent.data);
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
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={chartPalette[index % chartPalette.length]}
                                onClick={() => {
                                    filterData(chartContent.donnees[0], entry);
                                }}
                            />
                        ))}
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
                            {
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
                            }
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Doughnut;
