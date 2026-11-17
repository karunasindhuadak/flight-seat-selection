import { useBooking } from '../../hooks/useBooking';
import { formatPrice } from '../../utils/priceUtils';
import { getMealById } from '../../data/mealData';

export default function PriceBreakdown() {
  const { passengers, seatAssignments, mealSelections, seatLookup } =
    useBooking();

  const hasAnyAssignment = Object.keys(seatAssignments).length > 0 ||
    Object.keys(mealSelections).length > 0;

  if (!hasAnyAssignment) {
    return (
      <div className="text-center py-4 text-gray-400 text-sm italic">
        Select seats and meals to see the breakdown.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-700">
        Booking Breakdown
      </h3>

      <div className="divide-y divide-gray-100">
        {passengers.map((passenger) => {
          const seatId = seatAssignments[passenger.id];
          const seat = seatId ? seatLookup[seatId] : null;
          const meal = getMealById(mealSelections[passenger.id]);
          const passengerTotal = (seat?.price ?? 0) + (meal?.price ?? 0);

          return (
            <div key={passenger.id} className="py-2.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">
                  {passenger.name}
                </span>
                {passengerTotal > 0 && (
                  <span className="text-sm font-bold text-indigo-600">
                    ₹{passengerTotal}
                  </span>
                )}
              </div>

              <div className="pl-3 space-y-0.5 text-xs text-gray-500">
                {seat ? (
                  <div className="flex justify-between">
                    <span>
                      Seat {seatId}{' '}
                      <span className="text-gray-400">({seat.category})</span>
                    </span>
                    <span className="font-medium text-gray-600">
                      {formatPrice(seat.price)}
                    </span>
                  </div>
                ) : (
                  <div className="text-gray-400 italic">No seat selected</div>
                )}

                {meal && meal.id !== 'none' && (
                  <div className="flex justify-between">
                    <span>
                      {meal.emoji} {meal.name}
                    </span>
                    <span className="font-medium text-gray-600">
                      {formatPrice(meal.price)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
