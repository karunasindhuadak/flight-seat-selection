import { useCallback } from 'react';
import { useBooking } from '../../hooks/useBooking';
import { getPassengerForSeat } from '../../utils/seatUtils';
import { formatPrice } from '../../utils/priceUtils';
import Tooltip from '../ui/Tooltip';

export default function Seat({ seat }) {
  const {
    activePassengerId,
    seatAssignments,
    passengers,
    assignSeat,
    removeSeat,
    showToast,
  } = useBooking();

  const assignedToPassengerId = getPassengerForSeat(seat.id, seatAssignments);
  const isSelectedByActive = assignedToPassengerId === activePassengerId;
  const isAssignedToOther =
    assignedToPassengerId !== null && assignedToPassengerId !== activePassengerId;

  const handleClick = useCallback(() => {
    if (seat.isOccupied) return;

    if (!activePassengerId) {
      showToast('Please select a passenger first.', 'error');
      return;
    }

    // clicking your own seat removes it
    if (isSelectedByActive) {
      removeSeat(activePassengerId);
      return;
    }

    if (isAssignedToOther) {
      const otherPassenger = passengers.find(
        (p) => p.id === assignedToPassengerId,
      );
      showToast(
        `Seat ${seat.id} is assigned to ${otherPassenger?.name ?? 'another passenger'}.`,
        'error',
      );
      return;
    }

    assignSeat(activePassengerId, seat.id);
  }, [
    seat,
    activePassengerId,
    isSelectedByActive,
    isAssignedToOther,
    assignedToPassengerId,
    passengers,
    assignSeat,
    removeSeat,
    showToast,
  ]);

  const getClasses = () => {
    const base =
      'w-9 h-9 sm:w-10 sm:h-10 rounded-lg border-2 flex items-center justify-center text-xs font-bold transition-all duration-150 select-none';

    if (seat.isOccupied) {
      return `${base} bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed`;
    }

    if (isSelectedByActive) {
      return `${base} bg-indigo-500 border-indigo-400 text-white ring-2 ring-indigo-300 shadow-lg scale-105 cursor-pointer`;
    }

    if (isAssignedToOther) {
      return `${base} bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed`;
    }

    // color by category
    if (seat.price === 0) {
      return `${base} bg-emerald-100 border-emerald-300 text-emerald-700 hover:bg-emerald-200 hover:shadow-md cursor-pointer`;
    }
    if (seat.category === 'Extra Legroom') {
      return `${base} bg-amber-100 border-amber-300 text-amber-700 hover:bg-amber-200 hover:shadow-md cursor-pointer`;
    }
    if (seat.category === 'Premium') {
      return `${base} bg-violet-100 border-violet-300 text-violet-700 hover:bg-violet-200 hover:shadow-md cursor-pointer`;
    }

    return `${base} bg-sky-100 border-sky-300 text-sky-700 hover:bg-sky-200 hover:shadow-md cursor-pointer`;
  };

  const tooltipContent = seat.isOccupied
    ? `${seat.id} · Occupied`
    : isAssignedToOther
      ? `${seat.id} · Assigned to ${passengers.find((p) => p.id === assignedToPassengerId)?.name}`
      : `${seat.id} · ${seat.category} · ${formatPrice(seat.price)}`;

  return (
    <Tooltip content={tooltipContent}>
      <button
        onClick={handleClick}
        disabled={seat.isOccupied}
        className={getClasses()}
        aria-label={`Seat ${seat.id}, ${seat.category}, ${formatPrice(seat.price)}${seat.isOccupied ? ', occupied' : ''}`}
      >
        {seat.col}
      </button>
    </Tooltip>
  );
}
