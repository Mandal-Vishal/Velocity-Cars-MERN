import { useEffect, useState } from "react";
import axios from "axios";

import PageHeader from "./common/PageHeader";
import BookingTable from "./common/BookingTable";

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/bookings/owner`,
        {
          withCredentials: true,
        }
      );

      console.log("Owner bookings:", response.data);

      setBookings(response.data.bookings || []);
    } catch (error) {
      console.error(
        "Failed to fetch owner bookings:",
        error
      );

      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <>
        <PageHeader
          title="Bookings"
          description="View and manage all your rental bookings."
        />

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <p className="text-sm text-slate-500">
            Loading bookings...
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Bookings"
        description="View and manage all your rental bookings."
      />

      <BookingTable
        bookings={bookings}
        search={search}
        setSearch={setSearch}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookingTabs={bookingTabs}
        getStatusStyle={getStatusStyle}
      />
    </>
  );
}

export default BookingsPage;
