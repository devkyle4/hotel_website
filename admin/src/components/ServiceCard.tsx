import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  onAdd: () => void;
}

export function ServiceCard({ id, name, description, price, category, onAdd }: ServiceCardProps) {
  return (
    <Card className="hover-elevate" data-testid={`card-service-${id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{name}</CardTitle>
          <div className="text-sm font-semibold text-primary" data-testid={`text-price-${id}`}>
            ${price.toFixed(2)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="text-xs text-muted-foreground mt-2">
          {category}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          size="sm"
          className="w-full"
          onClick={onAdd}
          data-testid={`button-add-${id}`}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add to Order
        </Button>
      </CardFooter>
    </Card>
  );
}
