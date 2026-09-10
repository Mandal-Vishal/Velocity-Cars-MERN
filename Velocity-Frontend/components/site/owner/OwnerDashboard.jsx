import { useContext, useEffect, useState } from "react";
import axios from "axios";

import {
  LayoutDashboard,
  Car,
  CalendarDays,
  ClipboardList,
  Wallet,
  Star,
  MessageSquare,
  User,
  Settings,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Bell,
} from "lucide-react";

import { AuthContext } from "@/src/context/AuthContext";

import DashboardContent from "./DashboardContent";
import MyCars from "./MyCarsPage";
import BookingsPage from "./BookingsPage";
import RequestsPage from "./RequestsPage";
import EarningsPage from "./EarningsPage";
import OwnerProfile from "./OwnerProfile";
import SettingsPage from "./SettingsPage";
import AddCarModal from "./AddCarModal";

function OwnerDashboard() {
  const { user } = useContext(AuthContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const [showAddCar, setShowAddCar] = useState(false);

  // --------------------------------------------------
  // CARS
  // --------------------------------------------------

  const [cars, setCars] = useState([]);
  const [carsLoading, setCarsLoading] = useState(true);

  // Fetch cars when OwnerDashboard loads
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setCarsLoading(true);

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/cars`,
          {
            withCredentials: true,
          }
        );

        setCars(response.data.cars || []);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      } finally {
        setCarsLoading(false);
      }
    };

    fetchCars();
  }, []);

  // --------------------------------------------------
  // ADD CAR
  // --------------------------------------------------

  const handleCarAdded = (newCar) => {
    // Add newly created car to existing state
    setCars((currentCars) => [newCar, ...currentCars]);

    // Close modal
    setShowAddCar(false);
  };

  // --------------------------------------------------
  // DELETE CAR
  // --------------------------------------------------

  const handleCarDeleted = (carId) => {
    setCars((currentCars) =>
      currentCars.filter((car) => car._id !== carId)
    );
  };

  // --------------------------------------------------
  // SIDEBAR MENU
  // --------------------------------------------------

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "My Cars",
      icon: Car,
    },
    {
      label: "Bookings",
      icon: CalendarDays,
    },
    {
      label: "Requests",
      icon: ClipboardList,
    },
    {
      label: "Earnings",
      icon: Wallet,
    }
  ];

  const bottomMenu = [
    {
      label: "Profile",
      icon: User,
    },
    {
      label: "Settings",
      icon: Settings,
    },
  ];

  const bookingTabs = [
    "All",
    "Ongoing",
    "Upcoming",
    "Completed",
    "Cancelled",
  ];

  // --------------------------------------------------
  // FILTER BOOKINGS
  // --------------------------------------------------

  const filteredBookings = bookings.filter((booking) => {
    const matchesTab =
      activeTab === "All" || booking.status === activeTab;

    const searchValue = search.toLowerCase();

    const matchesSearch =
      booking.renter.toLowerCase().includes(searchValue) ||
      booking.car.toLowerCase().includes(searchValue) ||
      booking.id.toLowerCase().includes(searchValue);

    return matchesTab && matchesSearch;
  });

  // --------------------------------------------------
  // MENU
  // --------------------------------------------------

  const handleMenuClick = (label) => {
    setActiveMenu(label);
    setSidebarOpen(false);
  };

  // --------------------------------------------------
  // BOOKING STATUS STYLE
  // --------------------------------------------------

  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";

      case "Ongoing":
        return "bg-blue-50 text-blue-700 border-blue-100";

      case "Upcoming":
        return "bg-violet-50 text-violet-700 border-violet-100";

      case "Completed":
        return "bg-slate-100 text-slate-700 border-slate-200";

      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-100";

      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  // --------------------------------------------------
  // CAR STATISTICS
  // --------------------------------------------------

  const availableCars = cars.filter(
    (car) => car.status === "Available"
  ).length;

  const rentedCars = cars.filter(
    (car) => car.status === "Rented"
  ).length;

  const maintenanceCars = cars.filter(
    (car) => car.status === "Maintenance"
  ).length;

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-900">

      {/* MOBILE SIDEBAR OVERLAY */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen
          flex-col bg-[#071a33] text-white
          transition-all duration-300

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0

          ${sidebarCollapsed ? "lg:w-[82px]" : "lg:w-[250px]"}

          w-[250px]
        `}
      >

        {/* LOGO */}

        <div
          className={`
            flex h-20 items-center border-b border-white/10

            ${
              sidebarCollapsed
                ? "justify-center px-3"
                : "justify-between px-6"
            }
          `}
        >

          <div
            className={`
              flex items-center

              ${
                sidebarCollapsed
                  ? "justify-center"
                  : "gap-3"
              }
            `}
          >

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600">
              <Car className="h-5 w-5" />
            </div>

            {!sidebarCollapsed && (
              <div>
                <h1 className="text-lg font-bold">
                  Velocity
                </h1>

                <p className="text-[10px] uppercase tracking-[0.2em] text-blue-300">
                  Owner Portal
                </p>
              </div>
            )}

          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* COLLAPSE BUTTON */}

        <button
          onClick={() =>
            setSidebarCollapsed(
              (current) => !current
            )
          }
          className="
            absolute -right-3 top-[76px]
            hidden h-7 w-7 items-center justify-center
            rounded-full border border-slate-200
            bg-white text-slate-700 shadow-md
            transition hover:bg-slate-50
            lg:flex
          "
          title={
            sidebarCollapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>

        {/* SIDEBAR MENU */}

        <div className="flex-1 overflow-y-auto px-3 py-6">

          {!sidebarCollapsed && (
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Main Menu
            </p>
          )}

          <nav className="space-y-1">

            {menuItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                activeMenu === item.label;

              return (
                <button
                  key={item.label}
                  onClick={() =>
                    handleMenuClick(item.label)
                  }
                  title={
                    sidebarCollapsed
                      ? item.label
                      : undefined
                  }
                  className={`
                    group flex w-full items-center
                    rounded-xl py-3
                    text-sm font-medium
                    transition-all duration-200

                    ${
                      sidebarCollapsed
                        ? "justify-center px-2"
                        : "gap-3 px-3"
                    }

                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >

                  <Icon className="h-[18px] w-[18px] shrink-0" />

                  {!sidebarCollapsed && (
                    <span>{item.label}</span>
                  )}

                  {!sidebarCollapsed &&
                    item.badge && (
                      <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-500 px-1.5 text-[10px] font-bold">
                        {item.badge}
                      </span>
                    )}

                </button>
              );
            })}

          </nav>

          {!sidebarCollapsed && (
            <p className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Account
            </p>
          )}

          <nav className="space-y-1">

            {bottomMenu.map((item) => {
              const Icon = item.icon;

              const isActive =
                activeMenu === item.label;

              return (
                <button
                  key={item.label}
                  onClick={() =>
                    handleMenuClick(item.label)
                  }
                  title={
                    sidebarCollapsed
                      ? item.label
                      : undefined
                  }
                  className={`
                    group flex w-full items-center
                    rounded-xl py-3
                    text-sm font-medium
                    transition

                    ${
                      sidebarCollapsed
                        ? "justify-center px-2"
                        : "gap-3 px-3"
                    }

                    ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >

                  <Icon className="h-[18px] w-[18px] shrink-0" />

                  {!sidebarCollapsed && (
                    <span>{item.label}</span>
                  )}

                </button>
              );
            })}

          </nav>

        </div>

        {/* SIDEBAR USER */}

        <div className="border-t border-white/10 p-3">

          <div
            className={`
              flex items-center rounded-xl
              border border-white/10 bg-white/5

              ${
                sidebarCollapsed
                  ? "justify-center p-2"
                  : "gap-3 p-3"
              }
            `}
          >

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold">
              {user?.firstName?.[0] || "O"}
              {user?.lastName?.[0] || ""}
            </div>

            {!sidebarCollapsed && (
              <>
                <div className="min-w-0 flex-1">

                  <p className="truncate text-sm font-semibold">
                    {user?.firstName || "Owner"}{" "}
                    {user?.lastName || ""}
                  </p>

                  <p className="text-xs text-slate-400">
                    Vehicle Owner
                  </p>

                </div>

                <ChevronDown className="h-4 w-4 text-slate-400" />
              </>
            )}

          </div>

        </div>

      </aside>

      {/* MAIN */}

      <main
        className={`
          transition-all duration-300

          ${
            sidebarCollapsed
              ? "lg:ml-[82px]"
              : "lg:ml-[250px]"
          }
        `}
      >

        {/* HEADER */}

        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md sm:px-6 lg:px-8">

          <div className="flex items-center gap-3">

            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div>

              <p className="text-sm font-medium text-slate-500">
                Owner Portal
              </p>

              <h2 className="font-semibold">
                {activeMenu}
              </h2>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <button className="relative rounded-xl border border-slate-200 bg-white p-2.5 transition hover:bg-slate-50">

              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />

            </button>

            <div className="hidden h-8 w-px bg-slate-200 sm:block" />

            <div className="hidden items-center gap-2 sm:flex">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                {user?.firstName?.[0] || "O"}
                {user?.lastName?.[0] || ""}
              </div>

              <div>

                <p className="text-sm font-semibold">
                  {user?.firstName || "Owner"}
                </p>

                <p className="text-[11px] text-slate-500">
                  Vehicle Owner
                </p>

              </div>

            </div>

          </div>

        </header>

        {/* PAGE CONTENT */}

        <div className="px-4 py-8 sm:px-6 lg:px-8">

          {/* DASHBOARD */}

          {activeMenu === "Dashboard" && (
            <DashboardContent
              user={user}
              bookings={bookings}
              filteredBookings={filteredBookings}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              bookingTabs={bookingTabs}
              search={search}
              setSearch={setSearch}
              getStatusStyle={getStatusStyle}

              cars={cars}
              availableCars={availableCars}
              rentedCars={rentedCars}
              maintenanceCars={maintenanceCars}

              carsLoading={carsLoading}

              onAddCar={() =>
                setShowAddCar(true)
              }
            />
          )}

          {/* MY CARS */}

          {activeMenu === "My Cars" && (
            <MyCars
              cars={cars}
              carsLoading={carsLoading}
              onAddCar={() =>
                setShowAddCar(true)
              }
              onDeleteCar={handleCarDeleted}
            />
          )}

          {/* BOOKINGS */}

          {activeMenu === "Bookings" && (
            <BookingsPage
              bookings={filteredBookings}
              search={search}
              setSearch={setSearch}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              bookingTabs={bookingTabs}
              getStatusStyle={getStatusStyle}
            />
          )}

          {activeMenu === "Requests" && (
            <RequestsPage />
          )}

          {activeMenu === "Earnings" && (
            <EarningsPage />
          )}

          {activeMenu === "Profile" && (
            <OwnerProfile user={user} />
          )}

          {activeMenu === "Settings" && (
            <SettingsPage />
          )}

        </div>

      </main>

      {/* ADD CAR MODAL */}

      {showAddCar && (
        <AddCarModal
          onClose={() => setShowAddCar(false)}
          onAdd={handleCarAdded}
        />
      )}

    </div>
  );
}

export default OwnerDashboard;