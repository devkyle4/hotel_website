import { useState } from "react";
import { BookingTable } from "@/components/BookingTable";
import { BookingDialog } from "@/components/BookingDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

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
  {
    id: "4",
    customer: "Alice Williams",
    room: "Room 303",
    checkIn: "2024-01-17",
    checkOut: "2024-01-19",
    status: "confirmed" as const,
    total: "398.00",
  },
  {
    id: "5",
    customer: "Charlie Brown",
    room: "Room 104",
    checkIn: "2024-01-10",
    checkOut: "2024-01-13",
    status: "checked-out" as const,
    total: "297.00",
  },
];

export default function Bookings() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground">
            Manage all your hotel bookings
          </p>
        </div>
        <BookingDialog />
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
            data-testid="input-search-bookings"
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]" data-testid="select-filter-status">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="checked-in">Checked In</SelectItem>
            <SelectItem value="checked-out">Checked Out</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <BookingTable bookings={mockBookings} />
    </div>
  );
}
