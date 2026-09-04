
import { DollarSign, Headphones, Gem, CalendarCheck } from "lucide-react";
const items = [
  { icon: DollarSign, title: "Affordable Prices", desc: "Transparent daily rates with no hidden fees. Price-match guaranteed." },
  { icon: Headphones, title: "24/7 Support", desc: "Real humans ready to help any time, day or night, wherever you are." },
  { icon: Gem, title: "Luxury Cars", desc: "A curated fleet of premium, well-maintained vehicles for every trip." },
  { icon: CalendarCheck, title: "Easy Booking", desc: "Book in under two minutes with instant confirmation and e-contracts." }
];
function WhyChooseUs() {
  return <section className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:px-8"><div className="mx-auto max-w-2xl text-center"><span className="text-sm font-semibold uppercase tracking-wide text-primary">Why Choose Us</span><h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-secondary text-balance sm:text-4xl">The smarter way to rent a car</h2></div><div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{items.map((item) => <div className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><item.icon className="h-6 w-6" /></span><h3 className="mt-5 font-display text-lg font-bold text-secondary">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p></div>)}</div></section>;
}
export {
  WhyChooseUs
};
