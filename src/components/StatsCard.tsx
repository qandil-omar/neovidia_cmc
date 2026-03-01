import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  iconColor?: string;
  iconBg?: string;
}

const StatsCard = ({
  icon: Icon,
  label,
  value,
  iconColor = 'text-indigo-600',
  iconBg = 'bg-indigo-100',
}: StatsCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`${iconBg} ${iconColor} p-3 rounded-lg`}>
          <Icon size={24} />
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
          <p className="text-sm text-slate-500">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
