import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Eye } from "lucide-react";

const mockServices = [
  { id: "1", name: "Room Service Breakfast", category: "Food & Beverage", price: "25.00", available: true },
  { id: "2", name: "Spa Treatment", category: "Spa & Wellness", price: "89.00", available: true },
  { id: "3", name: "Airport Transfer", category: "Transportation", price: "45.00", available: true },
  { id: "4", name: "Laundry Service", category: "Housekeeping", price: "15.00", available: true },
  { id: "5", name: "City Tour", category: "Transportation", price: "120.00", available: false },
];

export default function Services() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">
            Manage additional services and amenities
          </p>
        </div>
        <Button data-testid="button-add-service">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockServices.map((service) => (
              <TableRow key={service.id} data-testid={`row-service-${service.id}`}>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell>{service.category}</TableCell>
                <TableCell>
                  <Badge className={service.available ? "bg-chart-2" : "bg-muted"} data-testid={`badge-status-${service.id}`}>
                    {service.available ? "Available" : "Unavailable"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-semibold" data-testid={`text-price-${service.id}`}>
                  ${service.price}
                </TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost" data-testid={`button-view-${service.id}`}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
