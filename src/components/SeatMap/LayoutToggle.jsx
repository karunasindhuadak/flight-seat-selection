import { useBooking } from '../../hooks/useBooking';
import { LAYOUTS } from '../../data/seatData';

export default function LayoutToggle() {
  const { layoutType, setLayout } = useBooking();

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-500">Layout:</span>
      <div className="flex bg-gray-100 p-1 rounded-xl">
        {Object.entries(LAYOUTS).map(([key, layout]) => (
          <button
            key={key}
            onClick={() => setLayout(key)}
            className={`
              px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
              ${
                layoutType === key
                  ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-gray-200'
                  : 'text-gray-500 hover:text-gray-700'
              }
            `}
          >
            {layout.label}
          </button>
        ))}
      </div>
    </div>
  );
}
