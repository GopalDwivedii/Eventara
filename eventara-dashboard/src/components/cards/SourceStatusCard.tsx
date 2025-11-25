import { SourceMetrics } from '../../types';

interface SourceStatusCardProps {
  sourceName: string;
  metrics: SourceMetrics;
}

export const SourceStatusCard: React.FC<SourceStatusCardProps> = ({
  sourceName,
  metrics
}) => {
  const healthConfig = {
    healthy: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      dot: 'bg-green-500'
    },
    degraded: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-700',
      dot: 'bg-yellow-500'
    },
    down: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      dot: 'bg-red-500'
    }
  };

  const config = healthConfig[metrics.health];

  return (
    <div className={`p-4 rounded-lg border ${config.bg} ${config.border}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`}></div>
            <h4 className="font-semibold text-gray-900">{sourceName}</h4>
          </div>
          <p className={`text-xs font-medium uppercase ${config.text}`}>
            {metrics.health}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-600 text-xs">Events</p>
          <p className="font-semibold text-gray-900">{metrics.count.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-600 text-xs">Latency</p>
          <p className="font-semibold text-gray-900">{metrics.avgLatency.toFixed(1)} ms</p>
        </div>
        <div>
          <p className="text-gray-600 text-xs">Errors</p>
          <p className="font-semibold text-gray-900">{metrics.errorCount}</p>
        </div>
        <div>
          <p className="text-gray-600 text-xs">Error Rate</p>
          <p className="font-semibold text-gray-900">{metrics.errorRate.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
};
