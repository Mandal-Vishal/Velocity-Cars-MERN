import React from 'react'

const AdminDashboard = () => {
  return (
    <div>admin-dashboard</div>
  )
}

// import { Fragment } from "react";
// import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import {
//   BarChart3,
//   Bell,
//   CalendarCheck,
//   Car,
//   ChevronRight,
//   CreditCard,
//   LayoutDashboard,
//   LogOut,
//   Menu,
//   MessageSquare,
//   Settings,
//   Users,
//   X,
// } from "lucide-react";
// import { cars, bookings, customers } from "@/lib/data";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useState } from "react";
// const nav = [
//   { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
//   { href: "/admin/cars", label: "Cars", icon: Car },
//   { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
//   { href: "/admin/customers", label: "Customers", icon: Users },
//   { href: "/admin/payments", label: "Payments", icon: CreditCard },
//   { href: "/admin/reviews", label: "Reviews", icon: MessageSquare },
//   { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
//   { href: "/admin/settings", label: "Settings", icon: Settings },
// ];
// function AdminDashboard({ section = "dashboard" }) {
//   const { pathname } = useLocation();
//   const [mobile, setMobile] = useState(false);
//   const title = nav.find((n) => n.href === pathname)?.label || "Dashboard";
//   return (
//     <div className="min-h-screen bg-muted/30">
//       <header className="sticky top-0 z-30 flex h-16 items-center border-b border-border bg-card px-4 lg:pl-72">
//         <Button
//           variant="ghost"
//           size="icon"
//           className="lg:hidden"
//           onClick={() => setMobile(!mobile)}
//           aria-label="Open admin menu"
//         >
//           <Menu className="size-5" />
//         </Button>
//         <Link
//           to="/"
//           className="ml-2 font-display text-xl font-extrabold text-secondary lg:ml-0"
//         >
//           Velocity{" "}
//           <span className="text-xs font-medium text-muted-foreground">
//             ADMIN
//           </span>
//         </Link>
//         <div className="ml-auto flex items-center gap-3">
//           <Bell className="size-5 text-muted-foreground" />
//           <div className="hidden text-right sm:block">
//             <p className="text-sm font-semibold">Alex Morgan</p>
//             <p className="text-xs text-muted-foreground">Administrator</p>
//           </div>
//           <div className="flex size-9 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
//             AM
//           </div>
//         </div>
//       </header>
//       <aside
//         className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-secondary p-5 text-secondary-foreground ${mobile ? "block" : "hidden"} lg:block`}
//       >
//         <div className="mb-8 flex items-center justify-between">
//           <Link to="/" className="font-display text-2xl font-extrabold">
//             Velocity
//           </Link>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="text-secondary-foreground lg:hidden"
//             onClick={() => setMobile(false)}
//             aria-label="Close admin menu"
//           >
//             <X className="size-5" />
//           </Button>
//         </div>
//         <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-secondary-foreground/50">
//           Management
//         </p>
//         <nav className="space-y-1">
//           {nav.map(({ href, label, icon: Icon }) => (
//             <Link
//               href={href}
//               onClick={() => setMobile(false)}
//               className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${pathname === href ? "bg-primary text-primary-foreground" : "text-secondary-foreground/70 hover:bg-secondary-foreground/10 hover:text-secondary-foreground"}`}
//             >
//               <Icon className="size-4" />
//               {label}
//             </Link>
//           ))}
//         </nav>
//         <Link
//           to="/"
//           className="absolute bottom-6 left-5 flex items-center gap-3 text-sm text-secondary-foreground/60 hover:text-secondary-foreground"
//         >
//           <LogOut className="size-4" />
//           Back to site
//         </Link>
//       </aside>
//       <main className="mx-auto max-w-7xl px-4 py-8 lg:ml-64 lg:px-8">
//         <div className="mb-8">
//           <p className="text-sm text-muted-foreground">Admin / {title}</p>
//           <h1 className="mt-1 font-display text-3xl font-extrabold text-secondary">
//             {title}
//           </h1>
//         </div>
//         {section === "dashboard" ? (
//           <Overview />
//         ) : (
//           <Section name={title} section={section} />
//         )}
//       </main>
//     </div>
//   );
// }
// function Overview() {
//   return (
//     <>
//       <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         {[
//           ["Total revenue", "$48,290", "+12.5%", CreditCard],
//           ["Active bookings", "128", "+8.2%", CalendarCheck],
//           ["Available cars", "42", "+4.1%", Car],
//           ["Customers", "1,842", "+18.7%", Users],
//         ].map(([label, value, change, Icon]) => (
//           <Card>
//             <CardContent className="p-5">
//               <div className="flex items-center justify-between">
//                 <p className="text-sm text-muted-foreground">{label}</p>
//                 <span className="rounded-lg bg-primary/10 p-2 text-primary">
//                   <Icon className="size-4" />
//                 </span>
//               </div>
//               <p className="mt-3 font-display text-3xl font-extrabold text-secondary">
//                 {value}
//               </p>
//               <p className="mt-1 text-xs font-medium text-emerald-600">
//                 {change} from last month
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//       <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
//         <Card>
//           <CardHeader>
//             <CardTitle className="font-display">Recent bookings</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Customer</TableHead>
//                   <TableHead>Vehicle</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead className="text-right">Total</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {bookings.map((b) => (
//                   <TableRow>
//                     <TableCell className="font-medium">
//                       {b.customerName}
//                     </TableCell>
//                     <TableCell>{b.carName}</TableCell>
//                     <TableCell>
//                       <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700">
//                         {b.status}
//                       </span>
//                     </TableCell>
//                     <TableCell className="text-right font-semibold">
//                       ${b.total}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle className="font-display">Fleet overview</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-5">
//             {[
//               ["Available", 42, "bg-primary"],
//               ["Rented", 18, "bg-secondary"],
//               ["Maintenance", 5, "bg-accent"],
//             ].map(([name, value, color]) => (
//               <div>
//                 <div className="mb-2 flex justify-between text-sm">
//                   <span>{name}</span>
//                   <span className="font-bold">{value}</span>
//                 </div>
//                 <div className="h-2 rounded-full bg-muted">
//                   <div
//                     className={`h-2 rounded-full ${color}`}
//                     style={{ width: `${(Number(value) / 65) * 100}%` }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       </div>
//     </>
//   );
// }
// function Section({ name, section }) {
//   const rows =
//     section === "cars"
//       ? cars.map((c) => [
//           c.name,
//           c.category,
//           `$${c.pricePerDay}/day`,
//           c.available ? "Available" : "Rented",
//         ])
//       : section === "customers"
//         ? customers.map((c) => [c.name, c.email, String(c.bookings), c.status])
//         : bookings.map((b) => [b.id, b.customerName, b.carName, `$${b.total}`]);
//   return (
//     <Card>
//       <CardHeader className="flex-row items-center justify-between">
//         <CardTitle className="font-display">{name} management</CardTitle>
//         <Button className="rounded-full">Add {name.slice(0, -1)}</Button>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               {(section === "cars"
//                 ? ["Vehicle", "Category", "Rate", "Status"]
//                 : section === "customers"
//                   ? ["Customer", "Email", "Bookings", "Status"]
//                   : ["Booking", "Customer", "Vehicle", "Total"]
//               ).map((h) => (
//                 <TableHead>{h}</TableHead>
//               ))}
//               <TableHead />
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {rows.map((row, i) => (
//               <TableRow>
//                 {row.map((cell, j) => (
//                   <TableCell className={j === 0 ? "font-medium" : ""}>
//                     {cell}
//                   </TableCell>
//                 ))}
//                 <TableCell className="text-right">
//                   <Button variant="ghost" size="sm">
//                     Manage <ChevronRight className="ml-1 size-4" />
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// }
export { AdminDashboard };
