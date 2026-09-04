import { useEffect, useState } from "react";
import Image from "@/components/compat/image";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  Fuel,
  Gauge,
  Users,
  Settings2,
  Calendar,
  MapPin,
  Check,
  Heart,
  Share2,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

function CarDetail({car}) {
  const router = useNavigate();
 
  const [wishlisted, setWishlisted] = useState(false);

  const specs = [
    {
      icon: Users,
      label: "Seats",
      value: car.seats,
    },
    {
      icon: Settings2,
      label: "Transmission",
      value: car.transmission,
    },
    {
      icon: Fuel,
      label: "Fuel",
      value: car.fuel,
    },
    {
      icon: Calendar,
      label: "Year",
      value: String(car.year),
    },
    {
      icon: MapPin,
      label: "Location",
      value: car.location,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 -ml-2 text-muted-foreground"
        onClick={() => router(-1)}
      >
        <ArrowLeft className="mr-1 size-4" />
        Back to results
      </Button>

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          {/* Main Image */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border bg-muted">
            <Image
              src={car.image || "/placeholder.svg"}
              alt={`${car.brand} ${car.model}`}
              fill
              className="object-cover"
              priority
            />

            {!car.available && (
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/50">
                <Badge className="bg-destructive text-destructive-foreground text-sm">
                  Currently Unavailable
                </Badge>
              </div>
            )}
          </div>

          {/* Car information */}
          <div className="mt-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {car.fuel}
                </Badge>

                <h1 className="text-3xl font-bold tracking-tight">
                  {car.brand} {car.model}
                </h1>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {car.year}
                  </span>

                  <span className="text-muted-foreground">•</span>

                  <span className="text-sm text-muted-foreground">
                    {car.location}
                  </span>
                </div>
              </div>

              {/* Wishlist / Share */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setWishlisted((w) => !w);

                    toast.success(
                      wishlisted
                        ? "Removed from wishlist"
                        : "Added to wishlist"
                    );
                  }}
                  aria-label="Add to wishlist"
                >
                  <Heart
                    className={`size-4 ${
                      wishlisted
                        ? "fill-destructive text-destructive"
                        : ""
                    }`}
                  />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      window.location.href
                    );

                    toast.success("Link copied");
                  }}
                  aria-label="Share"
                >
                  <Share2 className="size-4" />
                </Button>
              </div>
            </div>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              Rent this {car.brand} {car.model} for a comfortable and
              reliable driving experience.
            </p>

            {/* Specifications */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {specs.map((s) => {
                const Icon = s.icon;

                return (
                  <div
                    key={s.label}
                    className="flex items-center gap-3 rounded-xl border bg-card p-4"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Icon className="size-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        {s.label}
                      </p>

                      <p className="truncate text-sm font-semibold">
                        {s.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Features */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold">
                Features & Amenities
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="flex size-5 items-center justify-center rounded-full bg-secondary text-primary">
                    <Check className="size-3" />
                  </span>

                  Automatic Transmission
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="flex size-5 items-center justify-center rounded-full bg-secondary text-primary">
                    <Check className="size-3" />
                  </span>

                  {car.fuel} Engine
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="flex size-5 items-center justify-center rounded-full bg-secondary text-primary">
                    <Check className="size-3" />
                  </span>

                  Well Maintained
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="flex size-5 items-center justify-center rounded-full bg-secondary text-primary">
                    <Check className="size-3" />
                  </span>

                  Basic Insurance Included
                </div>
              </div>
            </div>

            <Separator className="my-8" />
          </div>
        </div>

        {/* Booking card */}
        <div>
          <Card className="sticky top-24 p-6">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-3xl font-bold">
                  ₹{car.pricePerDay}
                </span>

                <span className="text-muted-foreground">
                  {" "}
                  / day
                </span>
              </div>

              <Badge
                variant={
                  car.available ? "secondary" : "destructive"
                }
              >
                {car.available ? "Available" : "Unavailable"}
              </Badge>
            </div>

            <Separator className="my-5" />

            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">
                  Daily rate
                </dt>

                <dd className="font-medium">
                  ₹{car.pricePerDay}
                </dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-muted-foreground">
                  Service fee
                </dt>

                <dd className="font-medium">
                  ₹0
                </dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-muted-foreground">
                  Insurance
                </dt>

                <dd className="font-medium text-primary">
                  Included
                </dd>
              </div>
            </dl>

            <Separator className="my-5" />

            <Button
              asChild
              size="lg"
              className="w-full"
              disabled={!car.available}
            >
              <Link to={`/booking?car=${car._id}`}>
                Book This Car
              </Link>
            </Button>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5 text-primary" />

              Free cancellation up to 24h before pickup
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export { CarDetail };