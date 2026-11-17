# Flight Seat Selection & Passenger Management

A flight seat selection interface built with React (Vite) and Tailwind CSS. Users can pick passengers, assign seats on an interactive aircraft map with two layout configurations, select meals, and see real-time cost breakdowns.

## Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── PassengerPanel/
│   │   ├── PassengerCountSelector.jsx
│   │   ├── PassengerList.jsx
│   │   ├── PassengerCard.jsx
│   │   └── MealSelector.jsx
│   ├── SeatMap/
│   │   ├── LayoutToggle.jsx
│   │   ├── SeatGrid.jsx
│   │   ├── SeatRow.jsx
│   │   ├── Seat.jsx
│   │   └── SeatLegend.jsx
│   ├── Summary/
│   │   ├── PriceBreakdown.jsx
│   │   └── TotalCost.jsx
│   └── ui/
│       ├── Toast.jsx
│       └── Tooltip.jsx
├── context/
│   └── BookingContext.jsx
├── data/
│   ├── seatData.js
│   └── mealData.js
├── hooks/
│   └── useBooking.js
├── utils/
│   ├── seatUtils.js
│   └── priceUtils.js
├── App.jsx
├── index.css
└── main.jsx
```

## State Management

I used `useReducer` + React Context for managing the application state. The main reason: there are several pieces of state that need to stay in sync (passenger list, seat assignments, meal selections, active passenger, layout type, toast notifications), and some updates involve non-trivial logic — like when you assign a seat, the reducer needs to check if that seat is already taken by another passenger, and when you change the passenger count, it has to clean up orphaned seat/meal assignments.

A single reducer keeps all this logic in one place instead of scattering it across multiple `useState` calls and effect handlers. The context provider wraps the app and exposes both state and pre-built action creators, so components can just call `assignSeat(passengerId, seatId)` without having to know about dispatch or action types.

The state shape:

```js
{
  passengerCount,         // 1 to 9
  passengers,             // [{ id, name }]
  activePassengerId,      // which passenger is currently being configured
  layoutType,             // '3-2' or '2-3-2'
  seatAssignments,        // { passengerId: seatId }
  mealSelections,         // { passengerId: mealId }
  toast                   // notification state
}
```

Derived values like `totalSeatCost`, `totalMealCost`, and `grandTotal` are computed with `useMemo` inside the provider and passed through context — they recalculate automatically whenever assignments change.

## Seat Assignment Logic

The core rules:

1. **One seat per passenger** — assigning a new seat replaces the old one automatically
2. **One passenger per seat** — the reducer checks all existing assignments before allowing a new one
3. **Must select a passenger first** — clicking a seat without an active passenger shows a toast warning
4. **Click to toggle** — clicking the active passenger's already-assigned seat removes it
5. **Occupied seats can't be selected** — about 15% of seats are randomly pre-occupied (using a seeded PRNG so they stay consistent across renders)

When switching between layouts (3-2 ↔ 2-3-2), all assignments are reset because the column structure changes (A-E vs A-H).

## Seat Categories

| Category | Rows | Price |
|----------|------|-------|
| Premium | 1–3 | ₹250 |
| Extra Legroom | 4–5, 12–13 | ₹350 |
| Standard | 6–11, 14–30 | Free |

Seats are color-coded: green for free, amber for extra legroom, violet for premium, indigo for selected, gray for occupied.

## Layout Configurations

- **3-2**: Columns A B C | aisle | D E
- **2-3-2**: Columns A B | aisle | D E F | aisle | G H

Both generate 30 rows.

## Meal Selection (Bonus)

Each passenger can optionally pick a meal. There are 3 free options and 3 paid ones (₹150 to ₹350). Meal costs are included in the grand total.

## Deployment

The project outputs a static `dist/` folder — works with Vercel, Netlify, or any static host.

```bash
npm run build
# deploy dist/ folder
```
