const fuelTypes = ["Petrol", "Diesel", "Electric","CNG", "Hybrid"];
const transmissions = ["Automatic", "Manual"];
const categories = [
  { name: "SUV", count: 2, icon: "truck" },
  { name: "Sedan", count: 3, icon: "car" },
  { name: "Sports", count: 1, icon: "gauge" },
  { name: "Electric", count: 1, icon: "zap" },
  { name: "Luxury", count: 1, icon: "gem" }
];
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Frequent Traveler",
    avatar: "/avatars/sarah.png",
    rating: 5,
    text: "Velocity made my road trip unforgettable. Booking took two minutes, the car was spotless, and pickup was seamless. Easily the best rental experience I've had."
  },
  {
    name: "Michael Chen",
    role: "Business Executive",
    avatar: "/avatars/michael.png",
    rating: 5,
    text: "I rent for work every week and Velocity is now my only choice. Premium fleet, transparent pricing, and support that actually answers at 2am."
  },
  {
    name: "Emily Rodriguez",
    role: "Weekend Explorer",
    avatar: "/avatars/emily.png",
    rating: 5,
    text: "Got a Range Rover for a mountain trip. The whole process was effortless and the price beat every competitor. Highly recommend to everyone."
  }
];
const faqs = [
  {
    q: "What documents do I need to rent a car?",
    a: "You'll need a valid driver's license, a government-issued ID, and a credit or debit card in the driver's name. International renters may need a passport and an International Driving Permit."
  },
  {
    q: "Is insurance included in the rental price?",
    a: "Basic liability insurance is included with every rental. You can add full coverage protection during checkout for complete peace of mind."
  },
  {
    q: "Can I cancel or modify my booking?",
    a: "Yes. Free cancellation is available up to 24 hours before your pickup time. Modifications can be made anytime from your My Bookings page."
  },
  {
    q: "Is there a mileage limit?",
    a: "Most rentals include 200 miles per day. Unlimited mileage packages are available for select vehicles and longer bookings."
  },
  {
    q: "What is the minimum age to rent?",
    a: "The minimum age is 21. Drivers under 25 may incur a young driver surcharge. Luxury and sports vehicles require drivers to be 25 or older."
  }
];

export {
  categories,
  faqs,
  fuelTypes,
 testimonials,
  transmissions
};
