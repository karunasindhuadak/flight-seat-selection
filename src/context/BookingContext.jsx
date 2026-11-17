import { createContext, useReducer, useMemo } from 'react';
import { generateSeatMap, buildSeatLookup } from '../data/seatData';
import { MEALS } from '../data/mealData';
import { calculateTotalSeatCost, calculateTotalMealCost } from '../utils/priceUtils';

const initialState = {
  passengerCount: 1,
  passengers: [{ id: 1, name: 'Passenger 1' }],
  activePassengerId: null,
  layoutType: '3-2',
  seatAssignments: {},  // { passengerId: seatId }
  mealSelections: {},   // { passengerId: mealId }
  toast: null,
};

export const ACTIONS = {
  SET_PASSENGER_COUNT: 'SET_PASSENGER_COUNT',
  SET_ACTIVE_PASSENGER: 'SET_ACTIVE_PASSENGER',
  ASSIGN_SEAT: 'ASSIGN_SEAT',
  REMOVE_SEAT: 'REMOVE_SEAT',
  SET_LAYOUT: 'SET_LAYOUT',
  SELECT_MEAL: 'SELECT_MEAL',
  SHOW_TOAST: 'SHOW_TOAST',
  CLEAR_TOAST: 'CLEAR_TOAST',
};

function bookingReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_PASSENGER_COUNT: {
      const count = action.payload;
      const passengers = Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `Passenger ${i + 1}`,
      }));

      // only keep assignments/meals for passengers that still exist
      const validIds = new Set(passengers.map((p) => p.id));
      const seatAssignments = {};
      const mealSelections = {};

      for (const [pid, sid] of Object.entries(state.seatAssignments)) {
        if (validIds.has(Number(pid))) seatAssignments[pid] = sid;
      }
      for (const [pid, mid] of Object.entries(state.mealSelections)) {
        if (validIds.has(Number(pid))) mealSelections[pid] = mid;
      }

      return {
        ...state,
        passengerCount: count,
        passengers,
        activePassengerId: passengers[0]?.id ?? null,
        seatAssignments,
        mealSelections,
      };
    }

    case ACTIONS.SET_ACTIVE_PASSENGER:
      return { ...state, activePassengerId: action.payload };

    case ACTIONS.ASSIGN_SEAT: {
      const { passengerId, seatId } = action.payload;

      // check if seat is already taken by someone else
      const takenBy = Object.entries(state.seatAssignments).find(
        ([pid, sid]) => sid === seatId && Number(pid) !== passengerId,
      );
      if (takenBy) {
        return {
          ...state,
          toast: {
            message: `Seat ${seatId} is already assigned to ${state.passengers.find((p) => p.id === Number(takenBy[0]))?.name ?? 'another passenger'}.`,
            type: 'error',
          },
        };
      }

      return {
        ...state,
        seatAssignments: {
          ...state.seatAssignments,
          [passengerId]: seatId,
        },
        toast: {
          message: `Seat ${seatId} assigned to ${state.passengers.find((p) => p.id === passengerId)?.name ?? `Passenger ${passengerId}`}.`,
          type: 'success',
        },
      };
    }

    case ACTIONS.REMOVE_SEAT: {
      const { passengerId } = action.payload;
      const newAssignments = { ...state.seatAssignments };
      const removedSeat = newAssignments[passengerId];
      delete newAssignments[passengerId];

      return {
        ...state,
        seatAssignments: newAssignments,
        toast: removedSeat
          ? { message: `Seat ${removedSeat} removed.`, type: 'info' }
          : null,
      };
    }

    case ACTIONS.SET_LAYOUT: {
      if (state.layoutType === action.payload) return state;
      return {
        ...state,
        layoutType: action.payload,
        seatAssignments: {},
        toast: {
          message: 'Layout changed — all seat assignments have been reset.',
          type: 'info',
        },
      };
    }

    case ACTIONS.SELECT_MEAL: {
      const { passengerId, mealId } = action.payload;
      return {
        ...state,
        mealSelections: {
          ...state.mealSelections,
          [passengerId]: mealId,
        },
      };
    }

    case ACTIONS.SHOW_TOAST:
      return { ...state, toast: action.payload };

    case ACTIONS.CLEAR_TOAST:
      return { ...state, toast: null };

    default:
      return state;
  }
}

export const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const seatMap = useMemo(
    () => generateSeatMap(state.layoutType),
    [state.layoutType],
  );

  const seatLookup = useMemo(() => buildSeatLookup(seatMap), [seatMap]);

  const totalSeatCost = useMemo(
    () => calculateTotalSeatCost(state.seatAssignments, seatLookup),
    [state.seatAssignments, seatLookup],
  );

  const totalMealCost = useMemo(
    () => calculateTotalMealCost(state.mealSelections, MEALS),
    [state.mealSelections],
  );

  const grandTotal = totalSeatCost + totalMealCost;

  const actions = useMemo(
    () => ({
      setPassengerCount: (count) =>
        dispatch({ type: ACTIONS.SET_PASSENGER_COUNT, payload: count }),
      setActivePassenger: (id) =>
        dispatch({ type: ACTIONS.SET_ACTIVE_PASSENGER, payload: id }),
      assignSeat: (passengerId, seatId) =>
        dispatch({ type: ACTIONS.ASSIGN_SEAT, payload: { passengerId, seatId } }),
      removeSeat: (passengerId) =>
        dispatch({ type: ACTIONS.REMOVE_SEAT, payload: { passengerId } }),
      setLayout: (layoutType) =>
        dispatch({ type: ACTIONS.SET_LAYOUT, payload: layoutType }),
      selectMeal: (passengerId, mealId) =>
        dispatch({ type: ACTIONS.SELECT_MEAL, payload: { passengerId, mealId } }),
      showToast: (message, type = 'info') =>
        dispatch({ type: ACTIONS.SHOW_TOAST, payload: { message, type } }),
      clearToast: () => dispatch({ type: ACTIONS.CLEAR_TOAST }),
    }),
    [],
  );

  const value = useMemo(
    () => ({
      ...state,
      seatMap,
      seatLookup,
      totalSeatCost,
      totalMealCost,
      grandTotal,
      ...actions,
    }),
    [state, seatMap, seatLookup, totalSeatCost, totalMealCost, grandTotal, actions],
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}
