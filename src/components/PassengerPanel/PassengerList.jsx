import { useBooking } from '../../hooks/useBooking';
import PassengerCard from './PassengerCard';

export default function PassengerList() {
  const { passengers } = useBooking();

  if (passengers.length === 0) {
    return (
      <div className="text-center py-6 text-gray-400 text-sm">
        Select the number of passengers to begin.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-700">
        Passengers
        <span className="text-xs font-normal text-gray-400 ml-1">
          (click to select)
        </span>
      </h3>
      <div className="space-y-2">
        {passengers.map((passenger) => (
          <PassengerCard key={passenger.id} passenger={passenger} />
        ))}
      </div>
    </div>
  );
}
