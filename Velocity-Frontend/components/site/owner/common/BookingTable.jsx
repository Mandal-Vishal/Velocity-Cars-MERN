import { useState } from "react";
import {
  CalendarDays,
  Search,
  Eye,
  MapPin,
  X,
} from "lucide-react";

function BookingTable({
  bookings,
  activeTab,
  setActiveTab,
  bookingTabs,
  search,
  setSearch,
  getStatusStyle,
}) {
  const [selectedBooking, setSelectedBooking] = useState(null);

  const filteredBookings = bookings.filter((booking) => {
    const renterName =
      `${booking.renter?.firstName || ""} ${
        booking.renter?.lastName || ""
      }`.trim();

    const carName =
      `${booking.car?.brand || ""} ${
        booking.car?.model || ""
      }`.trim();

    const bookingId = booking._id || "";

    const searchValue = search.trim().toLowerCase();

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

  const getRenterName = (booking) => {
    const firstName = booking.renter?.firstName || "";
    const lastName = booking.renter?.lastName || "";

    return `${firstName} ${lastName}`.trim() || "Unknown renter";
  };

  const getInitials = (booking) => {
    const name = getRenterName(booking);

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getCarName = (booking) => {
    const brand = booking.car?.brand || "";
    const model = booking.car?.model || "";

    return `${brand} ${model}`.trim() || "Unknown car";
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getDateRange = (booking) => {
    return `${formatDate(booking.pickupDate)} - ${formatDate(
      booking.returnDate
    )}`;
  };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* HEADER */}
        <div className="border-b border-slate-200 p-5 sm:p-6">
          <h2 className="text-lg font-bold">
            Recent Bookings
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Track and manage your latest rental activity.
          </p>

          {/* TABS */}
          <div className="mt-6 flex gap-1 overflow-x-auto border-b border-slate-100">
            {bookingTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  whitespace-nowrap border-b-2
                  px-4 pb-3 text-sm font-medium
                  transition
                  ${
                    activeTab === tab
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* SEARCH */}
        <div className="border-b border-slate-100 p-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search renter, car or booking..."
              className="
                h-10 w-full rounded-lg
                border border-slate-200
                bg-slate-50 pl-9 pr-3
                text-sm outline-none
                focus:border-blue-500
                focus:bg-white
                focus:ring-2 focus:ring-blue-100
              "
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                <th className="px-6 py-4">
                  Renter
                </th>

                <th className="px-6 py-4">
                  Vehicle
                </th>

                <th className="px-6 py-4">
                  Dates
                </th>

                <th className="px-6 py-4">
                  Amount
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4 text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >
                  {/* RENTER */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                        {getInitials(booking)}
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          {getRenterName(booking)}
                        </p>

                        <p className="max-w-[180px] truncate text-xs text-slate-400">
                          {booking._id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* VEHICLE */}
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold">
                      {getCarName(booking)}
                    </p>

                    <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                      <MapPin className="h-3 w-3" />

                      {booking.pickupLocation ||
                        booking.car?.location ||
                        "Location unavailable"}
                    </div>
                  </td>

                  {/* DATES */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <CalendarDays className="h-4 w-4 text-slate-400" />

                      {getDateRange(booking)}
                    </div>
                  </td>

                  {/* AMOUNT */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold">
                      ₹{Number(booking.total || 0).toLocaleString("en-IN")}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span
                      className={`
                        inline-flex rounded-full border
                        px-2.5 py-1 text-xs font-semibold
                        ${getStatusStyle(booking.status)}
                      `}
                    >
                      {booking.status}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedBooking(booking)
                        }
                        className="
                          rounded-lg
                          border border-slate-200
                          p-2
                          text-slate-500
                          transition
                          hover:border-blue-200
                          hover:bg-blue-50
                          hover:text-blue-600
                        "
                        aria-label="View booking details"
                        title="View booking details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBookings.length === 0 && (
            <div className="px-6 py-12 text-center">
              <Search className="mx-auto h-8 w-8 text-slate-300" />

              <p className="mt-3 text-sm font-medium">
                No bookings found
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Try another search or filter.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ================================================= */}
      {/* BOOKING DETAILS MODAL */}
      {/* ================================================= */}

      {selectedBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="text-xl font-bold">
                  Booking Details
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  {selectedBooking._id}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="
                  rounded-full
                  p-2
                  text-slate-400
                  transition
                  hover:bg-slate-100
                  hover:text-slate-700
                "
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div className="space-y-6 p-6">
              {/* VEHICLE */}
              <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
                {selectedBooking.car?.image ? (
                  <img
                    src={selectedBooking.car.image}
                    alt={getCarName(selectedBooking)}
                    className="h-20 w-28 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-28 items-center justify-center rounded-lg bg-slate-200">
                    <span className="text-xs text-slate-500">
                      No image
                    </span>
                  </div>
                )}

                <div>
                  <p className="text-xs text-slate-400">
                    Vehicle
                  </p>

                  <h3 className="mt-1 text-lg font-bold">
                    {getCarName(selectedBooking)}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {selectedBooking.car?.location || "Location unavailable"}
                  </p>
                </div>
              </div>

              {/* RENTER */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-900">
                  Renter Information
                </h3>

                <div className="grid gap-4 rounded-xl border border-slate-200 p-4 sm:grid-cols-2">
                  <Detail
                    label="Name"
                    value={getRenterName(selectedBooking)}
                  />

                  <Detail
                    label="Email"
                    value={
                      selectedBooking.renter?.email ||
                      selectedBooking.email ||
                      "-"
                    }
                  />

                  <Detail
                    label="Phone"
                    value={
                      selectedBooking.renter?.phone ||
                      selectedBooking.phone ||
                      "-"
                    }
                  />

                  <Detail
                    label="Driver's License"
                    value={
                      selectedBooking.license || "-"
                    }
                  />
                </div>
              </div>

              {/* TRIP DETAILS */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-900">
                  Trip Details
                </h3>

                <div className="grid gap-4 rounded-xl border border-slate-200 p-4 sm:grid-cols-2">
                  <Detail
                    label="Pickup"
                    value={`${formatDate(
                      selectedBooking.pickupDate
                    )} · ${
                      selectedBooking.pickupLocation || "-"
                    }`}
                  />

                  <Detail
                    label="Return"
                    value={`${formatDate(
                      selectedBooking.returnDate
                    )} · ${
                      selectedBooking.dropLocation || "-"
                    }`}
                  />

                  <Detail
                    label="Rental Duration"
                    value={`${selectedBooking.days || 0} days`}
                  />

                  <Detail
                    label="Payment Method"
                    value={
                      selectedBooking.paymentMethod || "-"
                    }
                  />
                </div>
              </div>

              {/* PAYMENT */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-900">
                  Payment Summary
                </h3>

                <div className="space-y-3 rounded-xl border border-slate-200 p-4">
                  <SummaryRow
                    label="Subtotal"
                    value={selectedBooking.subtotal}
                  />

                  <SummaryRow
                    label="Service Fee"
                    value={selectedBooking.serviceFee}
                  />

                  <SummaryRow
                    label="Insurance"
                    value={selectedBooking.insurance}
                  />

                  <SummaryRow
                    label="Additional Driver"
                    value={selectedBooking.additionalDriver}
                  />

                  <SummaryRow
                    label="Taxes"
                    value={selectedBooking.taxes}
                  />

                  <div className="border-t border-slate-200 pt-3">
                    <SummaryRow
                      label="Total"
                      value={selectedBooking.total}
                      bold
                    />
                  </div>
                </div>
              </div>

              {/* STATUS */}
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <span className="text-sm font-medium text-slate-600">
                  Booking Status
                </span>

                <span
                  className={`
                    inline-flex rounded-full border
                    px-3 py-1.5 text-xs font-semibold
                    ${getStatusStyle(
                      selectedBooking.status
                    )}
                  `}
                >
                  {selectedBooking.status}
                </span>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="flex justify-end border-t border-slate-200 p-5">
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="
                  rounded-lg
                  bg-slate-900
                  px-5 py-2.5
                  text-sm font-semibold
                  text-white
                  transition
                  hover:bg-slate-800
                "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-800">
        {value || "-"}
      </p>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  bold = false,
}) {
  return (
    <div className="flex justify-between gap-4">
      <span
        className={
          bold
            ? "font-semibold text-slate-900"
            : "text-sm text-slate-500"
        }
      >
        {label}
      </span>

      <span
        className={
          bold
            ? "font-bold text-slate-900"
            : "text-sm font-medium text-slate-800"
        }
      >
        ₹
        {Number(value || 0).toLocaleString("en-IN")}
      </span>
    </div>
  );
}

export default BookingTable;