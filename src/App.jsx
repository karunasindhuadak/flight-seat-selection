import { BookingProvider } from './context/BookingContext';
import Header from './components/Header';
import PassengerCountSelector from './components/PassengerPanel/PassengerCountSelector';
import PassengerList from './components/PassengerPanel/PassengerList';
import MealSelector from './components/PassengerPanel/MealSelector';
import LayoutToggle from './components/SeatMap/LayoutToggle';
import SeatGrid from './components/SeatMap/SeatGrid';
import SeatLegend from './components/SeatMap/SeatLegend';
import PriceBreakdown from './components/Summary/PriceBreakdown';
import TotalCost from './components/Summary/TotalCost';
import Toast from './components/ui/Toast';

function AppContent() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <Toast />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_300px] gap-6">
          {/* Left: Passengers */}
          <aside className="space-y-6 order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-5">
              <PassengerCountSelector />
              <PassengerList />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <MealSelector />
            </div>
          </aside>

          {/* Center: Seat Map */}
          <section className="order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="text-lg font-bold text-gray-800">
                  Aircraft Seat Map
                </h2>
                <LayoutToggle />
              </div>

              <SeatLegend />

              <div className="overflow-x-auto pb-2">
                <div className="min-w-fit mx-auto">
                  <SeatGrid />
                </div>
              </div>
            </div>
          </section>

          {/* Right: Summary */}
          <aside className="space-y-4 order-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-6">
              <TotalCost />
              <div className="mt-4">
                <PriceBreakdown />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <AppContent />
    </BookingProvider>
  );
}
