import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DrinksCarousel from "../DrinksCarousel/DrinksCarousel";



export default function Pub() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reservation:", form);
    alert("Your reservation has been submitted!");
  };

  const events = [
    {
      title: "Live Band Fridays",
      date: "Every Friday • 7 PM",
      image: "https://images.unsplash.com/photo-1550219363-d0adfaa43d0f?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "Enjoy live music and smooth vibes with the city’s best local bands.",
    },
    {
      title: "Karaoke Nights",
      date: "Every Saturday • 8 PM",
      image: "https://plus.unsplash.com/premium_photo-1661759013744-4754d402459d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "Grab the mic and sing your heart out! Great drinks and fun atmosphere.",
    },
    {
      title: "Trivia Tuesdays",
      date: "Every Tuesday • 6 PM",
      image: "https://plus.unsplash.com/premium_photo-1678103472974-a6435884b194?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "Test your knowledge and win prizes while you sip and chill.",
    },
  ];



  return (
    <div className="bg-amber-50 min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/pub2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold mb-4"
          >
            The Amber Lounge
          </motion.h1>
          <p className="text-lg md:text-xl mb-6">Relax. Sip. Socialize.</p>
          <Button size="lg" className="bg-amber-600 hover:bg-amber-700 mb-8 md:mb-0">
            Reserve a Table
          </Button>

          {/* Opening Hours - Mobile (below button) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="md:hidden mt-6 bg-black/40 backdrop-blur-md p-4 rounded-xl shadow-xl 
      flex flex-col items-center justify-center text-center text-white text-xs
      max-w-[280px]">
            <h3 className="text-base font-semibold mb-2">Opening Hours</h3>
            <p className="text-xs">Monday – Sunday: 5 PM – 1 AM</p>
            <p className="text-xs">Happy Hour: 5 PM – 7 PM</p>
            <p className="mt-2 text-xs">📍 Ground Floor, Hotel Lobby</p>
            <p className="text-xs">📞 +233 555 123 456</p>
          </motion.div>
        </div>

        {/* Opening Hours - Desktop (positioned absolute right) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="hidden md:flex absolute bottom-6 right-20 bg-black/40 backdrop-blur-md p-6 rounded-full shadow-xl 
    flex-col items-center justify-center text-center text-white">
          <h3 className="text-2xl font-semibold mb-4">Opening Hours</h3>
          <p>Monday – Sunday: 5 PM – 1 AM</p>
          <p>Happy Hour: 5 PM – 7 PM</p>
          <p className="mt-4">📍 Ground Floor, Hotel Lobby</p>
          <p>📞 +233 555 123 456</p>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-16 text-center container mx-auto px-4">
        <h2 className="text-4xl font-bold text-amber-800 mb-6">
          About Our Pub
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
          The Amber Lounge is where great drinks, live music, and unforgettable
          evenings come together. Whether you’re here for happy hour, live
          entertainment, or a private celebration, our cozy atmosphere and warm
          service will make every visit special.
        </p>
      </section>

      {/* Live Events */}
      <section className="py-16 bg-amber-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-amber-800 text-center mb-10">
            Live Events
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {events.map((event, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="relative rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 text-white p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-semibold">{event.title}</h3>
                  <p className="text-sm mb-1">{event.date}</p>
                  <p className="text-sm text-gray-200">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Drinks carousel */}
      <DrinksCarousel />

      {/* Reservation Form */}
      <section className="py-20 bg-amber-50" id="reservation">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-amber-800 mb-8">
            Reserve Your Table
          </h2>
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto space-y-4 text-left"
          >
            <Input name="name" placeholder="Name" onChange={handleChange} />
            <Input name="email" placeholder="Email" onChange={handleChange} />
            <Input type="date" name="date" onChange={handleChange} />
            <Input type="time" name="time" onChange={handleChange} />
            <Input
              name="guests"
              placeholder="Number of Guests"
              onChange={handleChange}
            />
            <Textarea
              name="message"
              placeholder="Special Requests"
              onChange={handleChange}
            />
            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700"
            >
              Confirm Reservation
            </Button>
          </form>
        </div>
      </section>

    </div>
  );
}
