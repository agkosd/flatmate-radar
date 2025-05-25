"use client";
import FilterBar from "@/components/FilterBar";
import ListingCard from "@/components/ListingCard";
import { useEffect, useState } from "react";

type Listing = {
  id: string;
  title: string;
  price: string;
  suburb: string;
};

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);

  const [filters, setFilters] = useState({
    suburb: "",
    maxPrice: 1000,
    nonSmoker: false,
  });

  const filtered = listings.filter((l) => {
    const price = parseInt(l.price.replace(/[^0-9]/g, "")) || 0;
    const matchSuburb =
      filters.suburb === "" ||
      l.suburb.toLowerCase().includes(filters.suburb.toLowerCase());
    const matchPrice = price <= filters.maxPrice;
    const matchSmoke =
      !filters.nonSmoker || !l.title.toLowerCase().includes("smoke");
    return matchSuburb && matchPrice && matchSmoke;
  });

  useEffect(() => {
    const es = new EventSource("/api/stream");
    es.onmessage = (e) => {
      try {
        const data: Listing = JSON.parse(e.data);
        setListings((prev) => [data, ...prev].slice(0, 100));
      } catch {
        // ignore ping
      }
    };
    return () => es.close();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <FilterBar filters={filters} onChange={setFilters} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <p className="text-muted-foreground">Waiting for live data…</p>
        ) : (
          filtered.map((l) => <ListingCard key={l.id} {...l} />)
        )}
      </div>
    </main>
  );
}
