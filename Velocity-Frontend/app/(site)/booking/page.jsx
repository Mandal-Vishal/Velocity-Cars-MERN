import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import { BookingFlow } from "@/components/site/booking/booking-flow";

export default function BookingPage() {
  const [searchParams] = useSearchParams();

  const carId = searchParams.get("car");

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      if (!carId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/cars/${carId}`
        );

        setCar(response.data.car);
      } catch (error) {
        console.error("Failed to fetch car:", error);
        setCar(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [carId]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center">
        <p className="text-muted-foreground">
          Loading booking details...
        </p>
      </div>
    );
  }

  if (!carId || !car) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center">
        <h2 className="text-xl font-semibold">
          Car not found
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          The car you're trying to book could not be found.
        </p>
      </div>
    );
  }

  return <BookingFlow car={car} />;
}
