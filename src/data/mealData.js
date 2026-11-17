export const MEALS = [
  { id: 'none',         name: 'No Meal',                price: 0,   emoji: '❌', description: 'Skip meal service' },
  { id: 'veg',          name: 'Veg Meal',               price: 0,   emoji: '🥗', description: 'Rice, dal, sabzi, roti, salad' },
  { id: 'non-veg',      name: 'Non-Veg Meal',           price: 0,   emoji: '🍗', description: 'Rice, chicken curry, naan, salad' },
  { id: 'premium-veg',  name: 'Premium Veg Thali',      price: 250, emoji: '🍱', description: 'Paneer tikka, dal makhani, rice, naan, dessert' },
  { id: 'premium-nv',   name: 'Premium Non-Veg Thali',  price: 350, emoji: '🥘', description: 'Butter chicken, biryani, raita, naan, dessert' },
  { id: 'sandwich',     name: 'Club Sandwich + Juice',   price: 150, emoji: '🥪', description: 'Grilled sandwich with orange juice' },
];

export function getMealById(mealId) {
  return MEALS.find((m) => m.id === mealId) || MEALS[0];
}
