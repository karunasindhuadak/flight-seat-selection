import Seat from './Seat';

export default function SeatRow({ row }) {
  return (
    <div className="flex items-center gap-1">
      {/* Row number */}
      <div className="w-7 text-right text-xs font-bold text-gray-400 shrink-0 mr-1">
        {row.rowNumber}
      </div>

      {/* Seats & aisles */}
      {row.seats.map((seat, index) => {
        if (seat.type === 'aisle') {
          return (
            <div
              key={`aisle-${index}`}
              className="w-5 sm:w-6 shrink-0"
              aria-hidden="true"
            />
          );
        }
        return <Seat key={seat.id} seat={seat} />;
      })}
    </div>
  );
}
