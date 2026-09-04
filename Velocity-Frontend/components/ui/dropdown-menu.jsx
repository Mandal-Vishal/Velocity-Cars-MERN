import React, { useContext } from "react";
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

  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="relative group">
      <div className="flex justify-center items-center gap-2">
        <CircleUser className="h-6 w-6" />
        <h3 className="text-sm">{user?.firstName}</h3>
        <ChevronDown
          className="
      h-4 w-4
      transition-transform duration-200
      group-hover:rotate-180
    "
        />
      </div>
      {user.role === 'renter' ? (
        <div
        className="
          absolute right-[-10px] top-12 z-50 w-53
          rounded-lg border bg-background p-1 shadow-lg

          invisible opacity-0
          group-hover:visible group-hover:opacity-100
          transition-all duration-150
        "
      >
        <div className="px-3 py-2 text-lg font-semibold">Your Account</div>

        <div className="my-1 h-px bg-border" />

        <button
          onClick={() => navigate("/home")}
          className="w-full rounded-md px-3 py-2 text-left text-md hover:bg-blue-100 flex gap-3  items-center"
        >
          <User className="h-5 w-5" /> My Profile
        </button>

        <button
          onClick={() => navigate("/bookings")}
          className="w-full rounded-md px-3 py-2 text-left text-md hover:bg-blue-100 flex gap-3 items-center"
        >
          <CalendarCheck2 className="h-5 w-5" /> Bookings
        </button>

        <button
          onClick={() => navigate("/wishlist")}
          className="w-full rounded-md px-3 py-2 text-left text-md hover:bg-blue-100 flex gap-3 items-center"
        >
          <Heart className="h-5 w-5" /> Wishlist
        </button>
        <button
          onClick={() => navigate("/notifications")}
          className="w-full rounded-md px-3 py-2 text-left text-md hover:bg-blue-100 flex gap-3 items-center"
        >
          <Bell className="h-5 w-5" /> Notifications
        </button>

        <div className="my-1 h-px bg-border" />

        <button
          onClick={logOut}
          className="w-full rounded-md px-3 py-2 text-left text-md hover:bg-blue-100 flex gap-3 items-center"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>):(
        <div
        className="
          absolute right-[-10px] top-12 z-50 w-53
          rounded-lg border bg-background p-1 shadow-lg

          invisible opacity-0
          group-hover:visible group-hover:opacity-100
          transition-all duration-150
        "
      >
        <div className="px-3 py-2 text-lg font-semibold"></div>

        <div className="my-1 h-px bg-border" />

        <button
          onClick={() => navigate("/owner/dashboard")}
          className="w-full rounded-md px-3 py-2 text-left text-md hover:bg-blue-100 flex gap-3  items-center"
        >
          <User className="h-5 w-5" /> My Dashboard
        </button>

        

        <div className="my-1 h-px bg-border" />

        <button
          onClick={logOut}
          className="w-full rounded-md px-3 py-2 text-left text-md hover:bg-blue-100 flex gap-3 items-center"
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
