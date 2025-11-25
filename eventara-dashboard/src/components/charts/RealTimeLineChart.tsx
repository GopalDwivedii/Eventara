import { Line } from 'react-chartjs-2';
import { useEffect, useState, useRef } from 'react';

interface DataPoint {
  timestamp: number;
  value: number;
}

interface RealTimeLineChartProps {
  title: string;
  currentValue: number;
  color?: string;
  maxDataPoints?: number;
}

export const RealTimeLineChart: React.FC<RealTimeLineChartProps> = ({
  title,
  currentValue,
  color = 'rgb(59, 130, 246)',
  maxDataPoints = 60
}) => {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const previousValueRef = useRef(currentValue);

  useEffect(() => {
    // Only add new point if value changed
    if (previousValueRef.current !== currentValue) {
      const now = Date.now();
      setDataPoints(prev => {
        const newPoints = [...prev, { timestamp: now, value: currentValue }];
        return newPoints.slice(-maxDataPoints);
      });
      previousValueRef.current = currentValue;
    }
  }, [currentValue, maxDataPoints]);

  const data = {
    labels: dataPoints.map((_, index) => `${maxDataPoints - dataPoints.length + index + 1}s`),
    datasets: [
      {
        label: title,
        data: dataPoints.map(point => point.value),
        borderColor: color,
        backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.1)'),
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
    animation: {
      duration: 0,
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <span className="text-2xl font-bold text-gray-900">
          {currentValue.toFixed(2)}
        </span>
      </div>
      <div className="h-32">
        <Line data={data} options={options} />
      </div>
      <p className="text-xs text-gray-500 text-center mt-2">
        Last {maxDataPoints} seconds
      </p>
    </div>
  );
};
