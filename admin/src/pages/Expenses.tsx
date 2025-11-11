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
import { Plus, Search } from "lucide-react";

const mockExpenses = [
  { id: "1", description: "Cleaning Supplies", amount: "450.00", category: "Housekeeping", date: "2024-01-15" },
  { id: "2", description: "Food & Beverage Stock", amount: "2,340.00", category: "Food & Beverage", date: "2024-01-14" },
  { id: "3", description: "Maintenance Tools", amount: "680.00", category: "Maintenance", date: "2024-01-13" },
  { id: "4", description: "Staff Uniforms", amount: "890.00", category: "Staff", date: "2024-01-12" },
  { id: "5", description: "Utility Bills", amount: "1,250.00", category: "Utilities", date: "2024-01-10" },
];

const categoryColors = {
  "Housekeeping": "bg-chart-1",
  "Food & Beverage": "bg-chart-2",
  "Maintenance": "bg-chart-3",
  "Staff": "bg-chart-4",
  "Utilities": "bg-chart-5",
};

export default function Expenses() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
          <p className="text-muted-foreground">
            Track and manage operational expenses
          </p>
        </div>
        <Button data-testid="button-add-expense">
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search expenses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
          data-testid="input-search-expenses"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockExpenses.map((expense) => (
              <TableRow key={expense.id} data-testid={`row-expense-${expense.id}`}>
                <TableCell className="font-medium">{expense.description}</TableCell>
                <TableCell>
                  <Badge className={categoryColors[expense.category as keyof typeof categoryColors]}>
                    {expense.category}
                  </Badge>
                </TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell className="text-right font-semibold" data-testid={`text-amount-${expense.id}`}>
                  ${expense.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
