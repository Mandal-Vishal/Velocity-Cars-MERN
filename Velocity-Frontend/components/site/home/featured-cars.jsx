import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CarCard } from "@/components/site/car-card";

function FeaturedCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/cars`
        );

        setCars(response.data.cars || []);
      } catch (error) {
        console.error("Failed to fetch featured cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const popular = cars.slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Popular Cars
          </span>

          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
            Most booked this month
          </h2>
        </div>

        <Button
          asChild
          variant="ghost"
          className="hidden font-semibold text-primary sm:inline-flex"
        >
          <Link to="/cars">
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="mt-8 text-center text-muted-foreground">
          Loading cars...
        </div>
      ) : popular.length === 0 ? (
        <div className="mt-8 text-center text-muted-foreground">
          No cars available.
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </section>
  );
}

export { FeaturedCars };