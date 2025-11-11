import { useState } from "react";
import { POSCart } from "../POSCart";

export default function POSCartExample() {
  const [items, setItems] = useState([
    { id: "1", name: "Room Service Breakfast", price: 25.00, quantity: 2 },
    { id: "2", name: "Spa Treatment", price: 89.00, quantity: 1 },
    { id: "3", name: "Laundry Service", price: 15.00, quantity: 3 },
  ]);

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    console.log("Checkout initiated");
  };

  return (
    <div className="max-w-md p-4 h-[600px]">
      <POSCart items={items} onRemoveItem={handleRemoveItem} onCheckout={handleCheckout} />
    </div>
  );
}
