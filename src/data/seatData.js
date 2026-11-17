// Seat categories and pricing
export const SEAT_CATEGORIES = {
  standard: {
    label: 'Standard',
    price: 0,
    bgClass: 'bg-emerald-100',
    borderClass: 'border-emerald-300',
    hoverClass: 'hover:bg-emerald-200',
    textClass: 'text-emerald-800',
    dotClass: 'bg-emerald-400',
  },
  extraLegroom: {
    label: 'Extra Legroom',
    price: 350,
    bgClass: 'bg-amber-100',
    borderClass: 'border-amber-300',
    hoverClass: 'hover:bg-amber-200',
    textClass: 'text-amber-800',
    dotClass: 'bg-amber-400',
  },
  premium: {
    label: 'Premium',
    price: 250,
    bgClass: 'bg-violet-100',
    borderClass: 'border-violet-300',
    hoverClass: 'hover:bg-violet-200',
    textClass: 'text-violet-800',
    dotClass: 'bg-violet-400',
  },
};

// Layout configs — null = aisle gap
export const LAYOUTS = {
  '3-2': {
    label: '3 – 2',
    columns: ['A', 'B', 'C', null, 'D', 'E'],
    totalRows: 30,
  },
  '2-3-2': {
    label: '2 – 3 – 2',
    columns: ['A', 'B', null, 'D', 'E', 'F', null, 'G', 'H'],
    totalRows: 30,
  },
};

// Seeded PRNG (mulberry32) so occupied seats stay consistent across renders
function seededRandom(seed) {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function getCategoryForRow(row) {
  if (row <= 3) return SEAT_CATEGORIES.premium;
  if (row <= 5) return SEAT_CATEGORIES.extraLegroom;
  if (row >= 12 && row <= 13) return SEAT_CATEGORIES.extraLegroom;
  return SEAT_CATEGORIES.standard;
}

// Generates the full seat map for a given layout
export function generateSeatMap(layoutType, seed = 42) {
  const layout = LAYOUTS[layoutType];
  if (!layout) throw new Error(`Unknown layout: ${layoutType}`);

  let randomIndex = seed;
  const rows = [];

  for (let row = 1; row <= layout.totalRows; row++) {
    const category = getCategoryForRow(row);
    const seats = [];

    for (const col of layout.columns) {
      if (col === null) {
        seats.push({ type: 'aisle' });
        continue;
      }

      randomIndex += 1;
      const isOccupied = seededRandom(randomIndex) < 0.15;

      seats.push({
        id: `${row}${col}`,
        type: 'seat',
        row,
        col,
        category: category.label,
        price: category.price,
        isOccupied,
      });
    }

    rows.push({ rowNumber: row, seats });
  }

  return rows;
}

// Flat lookup: seatId -> seat object (for quick price/category access)
export function buildSeatLookup(seatMap) {
  const lookup = {};
  for (const row of seatMap) {
    for (const seat of row.seats) {
      if (seat.type === 'seat') {
        lookup[seat.id] = seat;
      }
    }
  }
  return lookup;
}
