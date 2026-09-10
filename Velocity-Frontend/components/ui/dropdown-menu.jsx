import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/src/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  User,
  CalendarCheck2,
  LogOut,
  Bell,
  CircleUser,
  ChevronDown,
} from "lucide-react";

const DropDownMenu = ({ logOut }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Controls dropdown when clicked
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setIsOpen(false);
    logOut();
  };

  return (
    <div className="relative group">

      {/* User Button */}
      <button
        type="button"
        onClick={handleToggle}
        className="flex items-center justify-center gap-2 rounded-lg px-2 py-1 hover:bg-muted"
      >
        <CircleUser className="h-6 w-6" />

        <h3 className="text-sm">
          {user?.firstName}
        </h3>

        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "group-hover:rotate-180"
          }`}
        />
      </button>

      {/* Renter Menu */}
      {user?.role === "renter" ? (
        <div
          className={`
            absolute right-[-10px] top-12 z-50 w-53
            rounded-lg border bg-background p-1 shadow-lg

            transition-all duration-150

            ${
              isOpen
                ? "visible opacity-100"
                : "invisible opacity-0 group-hover:visible group-hover:opacity-100"
            }
          `}
        >
          <div className="px-3 py-2 text-lg font-semibold">
            Your Account
          </div>

          <div className="my-1 h-px bg-border" />

          <button
            onClick={() => handleNavigate("/profile")}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-md hover:bg-blue-100"
          >
            <User className="h-5 w-5" />
            My Profile
          </button>

          <button
            onClick={() => handleNavigate("/bookings")}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-md hover:bg-blue-100"
          >
            <CalendarCheck2 className="h-5 w-5" />
            Bookings
          </button>

          <button
            onClick={() => handleNavigate("/wishlist")}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-md hover:bg-blue-100"
          >
            <Heart className="h-5 w-5" />
            Wishlist
          </button>

          <div className="my-1 h-px bg-border" />

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-md hover:bg-blue-100"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      ) : (
        /* Owner Menu */
        <div
          className={`
            absolute right-[-10px] top-12 z-50 w-53
            rounded-lg border bg-background p-1 shadow-lg

            transition-all duration-150

            ${
              isOpen
                ? "visible opacity-100"
                : "invisible opacity-0 group-hover:visible group-hover:opacity-100"
            }
          `}
        >
          <div className="px-3 py-2 text-lg font-semibold">
            Your Account
          </div>

          <div className="my-1 h-px bg-border" />

          <button
            onClick={() => handleNavigate("/owner/dashboard")}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-md hover:bg-blue-100"
          >
            <User className="h-5 w-5" />
            My Dashboard
          </button>

          <div className="my-1 h-px bg-border" />

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-md hover:bg-blue-100"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;

