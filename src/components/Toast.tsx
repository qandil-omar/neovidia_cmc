import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Toast = () => {
  const { toast, showToast } = useApp();

  if (!toast?.show) return null;

  const icons = {
    success: <CheckCircle size={20} className="text-green-500" />,
    error: <AlertCircle size={20} className="text-red-500" />,
    info: <Info size={20} className="text-blue-500" />,
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${
          bgColors[toast.type as keyof typeof bgColors]
        }`}
      >
        {icons[toast.type as keyof typeof icons]}
        <p className="text-sm font-medium text-slate-800">{toast.message}</p>
        <button
          onClick={() => showToast('', 'info')}
          className="ml-2 hover:opacity-70"
        >
          <X size={16} className="text-slate-500" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
