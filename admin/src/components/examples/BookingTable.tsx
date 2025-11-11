import { BookingTable } from "../BookingTable";

const mockBookings = [
  {
    id: "1",
    customer: "John Doe",
    room: "Room 101",
    checkIn: "2024-01-15",
    checkOut: "2024-01-18",
    status: "pending" as const,
    total: "597.00",
  },
  {
    id: "2",
    customer: "Jane Smith",
    room: "Room 205",
    checkIn: "2024-01-16",
    checkOut: "2024-01-20",
    status: "confirmed" as const,
    total: "796.00",
  },
  {
    id: "3",
    customer: "Bob Johnson",
    room: "Room 102",
    checkIn: "2024-01-14",
    checkOut: "2024-01-16",
    status: "checked-in" as const,
    total: "198.00",
  },
];

export default function BookingTableExample() {
  return (
    <div className="p-4">
      <BookingTable bookings={mockBookings} />
    </div>
  );
}
