import { Link } from "react-router-dom";
import { Car, Globe, Send, MessageCircle, Rss, Copyright } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/about" },
      { label: "Blog", href: "/about" },
    ],
  },
  {
    title: "Cars",
    links: [
      { label: "All Cars", href: "/cars" },
      { label: "SUVs", href: "/cars" },
      { label: "Luxury", href: "/cars" },
      { label: "Electric", href: "/cars" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/contact" },
      { label: "My Bookings", href: "/bookings" },
      { label: "Notifications", href: "/notifications" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/about" },
      { label: "Privacy Policy", href: "/about" },
      { label: "Cookie Policy", href: "/about" },
      { label: "Insurance", href: "/about" },
    ],
  },
];
function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Car className="h-5 w-5" />
              </span>
              <span className="font-display text-xl font-extrabold tracking-tight">
                Velocity
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-secondary-foreground/70">
              Premium car rentals made effortless. Drive the car you deserve,
              wherever the road takes you.
            </p>
            <div className="mt-6 flex gap-3">
              {[Globe, Send, MessageCircle, Rss].map((Icon, i) => (
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary"
                  aria-label="Social media"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
          {columns.map((col) => (
            <div>
              <h3 className="font-display text-sm font-semibold">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li>
                    <Link
                      to={link.href}
                      className="text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div> 
        <div className="mt-12 flex items-center justify-center gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-secondary-foreground/60 flex">
            <Copyright className="h-5" />
            2026 Velocity Rentals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
export { Footer };
