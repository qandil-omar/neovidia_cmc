import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const Toast = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  const icons = {
    success: <CheckCircle size={18} className="text-green-500" />,
    error: <AlertCircle size={18} className="text-red-500" />,
    info: <Info size={18} className="text-blue-500" />,
    warning: <AlertTriangle size={18} className="text-yellow-500" />,
  };

  const bg = {
    success: 'bg-white border-green-200',
    error: 'bg-white border-red-200',
    info: 'bg-white border-blue-200',
    warning: 'bg-white border-yellow-200',
  };

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg min-w-72 animate-slide-in ${bg[t.type]}`}
        >
          {icons[t.type]}
          <p className="text-sm font-medium text-slate-800 flex-1">{t.message}</p>
          <button onClick={() => removeToast(t.id)} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
