import { useBooking } from '../../hooks/useBooking';
import { formatPrice } from '../../utils/priceUtils';
import { getMealById } from '../../data/mealData';

export default function PassengerCard({ passenger }) {
  const {
    activePassengerId,
    seatAssignments,
    mealSelections,
    seatLookup,
    setActivePassenger,
    removeSeat,
  } = useBooking();

  const isActive = activePassengerId === passenger.id;
  const assignedSeatId = seatAssignments[passenger.id] ?? null;
  const assignedSeat = assignedSeatId ? seatLookup[assignedSeatId] : null;
  const selectedMeal = getMealById(mealSelections[passenger.id]);

  const handleRemoveSeat = (e) => {
    e.stopPropagation();
    removeSeat(passenger.id);
  };

  return (
    <div
      onClick={() => setActivePassenger(passenger.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setActivePassenger(passenger.id);
        }
      }}
      className={`
        p-3 rounded-xl border-2 cursor-pointer transition-all duration-200
        ${
          isActive
            ? 'border-indigo-500 bg-indigo-50 shadow-md ring-1 ring-indigo-200'
            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
        }
      `}
    >
      {/* Header row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0
              ${isActive ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-600'}
            `}
          >
            {passenger.id}
          </div>
          <span className="font-semibold text-sm text-gray-800">
            {passenger.name}
          </span>
        </div>

        {assignedSeatId && (
          <span className="bg-indigo-100 text-indigo-700 text-xs font-mono font-bold px-2.5 py-1 rounded-full">
            {assignedSeatId}
          </span>
        )}
      </div>

      {/* Seat info */}
      <div className="mt-2 pl-10 space-y-1">
        {assignedSeat ? (
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">
              {assignedSeat.category} ·{' '}
              <span className="font-medium text-gray-700">
                {formatPrice(assignedSeat.price)}
              </span>
            </span>
            <button
              onClick={handleRemoveSeat}
              className="text-red-400 hover:text-red-600 hover:bg-red-50 px-1.5 py-0.5 rounded transition-colors text-xs font-medium"
              aria-label={`Remove seat ${assignedSeatId}`}
            >
              ✕ Remove
            </button>
          </div>
        ) : (
          <span className="text-xs text-gray-400 italic">No seat selected</span>
        )}

        {/* Meal info */}
        {selectedMeal && selectedMeal.id !== 'none' && (
          <div className="text-xs text-gray-500">
            {selectedMeal.emoji} {selectedMeal.name}
            {selectedMeal.price > 0 && (
              <span className="ml-1 font-medium text-gray-700">
                · {formatPrice(selectedMeal.price)}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
