import Image from "@/components/compat/image";
import { Link } from "react-router-dom";
import { Star, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/site/search-bar";
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/cars/hero.png"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-secondary/90 via-secondary/70 to-secondary/30" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
            <Star className="h-4 w-4 fill-accent text-accent" />
            Rated 4.9 by 12,000+ drivers
          </span>
          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white text-balance sm:text-6xl lg:text-7xl">
            Find Your Perfect Ride
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/80 text-pretty">
            Rent premium and everyday cars in minutes. Transparent pricing, 24/7
            support, and a fleet you'll love to drive.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 text-base">
              <Link to="/cars">Browse Cars</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/30 bg-white/10 px-8 text-base text-white hover:bg-white/20 hover:text-white"
            >
              <Link to="/about">How It Works</Link>
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-2 text-sm text-white/70">
            <ShieldCheck className="h-4 w-4 text-accent" />
            Free cancellation up to 24 hours before pickup
          </div>
        </div>
      </div>
      
    </section>
  );
}
export { Hero };
