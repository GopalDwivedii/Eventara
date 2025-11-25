import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { TimeWindowMetrics } from '../../types';

interface EventsOverTimeChartProps {
  timeWindows: TimeWindowMetrics;
}

interface TimeSeriesPoint {
  label: string;
  value: number;
}

export const EventsOverTimeChart: React.FC<EventsOverTimeChartProps> = ({ timeWindows }) => {
  const [history, setHistory] = useState<TimeSeriesPoint[]>([]);

  useEffect(() => {
    // Add current data point
    const now = new Date();
    const timeLabel = now.toLocaleTimeString();

    setHistory(prev => {
      const newHistory = [
        ...prev,
        {
          label: timeLabel,
          value: timeWindows.last1Minute
        }
      ];

      // Keep only last 20 data points
      return newHistory.slice(-20);
    });
  }, [timeWindows.last1Minute]);

  const data = {
    labels: history.map(point => point.label),
    datasets: [
      {
        label: 'Events (Last Minute)',
        data: history.map(point => point.value),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
    animation: {
      duration: 500,
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Events Over Time
      </h3>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
