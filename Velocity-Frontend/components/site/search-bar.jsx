import { useNavigate } from "react-router-dom";
import { MapPin, CalendarDays, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function SearchBar({ className }) {
  const router = useNavigate();
  function handleSearch(e) {
    e.preventDefault();
    router("/cars");
  }
  return (
    <form
      onSubmit={handleSearch}
      className={cn(
        "grid gap-3 rounded-2xl border border-border bg-card p-3 shadow-xl sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_auto]",
        className,
      )}
    >
      <Field
        icon={<MapPin className="h-4 w-4 text-primary" />}
        label="Location"
      >
        <input
          type="text"
          defaultValue="New York, NY"
          placeholder="City or airport"
          className="w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground"
        />
      </Field>
      <Field
        icon={<CalendarDays className="h-4 w-4 text-primary" />}
        label="Pickup Date"
      >
        <input
          type="date"
          className="w-full bg-transparent text-sm font-medium text-foreground outline-none"
        />
      </Field>
      <Field
        icon={<CalendarDays className="h-4 w-4 text-primary" />}
        label="Return Date"
      >
        <input
          type="date"
          className="w-full bg-transparent text-sm font-medium text-foreground outline-none"
        />
      </Field>
      <Button
        type="submit"
        size="lg"
        className="h-full min-h-13 rounded-xl px-6"
      >
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
    </form>
  );
}
function Field({ icon, label, children }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-muted px-4 py-2.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-background">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        {children}
      </div>
    </div>
  );
}
export { SearchBar };
