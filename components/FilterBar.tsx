"use client";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  filters: {
    suburb: string;
    maxPrice: number;
    nonSmoker: boolean;
  };
  onChange: (filters: Props["filters"]) => void;
};

export default function FilterBar({ filters, onChange }: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end mb-6">
      <div className="flex flex-col gap-1 w-full md:w-1/3">
        <label className="text-sm font-medium">Suburb</label>
        <Input
          placeholder="e.g. Newtown"
          value={filters.suburb}
          onChange={(e) => onChange({ ...filters, suburb: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1 w-full md:w-1/3">
        <label className="text-sm font-medium">
          Max Price (${filters.maxPrice})
        </label>
        <Slider
          value={[filters.maxPrice]}
          min={100}
          max={1000}
          step={25}
          onValueChange={([val]) => onChange({ ...filters, maxPrice: val })}
        />
      </div>

      <div className="flex items-center gap-2 mt-2 md:mt-0">
        <Checkbox
          checked={filters.nonSmoker}
          onCheckedChange={(val) => onChange({ ...filters, nonSmoker: !!val })}
        />
        <label className="text-sm">Non-smoker only</label>
      </div>
    </div>
  );
}
