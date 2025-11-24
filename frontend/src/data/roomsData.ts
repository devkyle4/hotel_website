import {
    Wifi,
    Sofa,
    Users,
    Wind,
    Eye,
    UtensilsCrossed,
    Waves,
} from "lucide-react";

export const ROOMS = [
    {
        id: 1,
        name: "Deluxe Ocean View",
        price: 299,
        image:
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500&q=80",
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500&q=80",
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500&q=80",
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500&q=80",
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500&q=80",
        ],
        amenities: [
            { icon: Sofa, label: "Living Area", description: "Comfortable seating" },
            { icon: Wind, label: "Air Conditioning", description: "Climate control" },
            { icon: Wifi, label: "Free Wifi", description: "High-speed internet" },
            { icon: Eye, label: "View", description: "Ocean view" },
            { icon: Users, label: "Max 2 Guests", description: "Capacity" },
            { icon: UtensilsCrossed, label: "Mini Bar", description: "Beverages" },
        ],
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
        images: [
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&q=80",
            "https://images.unsplash.com/photo-1631049307038-da0ec89d4d0a?w=500&q=80",
            "https://images.unsplash.com/photo-1566195992271-5931baf63e23?w=500&q=80",
            "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&q=80",
            "https://images.unsplash.com/photo-1631049307038-da0ec89d4d0a?w=500&q=80",
        ],
        amenities: [
            { icon: Sofa, label: "2 Bedrooms", description: "Separate rooms" },
            { icon: UtensilsCrossed, label: "Kitchenette", description: "Full cooking" },
            { icon: Wifi, label: "Free Wifi", description: "High-speed internet" },
            { icon: Wind, label: "Air Conditioning", description: "Climate control" },
            { icon: Users, label: "Max 6 Guests", description: "Capacity" },
            { icon: Eye, label: "View", description: "Garden view" },
        ],
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
        images: [
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&q=80",
            "https://images.unsplash.com/photo-1631049307038-da0ec89d4d0a?w=500&q=80",
            "https://images.unsplash.com/photo-1566195992271-5931baf63e23?w=500&q=80",
            "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&q=80",
            "https://images.unsplash.com/photo-1631049307038-da0ec89d4d0a?w=500&q=80",
        ],
        amenities: [
            { icon: Waves, label: "Private Jacuzzi", description: "Personal spa" },
            { icon: Eye, label: "Panoramic View", description: "Full resort view" },
            { icon: UtensilsCrossed, label: "Premium Bar", description: "Full bar" },
            { icon: Wifi, label: "Free Wifi", description: "High-speed internet" },
            { icon: Users, label: "Max 4 Guests", description: "Capacity" },
            { icon: Wind, label: "Air Conditioning", description: "Climate control" },
        ],
        description: "Ultimate luxury with panoramic views and premium services",
        features: ["Panoramic View", "Jacuzzi", "Butler Service", "Premium Bar"],
        maxGuests: 4,
    },
]