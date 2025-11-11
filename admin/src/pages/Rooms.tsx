import { useState } from "react";
import { RoomCard } from "@/components/RoomCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";

const mockRooms = [
  { roomNumber: "101", roomType: "Deluxe Suite", price: "199", capacity: 2, status: "available" as const },
  { roomNumber: "102", roomType: "Standard Room", price: "99", capacity: 2, status: "occupied" as const },
  { roomNumber: "103", roomType: "Standard Room", price: "99", capacity: 2, status: "available" as const },
  { roomNumber: "201", roomType: "Premium Suite", price: "299", capacity: 4, status: "maintenance" as const },
  { roomNumber: "202", roomType: "Deluxe Suite", price: "199", capacity: 2, status: "occupied" as const },
  { roomNumber: "203", roomType: "Family Room", price: "249", capacity: 4, status: "available" as const },
  { roomNumber: "301", roomType: "Presidential Suite", price: "499", capacity: 6, status: "available" as const },
  { roomNumber: "302", roomType: "Premium Suite", price: "299", capacity: 4, status: "cleaning" as const },
];

export default function Rooms() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rooms</h1>
          <p className="text-muted-foreground">
            Manage your hotel rooms and availability
          </p>
        </div>
        <Button data-testid="button-add-room">
          <Plus className="h-4 w-4 mr-2" />
          Add Room
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rooms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
            data-testid="input-search-rooms"
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]" data-testid="select-filter-type">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="standard">Standard Room</SelectItem>
            <SelectItem value="deluxe">Deluxe Suite</SelectItem>
            <SelectItem value="premium">Premium Suite</SelectItem>
            <SelectItem value="presidential">Presidential Suite</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]" data-testid="select-filter-status">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="occupied">Occupied</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="cleaning">Cleaning</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mockRooms.map((room) => (
          <RoomCard key={room.roomNumber} {...room} />
        ))}
      </div>
    </div>
  );
}
