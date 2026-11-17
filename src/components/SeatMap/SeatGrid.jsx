import { useBooking } from '../../hooks/useBooking';
import { LAYOUTS } from '../../data/seatData';
import SeatRow from './SeatRow';

export default function SeatGrid() {
  const { seatMap, layoutType } = useBooking();
  const layout = LAYOUTS[layoutType];

  return (
    <div className="space-y-3">
      {/* Column headers */}
      <div className="flex items-center gap-1 sticky top-0 bg-white/90 backdrop-blur-sm py-2 z-10">
        {/* Row number placeholder */}
        <div className="w-7 shrink-0 mr-1" />

        {layout.columns.map((col, index) =>
          col === null ? (
            <div
              key={`header-aisle-${index}`}
              className="w-5 sm:w-6 shrink-0"
            />
          ) : (
            <div
              key={col}
              className="w-9 sm:w-10 text-center text-xs font-bold text-gray-500"
            >
              {col}
            </div>
          ),
        )}
      </div>

      {/* Seat rows */}
      <div className="space-y-1.5">
        {seatMap.map((row) => (
          <SeatRow key={row.rowNumber} row={row} />
        ))}
      </div>
    </div>
  );
}
