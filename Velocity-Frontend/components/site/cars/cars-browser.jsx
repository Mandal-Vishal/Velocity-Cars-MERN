import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, Search, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

import { CarCard } from "@/components/site/car-card";
import { fuelTypes, transmissions } from "@/lib/data";

function CarsBrowser() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCars = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/cars`,
          { withCredentials: true },
        );
        setCars(res.data.cars || []);
      } catch (err) {
        console.error("Failed to fetch cars:", err);
        setError("Unable to load cars. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    getCars();
  }, []);

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recommended");
  const [selFuels, setSelFuels] = useState([]);
  const [selTrans, setSelTrans] = useState([]);
  const [selSeats, setSelSeats] = useState([]);
  const [maxPrice, setMaxPrice] = useState(10000);

  function toggle(list, set, val) {
    set(list.includes(val) ? list.filter((v) => v !== val) : [...list, val]);
  }

  function reset() {
    setSelFuels([]);
    setSelTrans([]);
    setSelSeats([]);
    setMaxPrice(10000);
    setQuery("");
  }

  const filtered = useMemo(() => {
    const list = cars.filter((c) => {
      if (
        query &&
        !`${c.model} ${c.brand || ""}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ) {
        return false;
      }
      if (selFuels.length && !selFuels.includes(c.fuel)) return false;
      if (selTrans.length && !selTrans.includes(c.transmission)) return false;
      if (selSeats.length && !selSeats.includes(c.seats)) return false;
      if (c.pricePerDay > maxPrice) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.pricePerDay - b.pricePerDay);
      case "price-desc":
        return [...list].sort((a, b) => b.pricePerDay - a.pricePerDay);
      default:
        return list;
    }
  }, [cars, query, sort, selFuels, selTrans, selSeats, maxPrice]); 

  const filters = (
    <div className="space-y-7">
      <FilterGroup title="Price Range">
        <div className="px-1">
          <Slider
            value={[maxPrice]}
            min={500}
            max={10000}
            step={100}
            onValueChange={(value) => setMaxPrice(value)}
          />
          <div className="mt-3 flex justify-between text-sm text-muted-foreground">
            <span>₹500</span>
            <span className="font-semibold text-foreground">
              Up to ₹{maxPrice}/day
            </span>
          </div>
        </div>
      </FilterGroup>

      <FilterGroup title="Fuel Type">
        {fuelTypes.map((f) => (
          <CheckRow
            key={f}
            id={`f-${f}`}
            label={f}
            checked={selFuels.includes(f)}
            onChange={() => toggle(selFuels, setSelFuels, f)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Transmission">
        {transmissions.map((t) => (
          <CheckRow
            key={t}
            id={`t-${t}`}
            label={t}
            checked={selTrans.includes(t)}
            onChange={() => toggle(selTrans, setSelTrans, t)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Seats">
        <div className="flex flex-wrap gap-2">
          {[2, 4, 5, 7].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggle(selSeats, setSelSeats, s)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                selSeats.includes(s)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>

      <Button variant="outline" className="w-full" onClick={reset}>
        <X className="mr-2 h-4 w-4" /> Clear all filters
      </Button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
          Explore our fleet
        </h1>
        <p className="mt-2 text-muted-foreground">
          {loading
            ? "Fetching available cars..."
            : `${filtered.length} cars available for your next journey`}
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or brand..."
            className="h-11 rounded-xl bg-card pl-10"
          />
        </div>

        <Select value={sort} onValueChange={(v) => setSort(v)}>
          <SelectTrigger className="h-11 w-full rounded-xl bg-card sm:w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>

        <Sheet>
          <SheetTrigger className="h-11 rounded-xl border border-border bg-background px-4 text-sm font-medium hover:bg-muted lg:hidden">
            <SlidersHorizontal className="mr-2 h-4 w-4 inline" /> Filters{" "}
          </SheetTrigger>
          <SheetContent side="left" className="w-80 overflow-y-auto">
            <SheetTitle className="mb-4">Filters</SheetTitle>
            {filters}
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display font-bold text-secondary">Filters</h2>
            </div>
            {filters}
          </div>
        </aside>

        <div>
          {loading ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Loading car inventory...
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-destructive/50 py-24 text-center">
              <p className="font-display text-lg font-bold text-destructive">
                {error}
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center">
              <p className="font-display text-lg font-bold text-secondary">
                No cars match your filters
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting or clearing your filters.
              </p>
              <Button variant="outline" className="mt-4" onClick={reset}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((car) => (
                <CarCard key={car._id || car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div>
      <h3 className="mb-3 font-display text-sm font-bold text-secondary">
        {title}
      </h3>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function CheckRow({ id, label, checked, onChange }) {
  return (
    <div className="flex items-center gap-2.5">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <Label
        htmlFor={id}
        className="cursor-pointer text-sm font-normal text-muted-foreground"
      >
        {label}
      </Label>
    </div>
  );
}

export { CarsBrowser };
