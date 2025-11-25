import { AnomalyAlert } from '../../types';

interface RecentAlertsPanelProps {
  alerts: AnomalyAlert[];
}

export const RecentAlertsPanel: React.FC<RecentAlertsPanelProps> = ({ alerts }) => {
  const severityConfig = {
    critical: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    warning: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
    info: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' }
  };

  const topAlerts = alerts.slice(0, 3);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
        <span className="text-sm text-gray-500">{alerts.length} active</span>
      </div>
      
      {topAlerts.length > 0 ? (
        <div className="space-y-3">
          {topAlerts.map((alert, index) => {
            const config = severityConfig[alert.severity];
            return (
              <div
                key={index}
                className={`p-4 rounded-lg border ${config.bg} ${config.border}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold uppercase ${config.text}`}>
                        {alert.severity}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(alert.detectedAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Threshold: {alert.threshold} | Current: {alert.currentValue.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <p>No active alerts</p>
        </div>
      )}
    </div>
  );
};
