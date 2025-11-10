import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
    import { Link } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { 
  CalendarIcon, 
  MapPinIcon, 
  PhoneIcon, 
  MailIcon, 
  WifiIcon, 
  CarIcon, 
  UtensilsIcon, 
  WavesIcon,
  MessageCircleIcon,
  StarIcon,
  UsersIcon,
  BedIcon,
  BathIcon,
  AirVentIcon,
  TvIcon,
  CoffeeIcon,
  XIcon
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "../lib/utils";

function Home() {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const rooms = [
    {
      id: 1,
      name: "Deluxe Ocean View",
      price: 299,
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
      description: "Spacious room with stunning ocean views and modern amenities",
      features: ["Ocean View", "King Bed", "Private Balcony", "Mini Bar"],
      maxGuests: 2
    },
    {
      id: 2,
      name: "Family Suite",
      price: 449,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
      description: "Perfect for families with separate living area and two bedrooms",
      features: ["2 Bedrooms", "Living Area", "Kitchenette", "Sofa Bed"],
      maxGuests: 6
    },
    {
      id: 3,
      name: "Luxury Presidential",
      price: 799,
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      description: "Ultimate luxury with panoramic views and premium services",
      features: ["Panoramic View", "Jacuzzi", "Butler Service", "Premium Bar"],
      maxGuests: 4
    }
  ];

  const amenities = [
    { icon: WifiIcon, name: "Free WiFi", description: "High-speed internet throughout the property" },
    { icon: CarIcon, name: "Free Parking", description: "Complimentary valet parking service" },
    { icon: UtensilsIcon, name: "Restaurant", description: "Fine dining with ocean views" },
    { icon: WavesIcon, name: "Swimming Pool", description: "Infinity pool overlooking the ocean" },
    { icon: AirVentIcon, name: "Spa & Wellness", description: "Full-service spa and fitness center" },
    { icon: TvIcon, name: "Entertainment", description: "Smart TVs and entertainment systems" }
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80"
  ];

  const location = useLocation();

useEffect(() => {
  if (location.hash) {
    const sectionId = location.hash.replace("#", "");
    const section = document.getElementById(sectionId);
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth" });
      }, 300); // wait for the page or animation to finish
    }
  }
}, [location]);


  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to<br />
            <span className="text-amber-300">Serenity Resort</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience luxury and tranquility in our oceanfront paradise. 
            Where every moment becomes a cherished memory.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Button 
              size="lg" 
              onClick={() => setBookingOpen(true)}
              className="bg-amber-600 hover:bg-amber-700 text-lg px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Book Your Stay
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Rooms</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our carefully designed accommodations, each offering comfort and elegance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                  <div className="relative">
                    <img 
                      src={room.image} 
                      alt={room.name}
                      className="w-full h-64 object-cover"
                    />
                    <Badge className="absolute top-4 right-4 bg-amber-600">
                      ${room.price}/night
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">{room.name}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {room.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <UsersIcon className="w-4 h-4 mr-1" />
                        Up to {room.maxGuests} guests
                      </div>
                      <Button 
                        onClick={() => setBookingOpen(true)}
                        className="bg-amber-600 hover:bg-amber-700"
                      >
                        Reserve
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-20 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Amenities</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enjoy world-class facilities designed for your comfort and convenience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
              <motion.div
                key={amenity.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <amenity.icon className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{amenity.name}</h3>
                <p className="text-gray-600">{amenity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Gallery</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take a visual journey through our beautiful resort
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image} 
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-48 md:h-64 object-cover hover:scale-110 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-gray-50 to-amber-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get in touch with us for reservations and inquiries
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-white shadow-xl">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send us a message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your message..." rows={4} />
                  </div>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700">
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPinIcon className="w-5 h-5 text-amber-600 mr-3" />
                    <span className="text-gray-600">123 Ocean Drive, Paradise Bay, PB 12345</span>
                  </div>
                  <div className="flex items-center">
                    <PhoneIcon className="w-5 h-5 text-amber-600 mr-3" />
                    <span className="text-gray-600">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <MailIcon className="w-5 h-5 text-amber-600 mr-3" />
                    <span className="text-gray-600">info@serenityresort.com</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Location</h3>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-gray-600">Interactive Map Placeholder</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="lg"
          className="rounded-full w-16 h-16 bg-green-500 hover:bg-green-600 shadow-2xl"
          onClick={() => window.open('https://wa.me/1234567890', '_blank')}
        >
          <MessageCircleIcon className="w-8 h-8" />
        </Button>
      </motion.div>

      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book Your Stay</DialogTitle>
            <DialogDescription>
              Fill in your details to make a reservation
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bookingFirstName">First Name</Label>
                <Input id="bookingFirstName" placeholder="John" />
              </div>
              <div>
                <Label htmlFor="bookingLastName">Last Name</Label>
                <Input id="bookingLastName" placeholder="Doe" />
              </div>
            </div>
            <div>
              <Label htmlFor="bookingEmail">Email</Label>
              <Input id="bookingEmail" type="email" placeholder="john@example.com" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Check-in Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !checkIn && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkIn ? format(checkIn, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Check-out Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !checkOut && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOut ? format(checkOut, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div>
              <Label htmlFor="guests">Number of Guests</Label>
              <Input id="guests" type="number" min="1" max="10" defaultValue="2" />
            </div>
            <Button className="w-full bg-amber-600 hover:bg-amber-700">
              Submit Booking Request
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Image Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative max-w-4xl max-h-full"
          >
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <XIcon className="w-6 h-6" />
            </Button>
            <img
              src={selectedImage}
              alt="Gallery"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Home;