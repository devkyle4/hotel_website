import { motion } from "framer-motion";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { UsersIcon } from "lucide-react";

function Rooms() {
  const rooms = [
    {
      id: 1,
      name: "Deluxe Ocean View",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
      description:
        "Spacious room with stunning ocean views and modern amenities",
      features: ["Ocean View", "King Bed", "Private Balcony", "Mini Bar"],
      maxGuests: 2,
    },
    {
      id: 2,
      name: "Family Suite",
      price: 449,
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
      description:
        "Perfect for families with separate living area and two bedrooms",
      features: ["2 Bedrooms", "Living Area", "Kitchenette", "Sofa Bed"],
      maxGuests: 6,
    },
    {
      id: 3,
      name: "Luxury Presidential",
      price: 799,
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      description: "Ultimate luxury with panoramic views and premium services",
      features: ["Panoramic View", "Jacuzzi", "Butler Service", "Premium Bar"],
      maxGuests: 4,
    },
  ];
  return (
    <div className="min-h-screen bg-amber-50 py-20 px-4">
      <div className="container mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center text-amber-800 mb-12"
        >
          Explore Our Rooms
        </motion.h1>
  
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              {/* ✅ Make Card relative so Badge positions correctly */}
              <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-64 object-cover"
                />
  
                {/* ✅ Price tag positioned like homepage */}
                <Badge className="absolute top-4 right-4 bg-amber-600 text-white text-sm px-3 py-1 rounded-full shadow-md">
                  ${room.price}/night
                </Badge>
  
                <CardHeader>
                  <CardTitle>{room.name}</CardTitle>
                  <CardDescription>{room.description}</CardDescription>
                </CardHeader>
  
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.features.map((f) => (
                      <Badge key={f} variant="secondary" className="text-xs">
                        {f}
                      </Badge>
                    ))}
                  </div>
  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-600">
                      <UsersIcon className="w-4 h-4 mr-1" /> Up to {room.maxGuests} guests
                    </div>
                    <Button className="bg-amber-600 hover:bg-amber-700">
                      Book
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
  }
  
  export default Rooms;
