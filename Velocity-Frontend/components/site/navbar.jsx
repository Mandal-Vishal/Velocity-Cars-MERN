import { useContext, useState } from "react";
import { AuthContext } from "../../src/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Car, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

import { cn } from "@/lib/utils";
import axios from "axios";
const links = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Cars" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
import DropDownMenu from "../ui/dropdown-menu";

function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      setUser(null);
      navigate("/login");
      console.log("User logged out", response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Car className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-secondary">
            Velocity
          </span>
        </Link>
        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={cn(
                "group px-3 py-2 text-sm font-medium transition-colors",
                pathname === l.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="relative">
                {l.label}

                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-primary transition-all duration-500 ease-out group-hover:w-full",
                    pathname === l.href && "w-full",
                  )}
                />
              </span>
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search cars..."
              className="h-9 w-48 rounded-full bg-muted pl-9"
            />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1 lg:ml-2">
          {user ? <DropDownMenu logOut={logOut} /> : ""}
          {!user ? (
            <div className="hidden items-center gap-2 lg:flex">
              <Button asChild variant="ghost" className="font-medium">
                <Link to="/login">Login</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="rounded-full font-medium text-blue-900 border-2 border-gray-200"
              >
                <Link to="/register">Register</Link>
              </Button>
              <Button
                variant="secondary"
                className="rounded-full bg-blue-900 font-medium px-5 tracking-wider"
              >
                <Link to="/register-owner">List Your Car</Link>
              </Button>
            </div>
          ) : (
            ""
          )}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted lg:hidden"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="mt-6 flex flex-col gap-1">
                {links.map((l) => (
                  <Link
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-base font-medium hover:bg-muted"
                  >
                    {l.label}
                  </Link>
                ))}
                <div className="my-3 h-px bg-border" />
                  {!user ? (
                  <div className="flex flex-col gap-3 p-2">
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/login" onClick={() => setOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full text-blue-900 border-2 border-gray-200"
                    >
                      <Link to="/register" onClick={() => setOpen(false)}>
                        Register
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="secondary"
                      className="w-full bg-blue-900"
                    >
                      <Link to="/register-owner" onClick={() => setOpen(false)}>
                        List Your Car
                      </Link>
                    </Button>
                  </div>
                  ) : (
                  ""
                  )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
export { Navbar };
