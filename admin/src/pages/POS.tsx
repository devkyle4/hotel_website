import { useState } from "react";
import { ServiceCard } from "@/components/ServiceCard";
import { POSCart } from "@/components/POSCart";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

const mockServices = [
  { id: "1", name: "Room Service Breakfast", description: "Continental breakfast delivered to your room", price: 25.00, category: "Food & Beverage" },
  { id: "2", name: "Room Service Lunch", description: "Selection of sandwiches and salads", price: 35.00, category: "Food & Beverage" },
  { id: "3", name: "Room Service Dinner", description: "Three-course dinner menu", price: 55.00, category: "Food & Beverage" },
  { id: "4", name: "Spa Treatment", description: "60-minute relaxing massage", price: 89.00, category: "Spa & Wellness" },
  { id: "5", name: "Facial Treatment", description: "Rejuvenating facial session", price: 75.00, category: "Spa & Wellness" },
  { id: "6", name: "Airport Transfer", description: "Private car service to/from airport", price: 45.00, category: "Transportation" },
  { id: "7", name: "City Tour", description: "4-hour guided city tour", price: 120.00, category: "Transportation" },
  { id: "8", name: "Laundry Service", description: "Same-day laundry and dry cleaning", price: 15.00, category: "Housekeeping" },
  { id: "9", name: "Mini Bar Restock", description: "Standard mini bar items", price: 30.00, category: "Housekeeping" },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function POS() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddToCart = (service: typeof mockServices[0]) => {
    const existingItem = cartItems.find(item => item.id === service.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === service.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...service, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    console.log("Checkout initiated with items:", cartItems);
    setCartItems([]);
  };

  const categories = ["All", "Food & Beverage", "Spa & Wellness", "Transportation", "Housekeeping"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Point of Sale</h1>
        <p className="text-muted-foreground">
          Add services and charges to guest accounts
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
              data-testid="input-search-services"
            />
          </div>

          <Tabs defaultValue="All">
            <TabsList className="w-full justify-start flex-wrap h-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} data-testid={`tab-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockServices
                    .filter(service => category === "All" || service.category === category)
                    .map((service) => (
                      <ServiceCard
                        key={service.id}
                        {...service}
                        onAdd={() => handleAddToCart(service)}
                      />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <POSCart
              items={cartItems}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
