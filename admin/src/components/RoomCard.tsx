import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Users } from "lucide-react";

interface RoomCardProps {
  roomNumber: string;
  roomType: string;
  price: string;
  capacity: number;
  status: "available" | "occupied" | "maintenance" | "cleaning";
}

const statusColors = {
  available: "bg-chart-2",
  occupied: "bg-destructive",
  maintenance: "bg-chart-3",
  cleaning: "bg-chart-4",
};

export function RoomCard({ roomNumber, roomType, price, capacity, status }: RoomCardProps) {
  return (
    <Card className="hover-elevate" data-testid={`card-room-${roomNumber}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 pb-3">
        <CardTitle className="text-base">Room {roomNumber}</CardTitle>
        <Badge className={statusColors[status]} data-testid={`badge-status-${roomNumber}`}>
          {status}
        </Badge>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Bed className="h-4 w-4" />
            <span>{roomType}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>Capacity: {capacity}</span>
          </div>
          <div className="text-lg font-semibold" data-testid={`text-price-${roomNumber}`}>
            ${price}/night
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm" className="flex-1" data-testid={`button-view-${roomNumber}`}>
          View Details
        </Button>
        <Button size="sm" variant="outline" className="flex-1" data-testid={`button-book-${roomNumber}`}>
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}
