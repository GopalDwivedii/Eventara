interface CircularGaugeProps {
  label: string;
  value: number;
  max: number;
  unit?: string;
  color?: string;
}

export const CircularGauge: React.FC<CircularGaugeProps> = ({
  label,
  value,
  max,
  unit = '',
  color = '#3B82F6'
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-sm font-medium text-gray-600 text-center mb-4">
        {label}
      </h3>
      <div className="relative flex items-center justify-center">
        <svg className="transform -rotate-90 w-40 h-40">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="#E5E7EB"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke={color}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute text-center">
          <div className="text-3xl font-bold text-gray-900">
            {value.toFixed(1)}
          </div>
          <div className="text-sm text-gray-500">{unit}</div>
        </div>
      </div>
      <div className="text-center mt-4 text-xs text-gray-500">
        Max: {max} {unit}
      </div>
    </div>
  );
};
