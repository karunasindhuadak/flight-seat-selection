const LEGEND_ITEMS = [
  { label: 'Free (₹0)', className: 'bg-emerald-100 border-emerald-300' },
  { label: 'Extra Legroom', className: 'bg-amber-100 border-amber-300' },
  { label: 'Premium', className: 'bg-violet-100 border-violet-300' },
  { label: 'Selected', className: 'bg-indigo-500 border-indigo-300' },
  { label: 'Occupied', className: 'bg-gray-300 border-gray-400' },
];

export default function SeatLegend() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-3 px-4 bg-gray-50 rounded-xl">
      {LEGEND_ITEMS.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5">
          <div
            className={`w-4 h-4 rounded border-2 ${item.className}`}
          />
          <span className="text-xs text-gray-600">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
