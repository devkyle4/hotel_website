import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, XCircle } from "lucide-react";

interface Booking {
  id: string;
  customer: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: "pending" | "confirmed" | "checked-in" | "checked-out" | "cancelled";
  total: string;
}

const statusColors = {
  pending: "bg-chart-3",
  confirmed: "bg-chart-1",
  "checked-in": "bg-chart-2",
  "checked-out": "bg-muted",
  cancelled: "bg-destructive",
};

interface BookingTableProps {
  bookings: Booking[];
}

export function BookingTable({ bookings }: BookingTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Check-in</TableHead>
            <TableHead>Check-out</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id} data-testid={`row-booking-${booking.id}`}>
              <TableCell className="font-medium">{booking.customer}</TableCell>
              <TableCell>{booking.room}</TableCell>
              <TableCell>{booking.checkIn}</TableCell>
              <TableCell>{booking.checkOut}</TableCell>
              <TableCell>
                <Badge className={statusColors[booking.status]} data-testid={`badge-status-${booking.id}`}>
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right" data-testid={`text-total-${booking.id}`}>
                ${booking.total}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button size="icon" variant="ghost" data-testid={`button-view-${booking.id}`}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  {booking.status === "pending" && (
                    <>
                      <Button size="icon" variant="ghost" data-testid={`button-confirm-${booking.id}`}>
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" data-testid={`button-cancel-${booking.id}`}>
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
