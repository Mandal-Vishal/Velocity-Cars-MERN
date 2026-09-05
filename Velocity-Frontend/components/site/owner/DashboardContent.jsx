import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Car,
  CalendarCheck,
  Wallet,
  ClipboardList,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import axios from "axios";

import StatCard from "./common/StatCard";
import QuickAction from "./common/QuickAction";
import BookingTable from "./common/BookingTable";

function DashboardContent({ user, onAddCar }) {
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [loadingCars, setLoadingCars] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const bookingTabs = [
    "All",
    "Pending",
    "Confirmed",
    "Rejected",
    "Cancelled",
    "Completed",
  ];

  // FETCH OWNER CARS
  const fetchCars = async () => {
    try {
      setLoadingCars(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/cars`,
        {
          withCredentials: true,
        }
      );

      setCars(response.data.cars || []);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
      setCars([]);
    } finally {
      setLoadingCars(false);
    }
  };

  // FETCH OWNER BOOKINGS
  const fetchBookings = async () => {
    try {
      setLoadingBookings(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/bookings/owner`,
        {
          withCredentials: true,
        }
      );

      setBookings(response.data.bookings || []);
    } catch (error) {
      console.error("Failed to fetch owner bookings:", error);
      setBookings([]);
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    fetchCars();
    fetchBookings();
  }, []);

  // CAR STATISTICS
  const availableCars = useMemo(() => {
    return cars.filter((car) => car.available).length;
  }, [cars]);

  const rentedCars = useMemo(() => {
    const today = new Date();
    const activeCarIds = new Set();

    bookings.forEach((booking) => {
      if (
        booking.status !== "Confirmed" ||
        !booking.car?._id
      ) {
        return;
      }

      const pickup = new Date(booking.pickupDate);
      const returnDate = new Date(booking.returnDate);

      if (today >= pickup && today <= returnDate) {
        activeCarIds.add(booking.car._id.toString());
      }
    });

    return activeCarIds.size;
  }, [bookings]);

  // Car model doesn't have a maintenance field.
  const maintenanceCars = 0;

  // BOOKING STATISTICS
  const activeBookings = useMemo(() => {
    return bookings.filter(
      (booking) => booking.status === "Confirmed"
    ).length;
  }, [bookings]);

  const pendingRequests = useMemo(() => {
    return bookings.filter(
      (booking) => booking.status === "Pending"
    ).length;
  }, [bookings]);

  // MONTHLY EARNINGS
  // Uses booking.subtotal
  const monthlyEarnings = useMemo(() => {
    const now = new Date();

    return bookings
      .filter((booking) => {
        if (booking.status !== "Confirmed") {
          return false;
        }

        const bookingDate = new Date(
          booking.updatedAt || booking.createdAt
        );

        return (
          bookingDate.getMonth() === now.getMonth() &&
          bookingDate.getFullYear() === now.getFullYear()
        );
      })
      .reduce(
        (total, booking) =>
          total + Number(booking.subtotal || 0),
        0
      );
  }, [bookings]);

  // STATUS STYLE
  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return "border-emerald-200 bg-emerald-50 text-emerald-700";

      case "Pending":
        return "border-amber-200 bg-amber-50 text-amber-700";

      case "Rejected":
        return "border-red-200 bg-red-50 text-red-700";

      case "Cancelled":
        return "border-slate-200 bg-slate-100 text-slate-600";

      case "Completed":
        return "border-blue-200 bg-blue-50 text-blue-700";

      default:
        return "border-slate-200 bg-slate-50 text-slate-600";
    }
  };

  // FILTER BOOKINGS
  const filteredBookings = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const renterName =
        `${booking.renter?.firstName || ""} ${
          booking.renter?.lastName || ""
        }`.trim();

      const carName =
        `${booking.car?.brand || ""} ${
          booking.car?.model || ""
        }`.trim();

      const bookingId = booking._id || "";

      const matchesSearch =
        !searchValue ||
        renterName.toLowerCase().includes(searchValue) ||
        carName.toLowerCase().includes(searchValue) ||
        bookingId.toLowerCase().includes(searchValue);

      const matchesTab =
        activeTab === "All" ||
        booking.status === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [bookings, search, activeTab]);

  // RECENT BOOKINGS
  const recentBookings = useMemo(() => {
    return [...filteredBookings]
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .slice(0, 5);
  }, [filteredBookings]);

  // MONTHLY CHART
  // Uses booking.subtotal instead of booking.total
  const monthlyChart = useMemo(() => {
    const now = new Date();
    const values = [];

    for (let i = 11; i >= 0; i--) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - i,
        1
      );

      const month = date.getMonth();
      const year = date.getFullYear();

      const amount = bookings
        .filter((booking) => {
          if (booking.status !== "Confirmed") {
            return false;
          }

          const bookingDate = new Date(
            booking.updatedAt || booking.createdAt
          );

          return (
            bookingDate.getMonth() === month &&
            bookingDate.getFullYear() === year
          );
        })
        .reduce(
          (total, booking) =>
            total + Number(booking.subtotal || 0),
          0
        );

      values.push({
        month: date.toLocaleDateString("en-IN", {
          month: "short",
        }),
        amount,
      });
    }

    const max = Math.max(
      ...values.map((item) => item.amount),
      1
    );

    return values.map((item) => ({
      ...item,
      height:
        item.amount === 0
          ? 0
          : Math.max(
              (item.amount / max) * 100,
              5
            ),
    }));
  }, [bookings]);

  return (
    <>
      {/* HEADER */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-sm font-medium text-blue-600">
            Overview
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back,{" "}
            {user?.firstName || "Owner"}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Here's what's happening with your cars today.
          </p>
        </div>

        <button
          onClick={onAddCar}
          className="flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add New Car
        </button>
      </div>

      {/* STAT CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Cars"
          value={loadingCars ? "..." : cars.length}
          description={
            loadingCars
              ? "Loading..."
              : `${availableCars} currently available`
          }
          icon={Car}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Active Bookings"
          value={
            loadingBookings
              ? "..."
              : activeBookings
          }
          description="Confirmed bookings"
          icon={CalendarCheck}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />

        <StatCard
          title="Monthly Earnings"
          value={`₹${monthlyEarnings.toLocaleString(
            "en-IN"
          )}`}
          description="Confirmed bookings this month"
          icon={Wallet}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />

        <StatCard
          title="Pending Requests"
          value={
            loadingBookings
              ? "..."
              : pendingRequests
          }
          description={
            pendingRequests > 0
              ? "Requires your attention"
              : "You're all caught up"
          }
          icon={ClipboardList}
          iconBg="bg-violet-50"
          iconColor="text-violet-600"
        />
      </div>

      {/* EARNINGS + AVAILABILITY */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        {/* EARNINGS */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Earnings Overview
              </p>

              <div className="mt-1 flex items-center gap-3">
                <h2 className="text-2xl font-bold">
                  ₹
                  {monthlyEarnings.toLocaleString(
                    "en-IN"
                  )}
                </h2>

                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  This month
                </span>
              </div>
            </div>
          </div>

          <div className="relative mt-8 h-[220px]">
            <div className="absolute inset-0 flex flex-col justify-between">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="border-t border-dashed border-slate-200"
                />
              ))}
            </div>

            <div className="absolute inset-0 flex items-end gap-2 px-1 sm:gap-3">
              {monthlyChart.map((item) => (
                <div
                  key={`${item.month}-${item.amount}`}
                  className="group relative flex flex-1 flex-col justify-end"
                >
                  <div
                    style={{
                      height: `${item.height}%`,
                    }}
                    className="rounded-t-lg bg-blue-500 transition hover:bg-blue-600"
                    title={`₹${item.amount.toLocaleString(
                      "en-IN"
                    )}`}
                  />

                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400">
                    {item.month}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AVAILABILITY */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Car Availability
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                {cars.length} Cars
              </h2>
            </div>

            <Car className="h-6 w-6 text-blue-600" />
          </div>

          <div className="mt-6 space-y-5">
            <AvailabilityRow
              label="Available"
              value={availableCars}
              total={cars.length}
              className="bg-emerald-500"
            />

            <AvailabilityRow
              label="Rented"
              value={rentedCars}
              total={cars.length}
              className="bg-blue-500"
            />

            <AvailabilityRow
              label="Maintenance"
              value={maintenanceCars}
              total={cars.length}
              className="bg-amber-500"
            />
          </div>
        </div>
      </div>

      {/* RECENT BOOKINGS */}
      <div className="mt-6">
        {loadingBookings ? (
          <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 shadow-sm">
            <Loader2 className="h-6 w-6 animate-spin text-slate-400" />

            <span className="ml-2 text-sm text-slate-500">
              Loading bookings...
            </span>
          </div>
        ) : (
          <BookingTable
            bookings={recentBookings}
            search={search}
            setSearch={setSearch}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            bookingTabs={bookingTabs}
            getStatusStyle={getStatusStyle}
          />
        )}
      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <QuickAction
          icon={Plus}
          title="Add Car"
          description="List a new vehicle"
          onClick={onAddCar}
        />

        <QuickAction
          icon={CalendarCheck}
          title="Bookings"
          description="Manage reservations"
        />

        <QuickAction
          icon={Wallet}
          title="Earnings"
          description="View your earnings"
        />
      </div>
    </>
  );
}

function AvailabilityRow({
  label,
  value,
  total,
  className,
}) {
  const percentage =
    total > 0
      ? (value / total) * 100
      : 0;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-slate-500">
          {label}
        </span>

        <span className="font-semibold">
          {value}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${className}`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

export default DashboardContent;