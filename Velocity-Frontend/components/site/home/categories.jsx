
import { Link } from "react-router-dom";
import { Truck, Car, Gauge, Zap, Gem } from "lucide-react";
import { categories } from "@/lib/data";
const iconMap = { truck: Truck, car: Car, gauge: Gauge, zap: Zap, gem: Gem };
function Categories() {
  return <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8"><div className="flex items-end justify-between"><div><span className="text-sm font-semibold uppercase tracking-wide text-primary">Categories</span><h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">Browse by type</h2></div><Link to="/cars" className="hidden text-sm font-semibold text-primary hover:underline sm:block">View all</Link></div><div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">{categories.map((cat) => {
      const Icon = iconMap[cat.icon];
      return <Link href="/cars" className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-secondary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><Icon className="h-6 w-6" /></span><div><p className="font-display font-bold text-secondary">{cat.name}</p><p className="text-xs text-muted-foreground">{cat.count} cars</p></div></Link>;
    })}</div></section>;
}
export {
  Categories
};
