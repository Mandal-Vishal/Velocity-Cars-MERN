import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "@/components/compat/image";
import { Fuel, Gauge, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import axios from "axios";

function CarCard({ car }) {
  const [liked, setLiked] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/wishlist`,
          {
            withCredentials: true,
          }
        );

        const wishlist = res.data.wishlist || [];

        const exists = wishlist.some(
          (item) => item._id === car._id
        );

        setLiked(exists);
      } catch (error) {
        // User may simply not be logged in
        console.log("Wishlist check:", error.message);
      }
    };

    checkWishlist();
  }, [car._id]);

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (wishlistLoading) return;

    try {
      setWishlistLoading(true);

      if (!liked) {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/wishlist/${car._id}`,
          {},
          {
            withCredentials: true,
          }
        );

        setLiked(true);
      } else {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/wishlist/${car._id}`,
          {
            withCredentials: true,
          }
        );

        setLiked(false);
      }
    } catch (error) {
      console.error("Wishlist error:", error);

      if (error.response?.status === 401) {
        console.log("User must login first");
      }
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={car.image || "/placeholder.svg"}
          alt={`${car.brand} ${car.model}`}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <button
          onClick={handleWishlist}
          disabled={wishlistLoading}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 shadow-sm backdrop-blur transition-colors hover:bg-background"
          aria-label={
            liked
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          <Heart
            className={cn(
              "h-4 w-4",
              liked
                ? "fill-destructive text-destructive"
                : "text-secondary"
            )}
          />
        </button>

        <Badge className="absolute left-3 top-3 bg-secondary text-secondary-foreground hover:bg-secondary">
          {car.type}
        </Badge>

        {!car.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
            <Badge variant="destructive" className="text-sm">
              Unavailable
            </Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-base font-bold text-secondary">
              {car.brand} {car.model}
            </h3>

            <p className="text-xs text-muted-foreground">
              {car.location}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 border-y border-border py-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5 text-primary" />
            {car.transmission === "Automatic"
              ? "Auto"
              : "Manual"}
          </span>

          <span className="flex items-center gap-1.5">
            <Fuel className="h-3.5 w-3.5 text-primary" />
            {car.fuel}
          </span>

          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-primary" />
            {car.seats || 5} Seats
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="font-display text-xl font-extrabold text-secondary">
              ₹{car.pricePerDay}
            </span>

            <span className="text-sm text-muted-foreground">
              /day
            </span>
          </div>

          <Button asChild size="sm" className="rounded-full">
            <Link to={`/cars/${car._id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export { CarCard };