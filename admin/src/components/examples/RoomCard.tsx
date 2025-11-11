import { RoomCard } from "../RoomCard";

export default function RoomCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <RoomCard
        roomNumber="101"
        roomType="Deluxe Suite"
        price="199"
        capacity={2}
        status="available"
      />
      <RoomCard
        roomNumber="102"
        roomType="Standard Room"
        price="99"
        capacity={2}
        status="occupied"
      />
      <RoomCard
        roomNumber="201"
        roomType="Premium Suite"
        price="299"
        capacity={4}
        status="maintenance"
      />
    </div>
  );
}
