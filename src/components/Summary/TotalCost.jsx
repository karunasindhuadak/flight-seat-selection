import { useBooking } from '../../hooks/useBooking';

export default function TotalCost() {
  const { totalSeatCost, totalMealCost, grandTotal } = useBooking();

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl p-4 space-y-3">
      <h3 className="text-sm font-semibold text-gray-700">
        Cost Summary
      </h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Seat charges</span>
          <span className="font-medium">₹{totalSeatCost.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Meal charges</span>
          <span className="font-medium">₹{totalMealCost.toLocaleString('en-IN')}</span>
        </div>
        <div className="border-t border-indigo-200 pt-2">
          <div className="flex justify-between items-center">
            <span className="text-base font-bold text-gray-800">
              Grand Total
            </span>
            <span className="text-xl font-extrabold text-indigo-600">
              ₹{grandTotal.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
