interface Stat {
  label: string;
  value: number;
  unit?: string;
}

interface QuickStatsGridProps {
  stats: Stat[];
}

export const QuickStatsGrid: React.FC<QuickStatsGridProps> = ({ stats }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">
              {stat.value.toLocaleString()}
              {stat.unit && <span className="text-sm text-gray-500 ml-1">{stat.unit}</span>}
            </p>
            <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
