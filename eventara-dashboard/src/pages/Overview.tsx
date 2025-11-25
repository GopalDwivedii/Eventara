import { ComprehensiveMetrics } from '../types';
import { HeroMetricCard } from '../components/cards/HeroMetricCard';
import { SystemHealthBadge } from '../components/cards/SystemHealthBadge';
import { QuickStatsGrid } from '../components/cards/QuickStatsGrid';
import { RecentAlertsPanel } from '../components/alerts/RecentAlertsPanel';
import { EventsOverTimeChart } from '../components/charts/EventsOverTimeChart';
import { ThroughputChart } from '../components/charts/ThroughputChart';
import { EventsByTypeChart } from '../components/charts/EventsByTypeChart';

interface OverviewProps {
  metrics: ComprehensiveMetrics | null;
}

export const Overview: React.FC<OverviewProps> = ({ metrics }) => {
  if (!metrics) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading metrics...</p>
        </div>
      </div>
    );
  }

  const quickStats = [
    { label: 'Unique Sources', value: metrics.summary.uniqueSources },
    { label: 'Event Types', value: metrics.summary.uniqueEventTypes },
    { label: 'Active Users', value: metrics.summary.uniqueUsers },
    { label: 'Total Errors', value: metrics.errorAnalysis.totalErrors }
  ];

  // Get top 5 event types
  const topEventTypes = Object.entries(metrics.eventsByType)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">
          Real-time system health and key performance metrics
        </p>
      </div>

      {/* System Health Badge */}
      <div>
        <SystemHealthBadge health={metrics.summary.systemHealth} />
      </div>

      {/* Hero Metrics - 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <HeroMetricCard
          title="Total Events"
          value={metrics.summary.totalEvents}
          subtitle="All time"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />

        <HeroMetricCard
          title="Current Throughput"
          value={metrics.throughput.current.perSecond.toFixed(2)}
          subtitle="events/second"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />

        <HeroMetricCard
          title="Last Minute"
          value={metrics.timeWindows.last1Minute}
          subtitle="events processed"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        <HeroMetricCard
          title="Error Rate"
          value={metrics.errorAnalysis.errorRate.toFixed(2) + '%'}
          subtitle={`${metrics.errorAnalysis.totalErrors} total errors`}
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EventsOverTimeChart timeWindows={metrics.timeWindows} />
        <ThroughputChart throughput={metrics.throughput} />
      </div>

      {/* Quick Stats & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickStatsGrid stats={quickStats} />
        <RecentAlertsPanel alerts={metrics.anomalies} />
      </div>

      {/* Top Event Types Chart */}
      <EventsByTypeChart eventsByType={metrics.eventsByType} />

      {/* Top Event Types Table */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Event Types</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Percentage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Latency
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topEventTypes.map(([type, data]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.count.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.percentage.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.avgLatency.toFixed(2)} ms
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Last Updated */}
      <div className="text-center text-sm text-gray-500">
        Last updated: {new Date(metrics.summary.lastUpdated).toLocaleString()}
      </div>
    </div>
  );
};
