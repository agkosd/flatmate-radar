"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  title: string;
  price: string;
  suburb: string;
}

export default function ListingCard({ title, price, suburb }: Props) {
  return (
    <Card className="w-full max-w-sm rounded-2xl border bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <CardContent className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p>{price}</p>
        <p className="text-sm text-muted-foreground">{suburb}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          <Badge variant="secondary">Quiet</Badge>
          <Badge variant="outline">Non-smoker</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
