import { useState , useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Car, CheckCircle2, Clock3, Heart, MapPin,XCircle,
  CalendarDays, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CarCard } from "../car-card";
import { AuthContext } from "@/src/context/AuthContext";

import axios from "axios";

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/bookings/renter`,
          {
            withCredentials: true,
          }
        );

        setBookings(res.data.bookings || []);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-14 text-center">
        Loading your bookings...
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      <span className="text-sm font-semibold uppercase tracking-wide text-primary">
        Your trips
      </span>

      <h1 className="mt-2 font-display text-4xl font-extrabold text-secondary">
        My bookings
      </h1>

      <div className="mt-10 space-y-4">
        {bookings.map((booking) => {
          const car = booking.car;

          return (
            <div
              key={booking._id}
              className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-16 items-center justify-center rounded-xl bg-muted">
                  <Car className="size-8 text-primary" />
                </div>

                <div>
                  <p className="font-display font-bold text-secondary">
                    {car?.brand} {car?.model}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {new Date(
                      booking.pickupDate
                    ).toLocaleDateString()}{" "}
                    –{" "}
                    {new Date(
                      booking.returnDate
                    ).toLocaleDateString()}
                  </p>

                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" />
                    {booking.pickupLocation}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    booking.status === "Confirmed"
                      ? "bg-emerald-100 text-emerald-700"
                      : booking.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {booking.status}
                </span>

                {/* <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                >
                  View details
                </Button> */}
              </div>
            </div>
          );
        })}
      </div>

      {!bookings.length && (
        <div className="mt-10 rounded-2xl border border-dashed border-border p-16 text-center">
          <p className="text-muted-foreground">
            You don't have any bookings yet.
          </p>
        </div>
      )}
    </main>
  );
}

function WishlistPage() {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  const getWishlist = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/wishlist`,
        {
          withCredentials: true,
        }
      );

      setSaved(res.data.wishlist || []);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  const removeFromWishlist = async (carId) => {
    try {
      await axios.delete(
       ` ${import.meta.env.VITE_API_URL}/api/wishlist/${carId}`,
        {
          withCredentials: true,
        }
      );

      setSaved((current) =>
        current.filter((car) => car._id !== carId)
      );
    } catch (error) {
      console.error("Failed to remove car:", error);
    }
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-14">
        <p className="text-center text-muted-foreground">
          Loading your wishlist...
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      <span className="text-sm font-semibold uppercase tracking-wide text-primary">
        Saved cars
      </span>

      <h1 className="mt-2 font-display text-4xl font-extrabold text-secondary">
        Your wishlist
      </h1>

      {saved.length ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((car) => (
            <div
              key={car._id}
              className="relative"
            >
              <CarCard car={car} />

              <button
                aria-label={`Remove ${car.brand} ${car.model}`}
                onClick={() =>
                  removeFromWishlist(car._id)
                }
                className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-card text-primary shadow-sm"
              >
                <Heart className="size-4 fill-current" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-border p-16 text-center">
          <Heart className="mx-auto size-10 text-muted-foreground" />

          <p className="mt-4 text-muted-foreground">
            Your wishlist is empty.
          </p>

          <Button asChild className="mt-5 rounded-full">
            <Link to="/cars">
              Browse cars
            </Link>
          </Button>
        </div>
      )}
    </main>
  );
}

function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const {user} = useContext(AuthContext)
  console.log(user)
  return (
    <main className="mx-auto max-w-5xl px-4 py-14">
      <span className="text-sm font-semibold uppercase tracking-wide text-primary">
        Account
      </span>
      <h1 className="mt-2 font-display text-4xl font-extrabold text-secondary">
        Profile settings
      </h1>
      <div className="mt-10 grid gap-8 md:grid-cols-[220px_1fr]">
        <aside className="rounded-2xl border border-border bg-card p-5 text-center">
          <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
           {` ${user.firstName[0]}${user.lastName[0]}`.toUpperCase()}
          </div>
          <p className="mt-4 font-display font-bold text-secondary">
            {`${user.firstName}${user.lastName}`.toUpperCase()}
          </p>
          <p className="text-sm text-muted-foreground">Member since {user.createdAt.slice(0,4)}</p>
        </aside>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSaved(true);
          }}
          className="rounded-2xl border border-border bg-card p-6 sm:p-8"
        >
          <h2 className="font-display text-xl font-bold text-secondary">
            Personal information
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="p-first">First name</Label>
              <Input id="p-first" defaultValue = {user.firstName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p-last">Last name</Label>
              <Input id="p-last" value = {user.lastName} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="p-email">Email</Label>
              <Input id="p-email" type="email" value = {user.email} />
            </div>
          </div>
          <div className="mt-7 flex items-center gap-4">
            <Button type="submit" className="rounded-full">
              Save changes
            </Button>
            {saved && (
              <span className="flex items-center gap-1 text-sm text-emerald-600">
                <CheckCircle2 className="size-4" />
                Saved
              </span>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/bookings/renter`,
          {
            withCredentials: true,
          }
        );

        const bookings = response.data.bookings || [];

        const generatedNotifications = [];

        bookings.forEach((booking) => {
          const car = booking.car;

          const carName = car
            ? `${car.brand} ${car.model}`
            : "Your car";

          // Booking status notification
          if (booking.status === "Pending") {
            generatedNotifications.push({
              id: `${booking._id}-pending`,
              icon: Clock3,
              title: "Booking request sent",
              body: `Your booking request for ${carName} is waiting for the owner's confirmation.`,
              time: getRelativeTime(booking.createdAt),
              color: "text-amber-600",
            });
          }

          if (booking.status === "Confirmed") {
            generatedNotifications.push({
              id: `${booking._id}-confirmed`,
              icon: CheckCircle2,
              title: "Booking confirmed",
              body: `Your ${carName} reservation has been confirmed by the owner.`,
              time: getRelativeTime(
                booking.updatedAt || booking.createdAt
              ),
              color: "text-emerald-600",
            });
          }

          if (booking.status === "Rejected") {
            generatedNotifications.push({
              id: `${booking._id}-rejected`,
              icon: XCircle,
              title: "Booking rejected",
              body: `Your booking request for ${carName} was rejected by the owner.`,
              time: getRelativeTime(
                booking.updatedAt || booking.createdAt
              ),
              color: "text-red-600",
            });
          }

          // Pickup reminder
          if (booking.status === "Confirmed" && booking.pickupDate) {
            const pickupDate = new Date(
              booking.pickupDate
            );

            const now = new Date();

            const difference =
              pickupDate.getTime() - now.getTime();

            const hours =
              difference / (1000 * 60 * 60);

            if (hours > 0 && hours <= 48) {
              generatedNotifications.push({
                id: `${booking._id}-pickup`,
                icon: CalendarDays,
                title: "Pickup reminder",
                body: `Your pickup for ${carName} is ${
                  hours <= 24
                    ? "tomorrow"
                    : "within the next 48 hours"
                }.`,
                time: formatDateTime(pickupDate),
                color: "text-primary",
              });
            }
          }
        });

        // Newest notifications first
        generatedNotifications.sort((a, b) => {
          return b.id.localeCompare(a.id);
        });

        setNotifications(generatedNotifications);
      } catch (error) {
        console.error(
          "Failed to fetch notifications:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-14">
        <span className="text-sm font-semibold uppercase tracking-wide text-primary">
          Updates
        </span>

        <h1 className="mt-2 font-display text-4xl font-extrabold text-secondary">
          Notifications
        </h1>

        <div className="mt-10 rounded-2xl border border-border bg-card p-10 text-center">
          <p className="text-sm text-muted-foreground">
            Loading notifications...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-14">
      <span className="text-sm font-semibold uppercase tracking-wide text-primary">
        Updates
      </span>

      <h1 className="mt-2 font-display text-4xl font-extrabold text-secondary">
        Notifications
      </h1>

      {notifications.length > 0 ? (
        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
          {notifications.map(
            ({
              id,
              icon: Icon,
              title,
              body,
              time,
              color,
            }) => (
              <div
                key={id}
                className="flex gap-4 p-5"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Icon
                    className={`size-5 ${color}`}
                  />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-secondary">
                    {title}
                  </p>

                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </div>

                <span className="whitespace-nowrap text-xs text-muted-foreground">
                  {time}
                </span>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-card p-16 text-center">
          <Clock3 className="mx-auto size-10 text-muted-foreground" />

          <p className="mt-4 font-medium text-secondary">
            No notifications yet
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Your booking updates and reminders will appear here.
          </p>
        </div>
      )}
    </main>
  );
}

function getRelativeTime(date) {
  if (!date) {
    return "Recently";
  }

  const created = new Date(date);
  const now = new Date();

  const difference =
    now.getTime() - created.getTime();

  const minutes = Math.floor(
    difference / (1000 * 60)
  );

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} ${
      minutes === 1 ? "minute" : "minutes"
    } ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} ${
      hours === 1 ? "hour" : "hours"
    } ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days} ${
      days === 1 ? "day" : "days"
    } ago`;
  }

  return created.toLocaleDateString(
    "en-IN"
  );
}

function formatDateTime(date) {
  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

export { BookingsPage, NotificationsPage, ProfilePage, WishlistPage };
