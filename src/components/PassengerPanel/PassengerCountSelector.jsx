import { useBooking } from '../../hooks/useBooking';

const PASSENGER_OPTIONS = Array.from({ length: 9 }, (_, i) => i + 1);

export default function PassengerCountSelector() {
  const { passengerCount, setPassengerCount } = useBooking();

  return (
    <div className="space-y-2">
      <label
        htmlFor="passenger-count"
        className="block text-sm font-semibold text-gray-700"
      >
        Number of Passengers
      </label>
      <select
        id="passenger-count"
        value={passengerCount}
        onChange={(e) => setPassengerCount(Number(e.target.value))}
        className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-indigo-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      >
        {PASSENGER_OPTIONS.map((n) => (
          <option key={n} value={n}>
            {n} {n === 1 ? 'Passenger' : 'Passengers'}
          </option>
        ))}
      </select>
    </div>
  );
}
