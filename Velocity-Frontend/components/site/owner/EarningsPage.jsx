import {
  Wallet,
  TrendingUp,
  Clock3,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

import { useEffect, useState } from "react";
import axios from "axios";

import PageHeader from "./common/PageHeader";
import StatCard from "./common/StatCard";

function EarningsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/bookings/owner`,
        {
          withCredentials: true,
        }
      );

      setBookings(response.data.bookings || []);
    } catch (error) {
      console.log("Failed to fetch owner bookings:", error);

      setError(
        error.response?.data?.msg ||
          "Failed to load earnings"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  /*
    Only Confirmed and Completed bookings
    are treated as actual earnings.
  */
  const completedBookings = bookings.filter(
    (booking) =>
      booking.status === "Confirmed" ||
      booking.status === "Completed"
  );

  /*
    Pending bookings
  */
  const pendingBookings = bookings.filter(
    (booking) => booking.status === "Pending"
  );

  /*
    Current date
  */
  const now = new Date();

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  /*
    This month's earnings
  */
  const thisMonth = completedBookings
    .filter((booking) => {
      const date = new Date(booking.createdAt);

      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    })
    .reduce(
      (total, booking) =>
        total + Number(booking.subtotal || 0),
      0
    );

  /*
    This year's earnings
  */
  const thisYear = completedBookings
    .filter((booking) => {
      const date = new Date(booking.createdAt);

      return date.getFullYear() === currentYear;
    })
    .reduce(
      (total, booking) =>
        total + Number(booking.subtotal || 0),
      0
    );

  /*
    Pending payout
  */
  const pendingPayout = pendingBookings.reduce(
    (total, booking) =>
      total + Number(booking.subtotal || 0),
    0
  );

  /*
    Monthly earnings
  */
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyEarnings = monthNames.map(
    (month, index) => {
      const amount = completedBookings
        .filter((booking) => {
          const date = new Date(booking.createdAt);

          return (
            date.getMonth() === index &&
            date.getFullYear() === currentYear
          );
        })
        .reduce(
          (total, booking) =>
            total + Number(booking.subtotal || 0),
          0
        );

      return {
        month,
        amount,
      };
    }
  );

  const maxEarning = Math.max(
    ...monthlyEarnings.map(
      (item) => item.amount
    ),
    1
  );

  /*
    Recent bookings
  */
  const recentBookings = [...bookings]
    .filter(
      (booking) =>
        booking.status !== "Rejected" &&
        booking.status !== "Cancelled"
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  /*
    Currency formatter
  */
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  /*
    Loading state
  */
  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Earnings"
          description="Track your rental income and financial performance."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-32 animate-pulse rounded-2xl bg-slate-100"
            />
          ))}
        </div>

        <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Earnings"
        description="Track your rental income and financial performance."
      />

      {/* Error */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Stats */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="This Month"
          value={formatCurrency(thisMonth)}
          description="Confirmed & completed bookings"
          icon={Wallet}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />

        <StatCard
          title="This Year"
          value={formatCurrency(thisYear)}
          description="Total rental earnings"
          icon={TrendingUp}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Pending Payout"
          value={formatCurrency(pendingPayout)}
          description="Pending booking earnings"
          icon={Clock3}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
      </div>

      {/* Monthly Earnings */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Monthly Earnings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your actual rental earnings for{" "}
              {currentYear}.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600">
            <CalendarDays size={16} />

            <span>{currentYear}</span>
          </div>
        </div>

        {/* Chart */}

        <div className="mt-8">
          <div className="flex h-72 items-end gap-2 sm:gap-4">
            {monthlyEarnings.map((item) => {
              const height =
                item.amount > 0
                  ? (item.amount / maxEarning) * 100
                  : 2;

              return (
                <div
                  key={item.month}
                  className="group flex h-full flex-1 flex-col justify-end"
                >
                  {/* Amount */}

                  {item.amount > 0 && (
                    <div className="mb-2 text-center text-xs font-medium text-slate-500 opacity-0 transition group-hover:opacity-100">
                      {formatCurrency(item.amount)}
                    </div>
                  )}

                  {/* Bar */}

                  <div
                    className="w-full rounded-t-lg bg-blue-100 transition-all duration-300 group-hover:bg-blue-500"
                    style={{
                      height: `${height}%`,
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Month labels */}

          <div className="mt-3 flex gap-2 sm:gap-4">
            {monthlyEarnings.map((item) => (
              <div
                key={item.month}
                className="flex-1 text-center text-xs font-medium text-slate-400"
              >
                {item.month}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Earnings */}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Recent Earnings
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest rental bookings.
          </p>
        </div>

        {recentBookings.length === 0 ? (
          <div className="p-10 text-center">
            <Wallet
              size={40}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 font-medium text-slate-600">
              No bookings yet
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Your rental earnings will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentBookings.map((booking) => (
              <div
                key={booking._id}
                className="flex items-center justify-between gap-4 p-5"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-slate-900">
                    {booking.car
                      ? `${booking.car.brand} ${booking.car.model}`
                      : "Car"}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {new Date(
                      booking.createdAt
                    ).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}

                    {" • "}

                    {booking.days}{" "}
                    {booking.days === 1
                      ? "day"
                      : "days"}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p
                    className={`font-semibold ${
                      booking.status === "Pending"
                        ? "text-amber-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {formatCurrency(
                      booking.subtotal
                    )}
                  </p>

                  <p className="mt-1 flex items-center justify-end gap-1 text-xs text-slate-400">
                    {booking.status ===
                    "Pending" ? (
                      <>
                        <Clock3 size={12} />
                        Pending
                      </>
                    ) : (
                      <>
                        <ArrowUpRight size={12} />
                        {booking.status}
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EarningsPage;