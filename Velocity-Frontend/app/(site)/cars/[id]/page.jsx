import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CarDetail } from "@/components/site/cars/car-detail";

export default function CarPage() {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/cars/${id}`
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
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        Loading car details...
      </div>
    );
  }

  if (!car) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        Car not found.
      </div>
    );
  }

  return <CarDetail car={car} />;
}