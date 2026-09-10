import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/src/context/AuthContext";
import {
  Search,
  CalendarCheck,
  Heart,
  User,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const { user } = useContext(AuthContext);

  const [cars, setCars] = useState([]);
  const [carsLoading, setCarsLoading] = useState(true);
  const [carsError, setCarsError] = useState("");

  // Fetch real cars from backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setCarsLoading(true);
        setCarsError("");

        const response = await axios.get(
          "https://velocity-server-vert.vercel.app/api/cars",
          {
            withCredentials: true,
          }
        );

        setCars(response.data.cars || response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);

        setCarsError("Unable to load cars right now.");
      } finally {
        setCarsLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Welcome Section */}
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

          {/* Loading */}
          {carsLoading && (
            <div className="mt-8 flex items-center justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin" />

              <span className="ml-2 text-sm text-muted-foreground">
                Loading cars...
              </span>
            </div>
          )}

          {/* Error */}
          {!carsLoading && carsError && (
            <div className="mt-5 rounded-xl border p-6 text-center">
              <p className="text-sm text-muted-foreground">
                {carsError}
              </p>
            </div>
          )}

          {/* No Cars */}
          {!carsLoading &&
            !carsError &&
            cars.length === 0 && (
              <div className="mt-5 rounded-xl border p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  No cars are available at the moment.
                </p>
              </div>
            )}

          {/* Real Cars */}
          {!carsLoading &&
            !carsError &&
            cars.length > 0 && (
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {cars.slice(0, 3).map((car) => (
                  <Link
                    key={car._id}
                    to={`/cars/${car._id}`}
                    className="group overflow-hidden rounded-xl border bg-card transition hover:-translate-y-1 hover:shadow-md"
                  >

                    {/* Car Image */}
                    <div className="h-48 w-full overflow-hidden bg-muted">
                      {car.image ? (
                        <img
                          src={car.image}
                          alt={`${car.brand} ${car.model}`}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Car Details */}
                    <div className="p-5">

                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {car.brand} {car.model}
                          </h3>

                          <p className="mt-1 text-sm text-muted-foreground">
                            {car.year}
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            car.available
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {car.available ? "Available" : "Unavailable"}
                        </span>
                      </div>

                      {/* Specifications */}
                      <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <span>{car.transmission}</span>

                        <span>•</span>

                        <span>{car.fuel}</span>

                        {car.location && (
                          <>
                            <span>•</span>
                            <span>{car.location}</span>
                          </>
                        )}
                      </div>

                      {/* Price */}
                      <div className="mt-4">
                        <span className="text-lg font-bold">
                          ₹{car.pricePerDay}
                        </span>

                        <span className="text-sm text-muted-foreground">
                          /day
                        </span>
                      </div>

                    </div>
                  </Link>
                ))}

              </div>
            )}

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
