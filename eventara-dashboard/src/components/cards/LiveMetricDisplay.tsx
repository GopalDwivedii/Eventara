interface LiveMetricDisplayProps {
  label: string;
  value: string | number;
  unit?: string;
  status?: 'normal' | 'warning' | 'critical';
  subtitle?: string;
}

export const LiveMetricDisplay: React.FC<LiveMetricDisplayProps> = ({
  label,
  value,
  unit,
  status = 'normal',
  subtitle
}) => {
  const statusColors = {
    normal: 'text-green-600',
    warning: 'text-yellow-600',
    critical: 'text-red-600'
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="text-center">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          {label}
        </p>
        <div className={`text-5xl font-bold mt-4 ${statusColors[status]}`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
          {unit && <span className="text-2xl ml-2">{unit}</span>}
        </div>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
        )}
      </div>
    </div>
  );
};
