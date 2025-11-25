import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { ThroughputMetrics } from '../../types';

interface ThroughputChartProps {
  throughput: ThroughputMetrics;
}

interface ThroughputPoint {
  label: string;
  value: number;
}

export const ThroughputChart: React.FC<ThroughputChartProps> = ({ throughput }) => {
  const [history, setHistory] = useState<ThroughputPoint[]>([]);

  useEffect(() => {
    const now = new Date();
    const timeLabel = now.toLocaleTimeString();

    setHistory(prev => {
      const newHistory = [
        ...prev,
        {
          label: timeLabel,
          value: throughput.current.perSecond
        }
      ];

      // Keep only last 30 data points
      return newHistory.slice(-30);
    });
  }, [throughput.current.perSecond]);

  const data = {
    labels: history.map(point => point.label),
    datasets: [
      {
        label: 'Events/Second',
        data: history.map(point => point.value),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 4,
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
          precision: 2,
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
        Throughput Trend
      </h3>
      <div className="text-sm text-gray-600 mb-3">
        Current: <span className="font-semibold text-green-600">{throughput.current.perSecond.toFixed(2)}</span> events/sec
        {' '} | Peak: <span className="font-semibold text-blue-600">{throughput.peak.value.toFixed(2)}</span> events/sec
      </div>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
