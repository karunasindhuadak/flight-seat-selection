export function calculateTotalSeatCost(seatAssignments, seatLookup) {
  return Object.values(seatAssignments).reduce((total, seatId) => {
    const seat = seatLookup[seatId];
    return total + (seat?.price ?? 0);
  }, 0);
}

export function calculateTotalMealCost(mealSelections, meals) {
  return Object.values(mealSelections).reduce((total, mealId) => {
    const meal = meals.find((m) => m.id === mealId);
    return total + (meal?.price ?? 0);
  }, 0);
}

export function formatPrice(amount) {
  if (amount === 0) return 'Free';
  return `₹${amount.toLocaleString('en-IN')}`;
}
