import { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle2 } from "lucide-react";

import PageHeader from "./common/PageHeader";

function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/bookings/owner`,
        {
          withCredentials: true,
        }
      );

      const pending = (res.data.bookings || []).filter(
        (booking) => booking.status === "Pending"
      );

      setRequests(pending);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateBooking = async (bookingId, status) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/bookings/${bookingId}/status`,
        {
          status,
        },
        {
          withCredentials: true,
        }
      );

      setRequests((current) =>
        current.filter(
          (booking) => booking._id !== bookingId
        )
      );
    } catch (error) {
      console.error("Failed to update booking:", error);
    }
  };

  if (loading) {
    return (
      <>
        <PageHeader
          title="Booking Requests"
          description="Review and respond to incoming rental requests."
        />

        <p className="mt-6 text-sm text-slate-500">
          Loading requests...
        </p>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Booking Requests"
        description="Review and respond to incoming rental requests."
      />

      <div className="space-y-4">
        {requests.map((booking) => {
          const renter = booking.renter;
          const car = booking.car;

          const renterName =
            `${renter?.firstName || ""} ${renter?.lastName || ""}`.trim();

          return (
            <div
              key={booking._id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                    {renterName
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {renterName}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {car?.brand} {car?.model}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {new Date(
                        booking.pickupDate
                      ).toLocaleDateString()}{" "}
                      -{" "}
                      {new Date(
                        booking.returnDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-bold">
                    ₹{booking.total}
                  </p>

                  <button
                    onClick={() =>
                      updateBooking(
                        booking._id,
                        "Confirmed"
                      )
                    }
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      updateBooking(
                        booking._id,
                        "Rejected"
                      )
                    }
                    className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {requests.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />

            <h3 className="mt-4 font-semibold">
              No pending requests
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              You're all caught up.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default RequestsPage;