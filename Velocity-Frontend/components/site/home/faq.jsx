
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/lib/data";
function Faq() {
  return <section id="faq" className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8"><div className="text-center"><span className="text-sm font-semibold uppercase tracking-wide text-primary">FAQ</span><h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-secondary text-balance sm:text-4xl">Frequently asked questions</h2></div><Accordion type="single" className="mt-10 w-full">{faqs.map((faq, i) => <AccordionItem value={`item-${i}`} className="border-border"><AccordionTrigger className="text-left font-display text-base font-semibold text-secondary hover:no-underline">{faq.q}</AccordionTrigger><AccordionContent className="text-sm leading-relaxed text-muted-foreground">{faq.a}</AccordionContent></AccordionItem>)}</Accordion></section>;
}
export {
  Faq
};
