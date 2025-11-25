import { AnomalyAlert } from '../../types';

interface ActiveAnomaliesAlertProps {
  anomalies: AnomalyAlert[];
}

export const ActiveAnomaliesAlert: React.FC<ActiveAnomaliesAlertProps> = ({ anomalies }) => {
  if (anomalies.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="text-center">
          <svg className="w-12 h-12 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-semibold text-green-900">All Systems Normal</p>
          <p className="text-sm text-green-700 mt-1">No active anomalies detected</p>
        </div>
      </div>
    );
  }

  const criticalCount = anomalies.filter(a => a.severity === 'critical').length;
  const warningCount = anomalies.filter(a => a.severity === 'warning').length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Active Anomalies</h3>
          <div className="flex items-center gap-3">
            {criticalCount > 0 && (
              <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                {criticalCount} Critical
              </span>
            )}
            {warningCount > 0 && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                {warningCount} Warning
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {anomalies.map((anomaly, index) => (
          <div key={index} className="p-4 hover:bg-gray-50">
            <div className="flex items-start gap-3">
              <div className={`mt-1 w-3 h-3 rounded-full ${
                anomaly.severity === 'critical' ? 'bg-red-500' :
                anomaly.severity === 'warning' ? 'bg-yellow-500' :
                'bg-blue-500'
              }`}></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-semibold uppercase ${
                    anomaly.severity === 'critical' ? 'text-red-700' :
                    anomaly.severity === 'warning' ? 'text-yellow-700' :
                    'text-blue-700'
                  }`}>
                    {anomaly.severity}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(anomaly.detectedAt).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-900">{anomaly.message}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                  <span>Type: <span className="font-medium">{anomaly.type}</span></span>
                  <span>Threshold: <span className="font-medium">{anomaly.threshold}</span></span>
                  <span>Current: <span className="font-medium">{anomaly.currentValue.toFixed(2)}</span></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
