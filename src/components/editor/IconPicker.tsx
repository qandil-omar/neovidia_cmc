import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Search, Upload, X, Check } from 'lucide-react';
import Modal from '../ui/Modal';

const ICON_NAMES = [
  'Code', 'Palette', 'TrendingUp', 'Users', 'Globe', 'Award', 'Clock', 'Star',
  'Heart', 'Shield', 'Zap', 'Target', 'CheckCircle', 'ArrowRight', 'Phone',
  'Mail', 'MapPin', 'Home', 'Settings', 'Lock', 'Unlock', 'Camera', 'Image',
  'Video', 'Music', 'BookOpen', 'Briefcase', 'Building', 'Building2', 'Store',
  'ShoppingCart', 'CreditCard', 'DollarSign', 'BarChart', 'BarChart2', 'PieChart',
  'LineChart', 'Activity', 'Cpu', 'Database', 'Server', 'Monitor', 'Smartphone',
  'Tablet', 'Laptop', 'Wifi', 'Cloud', 'Upload', 'Download', 'Link', 'Share',
  'MessageCircle', 'MessageSquare', 'Send', 'Bell', 'Calendar', 'Clock3',
  'Layout', 'Grid', 'List', 'Layers', 'Box', 'Package', 'Tag', 'Flag',
  'Bookmark', 'Archive', 'Folder', 'File', 'FileText', 'Edit', 'Pencil',
  'Trash', 'Plus', 'Minus', 'X', 'Check', 'Search', 'Filter', 'SortAsc',
  'ChevronRight', 'ChevronDown', 'ChevronUp', 'ChevronLeft', 'ArrowUp',
  'ArrowDown', 'ArrowLeft', 'RefreshCw', 'RotateCw', 'Maximize', 'Minimize',
  'Eye', 'EyeOff', 'ThumbsUp', 'ThumbsDown', 'Smile', 'Frown', 'Meh',
  'Sun', 'Moon', 'Cloud', 'CloudRain', 'Wind', 'Thermometer', 'Droplets',
  'Flame', 'Leaf', 'Tree', 'Mountain', 'Wave', 'Bird', 'Fish', 'Rabbit',
  'Tool', 'Wrench', 'Hammer', 'Scissors', 'Pen', 'PenTool', 'Crop',
  'Type', 'Bold', 'Italic', 'Underline', 'AlignLeft', 'AlignCenter',
  'Play', 'Pause', 'Stop', 'Volume2', 'VolumeX', 'Headphones', 'Mic',
  'Map', 'Navigation', 'Compass', 'Anchor', 'Plane', 'Car', 'Bus', 'Truck',
  'Bike', 'Train', 'Ship', 'Rocket', 'Trophy', 'Gift', 'PartyPopper',
  'Lightbulb', 'BrainCircuit', 'Bot', 'Cpu', 'HardDrive', 'Memory',
];

interface IconPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (iconName: string) => void;
  currentIcon?: string;
}

const IconPicker = ({ isOpen, onClose, onSelect, currentIcon }: IconPickerProps) => {
  const [tab, setTab] = useState<'choose' | 'upload'>('choose');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(currentIcon || '');

  const filtered = ICON_NAMES.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = () => {
    if (selected) {
      onSelect(selected);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Choose Icon"
      size="lg"
      footer={
        <>
          <button onClick={onClose} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selected}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            Use Icon
          </button>
        </>
      }
    >
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab('choose')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === 'choose' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}
        >
          Choose Icon
        </button>
        <button
          onClick={() => setTab('upload')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === 'upload' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}
        >
          Upload Icon
        </button>
      </div>

      {tab === 'choose' && (
        <>
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search icons..."
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />
          </div>
          <div className="grid grid-cols-8 gap-2 max-h-64 overflow-y-auto">
            {filtered.map((name) => {
              const IconComp = (LucideIcons as any)[name];
              if (!IconComp) return null;
              return (
                <button
                  key={name}
                  onClick={() => setSelected(name)}
                  title={name}
                  className={`relative p-3 rounded-lg border-2 hover:bg-indigo-50 transition-colors flex items-center justify-center ${
                    selected === name ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200'
                  }`}
                >
                  <IconComp size={20} className={selected === name ? 'text-indigo-600' : 'text-slate-600'} />
                  {selected === name && (
                    <div className="absolute top-0.5 right-0.5 w-3 h-3 bg-indigo-600 rounded-full flex items-center justify-center">
                      <Check size={8} className="text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}

      {tab === 'upload' && (
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
          <Upload size={32} className="text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600 text-sm mb-2">Upload PNG or SVG icon</p>
          <input type="file" accept=".svg,.png" className="hidden" id="icon-upload" />
          <label
            htmlFor="icon-upload"
            className="cursor-pointer inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
          >
            Choose File
          </label>
        </div>
      )}
    </Modal>
  );
};

export const IconDisplay = ({ name, size = 20, className = '' }: { name: string; size?: number; className?: string }) => {
  const IconComp = (LucideIcons as any)[name];
  if (!IconComp) return <span className={className}>{name}</span>;
  return <IconComp size={size} className={className} />;
};

export default IconPicker;
