// components/RoomDetail.tsx
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { ROOMS } from "@/data/roomsData"; 

export function RoomDetail() {
  
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const room = ROOMS.find((r) => r.id === Number(id));
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Get current room index for pagination
  const currentRoomIndex = ROOMS.findIndex((r) => r.id === Number(id));
  const hasPrevRoom = currentRoomIndex > 0;
  const hasNextRoom = currentRoomIndex < ROOMS.length - 1;

  // Keyboard navigation for gallery
  useEffect(() => {
    if (!isGalleryOpen || !room) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsGalleryOpen(false);
      if (e.key === "ArrowLeft" && selectedImageIndex > 0) {
        setSelectedImageIndex(selectedImageIndex - 1);
      }
      if (e.key === "ArrowRight" && selectedImageIndex < room.images.length - 1) {
        setSelectedImageIndex(selectedImageIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isGalleryOpen, selectedImageIndex, room]);

  // Prevent body scroll when gallery is open
  useEffect(() => {
    if (isGalleryOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isGalleryOpen]);

  const openGallery = (index: number) => {
    setSelectedImageIndex(index);
    setIsGalleryOpen(true);
  };

  const navigateToRoom = (direction: "prev" | "next") => {
    const newIndex = direction === "prev" ? currentRoomIndex - 1 : currentRoomIndex + 1;
    const newRoom = ROOMS[newIndex];
    if (newRoom) {
      navigate(`/rooms/${newRoom.id}`);
      setSelectedImageIndex(0);
      window.scrollTo(0, 0);
    }
  };

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Room not found</h1>
          <Button onClick={() => navigate("/rooms")} className="bg-amber-600 hover:bg-amber-700">
            Back to Rooms
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full-Screen Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col"
          >
            {/* Gallery Header */}
            <div className="flex items-center justify-between p-4 bg-black bg-opacity-90">
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="text-white hover:text-gray-300 transition"
              >
                <X className="w-8 h-8" />
              </button>
              <span className="text-white font-medium">
                {selectedImageIndex + 1} / {room.images.length}
              </span>
              <div className="w-8" /> {/* Spacer for centering */}
            </div>

            {/* Main Gallery Image */}
            <div className="flex-1 flex items-center justify-center p-4 relative">
              <motion.img
                key={selectedImageIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={room.images[selectedImageIndex]}
                alt={`Room view ${selectedImageIndex + 1}`}
                className="max-h-full max-w-full object-contain"
              />

              {/* Previous Button */}
              {selectedImageIndex > 0 && (
                <button
                  onClick={() => setSelectedImageIndex(selectedImageIndex - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 rounded-full p-3 transition"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Next Button */}
              {selectedImageIndex < room.images.length - 1 && (
                <button
                  onClick={() => setSelectedImageIndex(selectedImageIndex + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 rounded-full p-3 transition"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="bg-black bg-opacity-90 p-4 overflow-x-auto">
              <div className="flex gap-2 justify-center">
                {room.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                      selectedImageIndex === idx
                        ? "ring-2 ring-amber-500 opacity-100"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-20 h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header with back button and pagination */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate("/rooms")}
              className="flex items-center gap-2 text-amber-700 hover:text-amber-800 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </motion.button>
            <h1 className="text-2xl font-bold text-gray-800">{room.name}</h1>
          </div>

          {/* Room Pagination */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateToRoom("prev")}
              disabled={!hasPrevRoom}
              className={`p-2 rounded-full transition ${
                hasPrevRoom
                  ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              title="Previous room"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-600 px-2">
              {currentRoomIndex + 1} / {ROOMS.length}
            </span>
            <button
              onClick={() => navigateToRoom("next")}
              disabled={!hasNextRoom}
              className={`p-2 rounded-full transition ${
                hasNextRoom
                  ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              title="Next room"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 relative"
        >
          <div className="grid grid-cols-4 gap-2 h-[500px]">
            {/* Main large image - takes up left half */}
            <button
              onClick={() => openGallery(0)}
              className="col-span-2 row-span-2 relative overflow-hidden rounded-l-lg group"
            >
              <img
                src={room.images[0]}
                alt="Room view 1"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </button>

            {/* Top right image */}
            {room.images[1] && (
              <button
                onClick={() => openGallery(1)}
                className="col-span-2 relative overflow-hidden rounded-tr-lg group"
              >
                <img
                  src={room.images[1]}
                  alt="Room view 2"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </button>
            )}

            {/* Middle row - 2 images */}
            {room.images[2] && (
              <button
                onClick={() => openGallery(2)}
                className="relative overflow-hidden group"
              >
                <img
                  src={room.images[2]}
                  alt="Room view 3"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </button>
            )}

            {room.images[3] && (
              <button
                onClick={() => openGallery(3)}
                className="relative overflow-hidden group"
              >
                <img
                  src={room.images[3]}
                  alt="Room view 4"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </button>
            )}

            {/* Bottom row - 2 images */}
            {room.images[4] && (
              <button
                onClick={() => openGallery(4)}
                className="relative overflow-hidden group"
              >
                <img
                  src={room.images[4]}
                  alt="Room view 5"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </button>
            )}

            {room.images.length > 5 ? (
              <button
                onClick={() => openGallery(5)}
                className="relative overflow-hidden rounded-br-lg group"
              >
                <img
                  src={room.images[5]}
                  alt="Room view 6"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center group-hover:bg-opacity-50 transition">
                  <span className="text-white text-xl font-bold">+{room.images.length - 5} photos</span>
                </div>
              </button>
            ) : (
              room.images[5] && (
                <button
                  onClick={() => openGallery(5)}
                  className="relative overflow-hidden rounded-br-lg group"
                >
                  <img
                    src={room.images[5]}
                    alt="Room view 6"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </button>
              )
            )}
          </div>

          {/* Show all photos button */}
          <button
            onClick={() => openGallery(0)}
            className="absolute bottom-4 right-4 bg-white border border-gray-800 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2"
          >
            <span>Show all photos</span>
          </button>
        </motion.div>

        {/* Room Navigation - Bottom of Gallery */}
        <div className="flex items-center justify-between mt-8 mb-8 bg-white rounded-lg p-4 shadow-sm">
          <button
            onClick={() => navigateToRoom("prev")}
            disabled={!hasPrevRoom}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              hasPrevRoom
                ? "bg-transparent-600 text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous Room</span>
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-500">Room</p>
            <p className="text-lg font-bold text-gray-800">
              {currentRoomIndex + 1} of {ROOMS.length}
            </p>
          </div>

          <button
            onClick={() => navigateToRoom("next")}
            disabled={!hasNextRoom}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              hasNextRoom
                ? "bg-transparent-600 text-black hover:border-black hover:bg-transparent"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <span>Next Room</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>


        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2">
            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg p-6 mb-6"
            >
              <div className="flex items-start justify-between mb-4">
                <Badge className="bg-amber-600 text-white text-xl px-4 py-2 rounded-lg">
                  ${room.price}/night
                </Badge>
              </div>

              <p className="text-gray-600">{room.description}</p>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">What this place offers</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {room.amenities.map((amenity, idx) => {
                  const Icon = amenity.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4">
                      <Icon className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800">{amenity.label}</p>
                        <p className="text-sm text-gray-600">{amenity.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar - Booking Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 bg-white rounded-lg shadow-lg p-6">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-gray-800">${room.price}</span>
                  <span className="text-gray-600">/night</span>
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="w-5 h-5 text-amber-600" />
                  <span>Up to {room.maxGuests} guests</span>
                </div>
              </div>

              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 p-6 text-lg rounded-lg mb-3">
                Book Now
              </Button>
               <button className="w-full border-2 border-amber-600 text-amber-600 hover:bg-amber-50 font-semibold py-2 rounded-lg transition">
                Reserve room
              </button>

              <p className="text-xs text-gray-600 text-center mt-4">
                You won't be charged yet
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}