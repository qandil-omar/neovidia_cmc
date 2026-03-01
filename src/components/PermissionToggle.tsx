interface PermissionToggleProps {
  label: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const PermissionToggle = ({ label, enabled, onChange }: PermissionToggleProps) => {
  return (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-slate-50 rounded-lg transition-colors">
      <span className="text-sm text-slate-700">{label}</span>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          enabled ? 'bg-green-500' : 'bg-slate-300'
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-0'
          }`}
        ></div>
      </button>
    </div>
  );
};

export default PermissionToggle;
