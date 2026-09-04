const cars = [
  {
    id: "bmw-x5",
    name: "BMW X5",
    brand: "BMW",
    image: "/cars/bmw-x5.png",
    gallery: ["/cars/bmw-x5.png", "/cars/range-rover.png", "/cars/audi-a6.png"],
    pricePerDay: 120,
    rating: 4.9,
    reviews: 218,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    mileage: "14 km/l",
    color: "Alpine White",
    category: "SUV",
    year: 2024,
    location: "New York, NY",
    available: true,
    description: "The BMW X5 blends commanding presence with refined comfort. A spacious cabin, cutting-edge tech, and dynamic handling make it the ideal companion for both city drives and weekend getaways.",
    features: ["Panoramic Sunroof", "Heated Seats", "360\xB0 Camera", "Apple CarPlay", "Adaptive Cruise", "Wireless Charging"]
  },
  {
    id: "mercedes-c",
    name: "Mercedes C-Class",
    brand: "Mercedes",
    image: "/cars/mercedes-c.png",
    gallery: ["/cars/mercedes-c.png", "/cars/audi-a6.png", "/cars/tesla-3.png"],
    pricePerDay: 95,
    rating: 4.8,
    reviews: 176,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    mileage: "16 km/l",
    color: "Obsidian Black",
    category: "Sedan",
    year: 2024,
    location: "Los Angeles, CA",
    available: true,
    description: "Elegant, quiet, and effortlessly quick, the Mercedes C-Class delivers a first-class experience with premium materials and intuitive MBUX infotainment.",
    features: ["Ambient Lighting", "Burmester Sound", "Lane Assist", "Keyless Entry", "Ventilated Seats", "Navigation"]
  },
  {
    id: "audi-a6",
    name: "Audi A6",
    brand: "Audi",
    image: "/cars/audi-a6.png",
    gallery: ["/cars/audi-a6.png", "/cars/mercedes-c.png", "/cars/bmw-x5.png"],
    pricePerDay: 100,
    rating: 4.7,
    reviews: 143,
    transmission: "Automatic",
    fuel: "Diesel",
    seats: 5,
    mileage: "18 km/l",
    color: "Florett Silver",
    category: "Sedan",
    year: 2023,
    location: "Chicago, IL",
    available: true,
    description: "The Audi A6 is a masterclass in understated luxury. Quattro all-wheel drive and a whisper-quiet cabin make every journey composed and confident.",
    features: ["Quattro AWD", "Virtual Cockpit", "Matrix LED", "Bang & Olufsen", "Parking Assist", "Heated Steering"]
  },
  {
    id: "tesla-3",
    name: "Tesla Model 3",
    brand: "Tesla",
    image: "/cars/tesla-3.png",
    gallery: ["/cars/tesla-3.png", "/cars/porsche-911.png", "/cars/mercedes-c.png"],
    pricePerDay: 110,
    rating: 4.9,
    reviews: 302,
    transmission: "Automatic",
    fuel: "Electric",
    seats: 5,
    mileage: "500 km range",
    color: "Ultra Red",
    category: "Electric",
    year: 2024,
    location: "San Francisco, CA",
    available: true,
    description: "The Tesla Model 3 combines instant torque, minimalist design, and industry-leading software. Autopilot and a 500 km range make it the smart choice for modern driving.",
    features: ["Autopilot", "Glass Roof", '15" Touchscreen', "Supercharging", "Over-the-air Updates", "Premium Audio"]
  },
  {
    id: "range-rover",
    name: "Range Rover Sport",
    brand: "Land Rover",
    image: "/cars/range-rover.png",
    gallery: ["/cars/range-rover.png", "/cars/bmw-x5.png", "/cars/jeep-wrangler.png"],
    pricePerDay: 160,
    rating: 4.8,
    reviews: 121,
    transmission: "Automatic",
    fuel: "Diesel",
    seats: 7,
    mileage: "12 km/l",
    color: "Santorini Black",
    category: "Luxury",
    year: 2024,
    location: "Miami, FL",
    available: true,
    description: "Commanding luxury meets genuine capability. The Range Rover Sport pampers passengers while conquering any terrain with effortless poise.",
    features: ["Terrain Response", "Air Suspension", "Meridian Sound", "Massage Seats", "Head-up Display", "Tow Package"]
  },
  {
    id: "toyota-camry",
    name: "Toyota Camry",
    brand: "Toyota",
    image: "/cars/toyota-camry.png",
    gallery: ["/cars/toyota-camry.png", "/cars/mercedes-c.png", "/cars/audi-a6.png"],
    pricePerDay: 55,
    rating: 4.6,
    reviews: 264,
    transmission: "Automatic",
    fuel: "Hybrid",
    seats: 5,
    mileage: "22 km/l",
    color: "Blueprint",
    category: "Sedan",
    year: 2023,
    location: "Austin, TX",
    available: true,
    description: "Reliable, fuel-efficient, and comfortable \u2014 the Toyota Camry Hybrid is the everyday hero. Great mileage without compromising on space or safety.",
    features: ["Toyota Safety Sense", "Wireless CarPlay", "Sunroof", "Dual-zone Climate", "Blind Spot Monitor", "JBL Audio"]
  },
  {
    id: "porsche-911",
    name: "Porsche 911",
    brand: "Porsche",
    image: "/cars/porsche-911.png",
    gallery: ["/cars/porsche-911.png", "/cars/tesla-3.png", "/cars/range-rover.png"],
    pricePerDay: 240,
    rating: 5,
    reviews: 98,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 2,
    mileage: "10 km/l",
    color: "Racing Yellow",
    category: "Sports",
    year: 2024,
    location: "Las Vegas, NV",
    available: true,
    description: "An icon reborn. The Porsche 911 delivers spine-tingling performance and everyday usability wrapped in timeless design. Pure driving thrill.",
    features: ["Sport Chrono", "PASM Suspension", "Sport Exhaust", "Bose Surround", "Launch Control", "Carbon Trim"]
  },
  {
    id: "jeep-wrangler",
    name: "Jeep Wrangler",
    brand: "Jeep",
    image: "/cars/jeep-wrangler.png",
    gallery: ["/cars/jeep-wrangler.png", "/cars/range-rover.png", "/cars/bmw-x5.png"],
    pricePerDay: 85,
    rating: 4.7,
    reviews: 187,
    transmission: "Manual",
    fuel: "Petrol",
    seats: 5,
    mileage: "13 km/l",
    color: "Sarge Green",
    category: "SUV",
    year: 2023,
    location: "Denver, CO",
    available: false,
    description: "Adventure without limits. The Jeep Wrangler is built to explore, with removable roof and doors, legendary 4x4 capability, and rugged charm.",
    features: ["4x4 Off-road", "Removable Roof", "Rock Rails", "All-terrain Tires", "Trail Cam", "Skid Plates"]
  }
];

// const brands = ["BMW", "Mercedes", "Audi", "Tesla", "Land Rover", "Toyota", "Porsche", "Jeep"];
const fuelTypes = ["Petrol", "Diesel", "Electric","CNG", "Hybrid"];
const transmissions = ["Automatic", "Manual"];
const seatOptions = [2, 4, 5, 7];
const categories = [
  { name: "SUV", count: 2, icon: "truck" },
  { name: "Sedan", count: 3, icon: "car" },
  { name: "Sports", count: 1, icon: "gauge" },
  { name: "Electric", count: 1, icon: "zap" },
  { name: "Luxury", count: 1, icon: "gem" }
];
function getCar(id) {
  return cars.find((c) => c.id === id);
}
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
const bookings = [
  {
    id: "BK-10241",
    carId: "bmw-x5",
    carName: "BMW X5",
    carImage: "/cars/bmw-x5.png",
    customer: "Alex Morgan",
    pickup: "Aug 2, 2026",
    ret: "Aug 6, 2026",
    days: 4,
    total: 480,
    status: "Upcoming"
  },
  {
    id: "BK-10238",
    carId: "tesla-3",
    carName: "Tesla Model 3",
    carImage: "/cars/tesla-3.png",
    customer: "Alex Morgan",
    pickup: "Jul 12, 2026",
    ret: "Jul 15, 2026",
    days: 3,
    total: 330,
    status: "Completed"
  },
  {
    id: "BK-10230",
    carId: "porsche-911",
    carName: "Porsche 911",
    carImage: "/cars/porsche-911.png",
    customer: "Alex Morgan",
    pickup: "Jun 20, 2026",
    ret: "Jun 22, 2026",
    days: 2,
    total: 480,
    status: "Completed"
  },
  {
    id: "BK-10225",
    carId: "toyota-camry",
    carName: "Toyota Camry",
    carImage: "/cars/toyota-camry.png",
    customer: "Alex Morgan",
    pickup: "May 5, 2026",
    ret: "May 9, 2026",
    days: 4,
    total: 220,
    status: "Cancelled"
  }
];
const notifications = [
  {
    id: "n1",
    type: "booking",
    title: "Booking Confirmed",
    message: "Your BMW X5 booking (BK-10241) is confirmed for Aug 2 \u2013 Aug 6.",
    time: "2 hours ago"
  },
  {
    id: "n2",
    type: "payment",
    title: "Payment Successful",
    message: "We received your payment of $480 for booking BK-10241.",
    time: "2 hours ago"
  },
  {
    id: "n3",
    type: "reminder",
    title: "Pickup Reminder",
    message: "Your rental pickup is in 3 days. Bring your license and ID.",
    time: "1 day ago"
  },
  {
    id: "n4",
    type: "offer",
    title: "Weekend Offer \u2014 20% Off",
    message: "Book any luxury car this weekend and save 20% with code VELO20.",
    time: "3 days ago"
  },
  {
    id: "n5",
    type: "cancel",
    title: "Booking Cancelled",
    message: "Your Toyota Camry booking (BK-10225) was cancelled and refunded.",
    time: "1 week ago"
  }
];
const customers = [
  { id: "C-001", name: "Alex Morgan", email: "alex.morgan@email.com", phone: "+1 202 555 0143", avatar: "/avatars/alex.png", bookings: 12, status: "Active", joined: "Jan 2025" },
  { id: "C-002", name: "Sarah Johnson", email: "sarah.j@email.com", phone: "+1 202 555 0198", avatar: "/avatars/sarah.png", bookings: 8, status: "Active", joined: "Mar 2025" },
  { id: "C-003", name: "Michael Chen", email: "m.chen@email.com", phone: "+1 202 555 0176", avatar: "/avatars/michael.png", bookings: 21, status: "Active", joined: "Nov 2024" },
  { id: "C-004", name: "Emily Rodriguez", email: "emily.r@email.com", phone: "+1 202 555 0122", avatar: "/avatars/emily.png", bookings: 5, status: "Inactive", joined: "Jun 2025" },
  { id: "C-005", name: "David Kim", email: "david.kim@email.com", phone: "+1 202 555 0110", avatar: "/avatars/david.png", bookings: 3, status: "Active", joined: "Feb 2026" },
  { id: "C-006", name: "Jessica Lee", email: "jess.lee@email.com", phone: "+1 202 555 0187", avatar: "/avatars/jessica.png", bookings: 15, status: "Active", joined: "Aug 2024" }
];
const payments = [
  { invoice: "INV-2041", customer: "Alex Morgan", amount: 480, status: "Paid", date: "Jul 28, 2026", method: "Visa \u2022\u2022\u2022\u2022 4242" },
  { invoice: "INV-2040", customer: "Michael Chen", amount: 720, status: "Paid", date: "Jul 27, 2026", method: "Mastercard \u2022\u2022\u2022\u2022 5588" },
  { invoice: "INV-2039", customer: "Sarah Johnson", amount: 330, status: "Pending", date: "Jul 26, 2026", method: "UPI" },
  { invoice: "INV-2038", customer: "Emily Rodriguez", amount: 220, status: "Refunded", date: "Jul 25, 2026", method: "Net Banking" },
  { invoice: "INV-2037", customer: "David Kim", amount: 960, status: "Paid", date: "Jul 24, 2026", method: "Visa \u2022\u2022\u2022\u2022 1121" },
  { invoice: "INV-2036", customer: "Jessica Lee", amount: 165, status: "Paid", date: "Jul 23, 2026", method: "Amex \u2022\u2022\u2022\u2022 3005" }
];
const adminReviews = [
  { id: "R-01", customer: "Sarah Johnson", avatar: "/avatars/sarah.png", car: "BMW X5", rating: 5, text: "Absolutely flawless experience from start to finish.", date: "Jul 20, 2026", status: "Published" },
  { id: "R-02", customer: "Michael Chen", avatar: "/avatars/michael.png", car: "Tesla Model 3", rating: 5, text: "Fast, clean, and the app is superb. Will rent again.", date: "Jul 18, 2026", status: "Published" },
  { id: "R-03", customer: "David Kim", avatar: "/avatars/david.png", car: "Porsche 911", rating: 4, text: "Incredible car, though pickup took a little longer than expected.", date: "Jul 15, 2026", status: "Pending" },
  { id: "R-04", customer: "Emily Rodriguez", avatar: "/avatars/emily.png", car: "Range Rover Sport", rating: 5, text: "Perfect for our mountain trip. Highly recommend.", date: "Jul 12, 2026", status: "Published" },
  { id: "R-05", customer: "Jessica Lee", avatar: "/avatars/jessica.png", car: "Audi A6", rating: 4, text: "Smooth ride and great service overall.", date: "Jul 10, 2026", status: "Pending" }
];
const revenueData = [
  { month: "Jan", revenue: 32e3, bookings: 210 },
  { month: "Feb", revenue: 41e3, bookings: 265 },
  { month: "Mar", revenue: 38e3, bookings: 248 },
  { month: "Apr", revenue: 52e3, bookings: 312 },
  { month: "May", revenue: 61e3, bookings: 358 },
  { month: "Jun", revenue: 74e3, bookings: 402 },
  { month: "Jul", revenue: 89e3, bookings: 471 }
];
const topCarsData = [
  { name: "Tesla Model 3", value: 302 },
  { name: "Toyota Camry", value: 264 },
  { name: "BMW X5", value: 218 },
  { name: "Jeep Wrangler", value: 187 },
  { name: "Audi A6", value: 143 }
];
const categoryShare = [
  { name: "Sedan", value: 45 },
  { name: "SUV", value: 25 },
  { name: "Electric", value: 18 },
  { name: "Luxury", value: 12 }
];
export {
  adminReviews,
  bookings,
  cars,
  categories,
  categoryShare,
  customers,
  faqs,
  fuelTypes,
  getCar,
  notifications,
  payments,
  revenueData,
  seatOptions,
  testimonials,
  topCarsData,
  transmissions
};
