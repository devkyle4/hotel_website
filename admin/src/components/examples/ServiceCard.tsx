import { ServiceCard } from "../ServiceCard";

export default function ServiceCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <ServiceCard
        id="1"
        name="Room Service Breakfast"
        description="Continental breakfast delivered to your room"
        price={25.00}
        category="Food & Beverage"
        onAdd={() => console.log("Added breakfast")}
      />
      <ServiceCard
        id="2"
        name="Spa Treatment"
        description="60-minute relaxing massage"
        price={89.00}
        category="Spa & Wellness"
        onAdd={() => console.log("Added spa")}
      />
      <ServiceCard
        id="3"
        name="Airport Transfer"
        description="Private car service to/from airport"
        price={45.00}
        category="Transportation"
        onAdd={() => console.log("Added transfer")}
      />
    </div>
  );
}
