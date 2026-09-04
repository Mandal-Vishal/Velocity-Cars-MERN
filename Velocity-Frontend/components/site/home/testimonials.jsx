
import { Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Stars } from "@/components/site/stars";
import { testimonials } from "@/lib/data";
function Testimonials() {
  return <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8"><div className="rounded-3xl bg-secondary px-6 py-16 sm:px-12"><div className="mx-auto max-w-2xl text-center"><span className="text-sm font-semibold uppercase tracking-wide text-accent">Testimonials</span><h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white text-balance sm:text-4xl">Loved by drivers everywhere</h2></div><div className="mt-12 grid gap-6 lg:grid-cols-3">{testimonials.map((t) => <figure className="flex flex-col rounded-2xl bg-white/5 p-6 ring-1 ring-white/10"><Quote className="h-8 w-8 text-accent" /><blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/85">{t.text}</blockquote><div className="mt-6 flex items-center gap-3"><Avatar className="h-11 w-11"><AvatarImage src={t.avatar || "/placeholder.svg"} alt={t.name} /><AvatarFallback>{t.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback></Avatar><figcaption><p className="font-semibold text-white">{t.name}</p><p className="text-xs text-white/60">{t.role}</p></figcaption><div className="ml-auto"><Stars rating={t.rating} /></div></div></figure>)}</div></div></section>;
}
export {
  Testimonials
};
