import { Suspense } from "react";
import { CarsBrowser } from "@/components/site/cars/cars-browser";
const metadata = {
  title: "Browse Cars | DriveLux",
  description:
    "Explore our full fleet of luxury, economy, SUV, and electric rental cars. Filter by price, type, and features.",
};
function CarsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-pretty text-3xl font-bold tracking-tight md:text-4xl">
          Find your perfect ride
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse our fleet and filter to match exactly what you need.
        </p>
      </div>
      <Suspense
        fallback={
          <div className="py-20 text-center text-muted-foreground">
            Loading cars…
          </div>
        }
      >
        <CarsBrowser />
      </Suspense>
    </div>
  );
}
export { CarsPage as default, metadata };
