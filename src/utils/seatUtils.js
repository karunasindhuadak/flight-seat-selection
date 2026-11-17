// Checks if a seat is currently assigned to any passenger
export function isSeatAssigned(seatId, seatAssignments) {
  return Object.values(seatAssignments).includes(seatId);
}

// Returns the passenger ID that owns a seat, or null
export function getPassengerForSeat(seatId, seatAssignments) {
  const entry = Object.entries(seatAssignments).find(
    ([, sid]) => sid === seatId,
  );
  return entry ? Number(entry[0]) : null;
}

// Returns the seat assigned to a passenger, or null
export function getSeatForPassenger(passengerId, seatAssignments) {
  return seatAssignments[passengerId] ?? null;
}
