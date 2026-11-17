import { useBooking } from '../../hooks/useBooking';
import { MEALS, getMealById } from '../../data/mealData';
import { formatPrice } from '../../utils/priceUtils';

export default function MealSelector() {
  const { activePassengerId, mealSelections, passengers, selectMeal } =
    useBooking();

  if (!activePassengerId) {
    return (
      <div className="text-center py-4 text-gray-400 text-sm italic">
        Select a passenger to choose a meal.
      </div>
    );
  }

  const activePassenger = passengers.find((p) => p.id === activePassengerId);
  const currentMealId = mealSelections[activePassengerId] ?? 'none';

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-700">
        Meal for {activePassenger?.name}
      </h3>
      <div className="space-y-1.5">
        {MEALS.map((meal) => {
          const isSelected = currentMealId === meal.id;
          return (
            <label
              key={meal.id}
              className={`
                flex items-center gap-3 p-2.5 rounded-lg border-2 cursor-pointer transition-all duration-150
                ${
                  isSelected
                    ? 'border-indigo-400 bg-indigo-50'
                    : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                }
              `}
            >
              <input
                type="radio"
                name={`meal-${activePassengerId}`}
                value={meal.id}
                checked={isSelected}
                onChange={() => selectMeal(activePassengerId, meal.id)}
                className="sr-only"
              />
              <span
                className={`
                  w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0
                  ${isSelected ? 'border-indigo-500' : 'border-gray-300'}
                `}
              >
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                )}
              </span>
              <span className="text-lg shrink-0">{meal.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-800 truncate">
                    {meal.name}
                  </span>
                  <span
                    className={`text-xs font-semibold shrink-0 ml-2 ${
                      meal.price > 0 ? 'text-amber-600' : 'text-emerald-600'
                    }`}
                  >
                    {formatPrice(meal.price)}
                  </span>
                </div>
                <p className="text-xs text-gray-400 truncate">
                  {meal.description}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
