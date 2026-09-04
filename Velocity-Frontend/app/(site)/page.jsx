import { Fragment } from "react";
import { Hero } from "@/components/site/home/hero";
import { WhyChooseUs } from "@/components/site/home/why-choose-us";
import { Categories } from "@/components/site/home/categories";
import { FeaturedCars } from "@/components/site/home/featured-cars";
import { Testimonials } from "@/components/site/home/testimonials";
import { Faq } from "@/components/site/home/faq";
function HomePage() {
  return <><Hero /><WhyChooseUs /><Categories /><FeaturedCars /><Testimonials /><Faq /></>;
}
export {
  HomePage as default
};
