import { useContext } from "react";
import { AuthContext } from "@/src/context/AuthContext";
import { Search, CalendarCheck, Heart, User } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back, {user?.firstName}!
          </h1>

          <p className="mt-2 text-muted-foreground">
            Find the perfect car for your next journey.
          </p>
        </div>

        {/* Search Section */}
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <Search className="h-5 w-5 text-muted-foreground" />

            <input
              type="text"
              placeholder="Search by car name or location..."
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold">
            Quick Access
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">

            <Link
              to="/cars"
              className="rounded-xl border p-5 transition hover:bg-muted"
            >
              <Search className="mb-3 h-6 w-6" />

              <h3 className="font-semibold">
                Browse Cars
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Explore available cars.
              </p>
            </Link>

            <Link
              to="/bookings"
              className="rounded-xl border p-5 transition hover:bg-muted"
            >
              <CalendarCheck className="mb-3 h-6 w-6" />

              <h3 className="font-semibold">
                My Bookings
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                View your current and previous bookings.
              </p>
            </Link>

            <Link
              to="/wishlist"
              className="rounded-xl border p-5 transition hover:bg-muted"
            >
              <Heart className="mb-3 h-6 w-6" />

              <h3 className="font-semibold">
                Wishlist
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                View your saved cars.
              </p>
            </Link>

          </div>
        </div>

        {/* Recommended Cars */}
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Recommended Cars
            </h2>

            <Link
              to="/cars"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all cars
            </Link>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-xl border p-5">
              <div className="flex h-40 items-center justify-center rounded-lg bg-muted">
                Car Image
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                BMW 3 Series
              </h3>

              <p className="text-sm text-muted-foreground">
                Automatic • Petrol
              </p>

              <p className="mt-3 font-semibold">
                ₹4,500/day
              </p>
            </div>

            <div className="rounded-xl border p-5">
              <div className="flex h-40 items-center justify-center rounded-lg bg-muted">
                Car Image
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                Hyundai Creta
              </h3>

              <p className="text-sm text-muted-foreground">
                Automatic • Petrol
              </p>

              <p className="mt-3 font-semibold">
                ₹2,500/day
              </p>
            </div>

            <div className="rounded-xl border p-5">
              <div className="flex h-40 items-center justify-center rounded-lg bg-muted">
                Car Image
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                Tata Nexon
              </h3>

              <p className="text-sm text-muted-foreground">
                Manual • Petrol
              </p>

              <p className="mt-3 font-semibold">
                ₹2,000/day
              </p>
            </div>

          </div>
        </div>

        {/* Profile Shortcut */}
        <div className="mt-12 flex items-center gap-4 rounded-xl border p-5">
          <User className="h-8 w-8" />

          <div>
            <h3 className="font-semibold">
              Manage your account
            </h3>

            <p className="text-sm text-muted-foreground">
              Update your personal information and preferences.
            </p>
          </div>

          <Link
            to="/profile"
            className="ml-auto text-sm font-medium text-primary hover:underline"
          >
            View Profile
          </Link>
        </div>

      </section>
    </div>
  );
}

export default Home;