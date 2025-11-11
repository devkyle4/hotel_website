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
import { Search, Eye } from "lucide-react";

const mockPayments = [
  { id: "1", booking: "BK-001", customer: "John Doe", amount: "597.00", method: "Credit Card", status: "completed" as const, date: "2024-01-15" },
  { id: "2", booking: "BK-002", customer: "Jane Smith", amount: "796.00", method: "Debit Card", status: "completed" as const, date: "2024-01-16" },
  { id: "3", booking: "BK-003", customer: "Bob Johnson", amount: "198.00", method: "Cash", status: "pending" as const, date: "2024-01-14" },
  { id: "4", booking: "BK-004", customer: "Alice Williams", amount: "398.00", method: "Credit Card", status: "failed" as const, date: "2024-01-17" },
];

const statusColors = {
  completed: "bg-chart-2",
  pending: "bg-chart-3",
  failed: "bg-destructive",
};

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground">
          Track and manage all payment transactions
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search payments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
          data-testid="input-search-payments"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPayments.map((payment) => (
              <TableRow key={payment.id} data-testid={`row-payment-${payment.id}`}>
                <TableCell className="font-medium">{payment.booking}</TableCell>
                <TableCell>{payment.customer}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>
                  <Badge className={statusColors[payment.status]} data-testid={`badge-status-${payment.id}`}>
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-semibold" data-testid={`text-amount-${payment.id}`}>
                  ${payment.amount}
                </TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost" data-testid={`button-view-${payment.id}`}>
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
