import { StatsCard } from "@/components/StatsCard";
import { BookingTable } from "@/components/BookingTable";
import { RevenueChart } from "@/components/RevenueChart";
import { DollarSign, Calendar, Users, Bed } from "lucide-react";

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
    status: "pending" as const,
    total: "398.00",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your hotel overview
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value="$45,231"
          description="Last 30 days"
          icon={DollarSign}
          trend={{ value: "12%", positive: true }}
        />
        <StatsCard
          title="Bookings"
          value="127"
          description="Active bookings"
          icon={Calendar}
          trend={{ value: "8%", positive: true }}
        />
        <StatsCard
          title="Customers"
          value="1,234"
          icon={Users}
        />
        <StatsCard
          title="Occupancy"
          value="78%"
          description="Current occupancy rate"
          icon={Bed}
          trend={{ value: "3%", positive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Quick Stats</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-md border">
              <div className="text-sm text-muted-foreground">Check-ins Today</div>
              <div className="text-2xl font-bold">12</div>
            </div>
            <div className="p-4 rounded-md border">
              <div className="text-sm text-muted-foreground">Check-outs Today</div>
              <div className="text-2xl font-bold">8</div>
            </div>
            <div className="p-4 rounded-md border">
              <div className="text-sm text-muted-foreground">Pending Payments</div>
              <div className="text-2xl font-bold">$5,420</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Bookings</h2>
        <BookingTable bookings={mockBookings} />
      </div>
    </div>
  );
}
