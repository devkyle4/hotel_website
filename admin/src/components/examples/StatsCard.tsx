import { StatsCard } from "../StatsCard";
import { DollarSign, Calendar, Users, Bed } from "lucide-react";

export default function StatsCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
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
  );
}
