import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import SiteLayout from "@/app/(site)/layout"
import HomePage from "@/app/(site)/page"
import CarsPage from "@/app/(site)/cars/page"
import CarPage from "@/app/(site)/cars/[id]/page"
import BookingPage from "@/app/(site)/booking/page"
import LoginPage from "@/app/(site)/login/page"
import RegisterPage from "@/app/(site)/register/page"
import RegisterOwner from "@/app/(site)/register/register-owner"
import AboutPage from "@/app/(site)/about/page"
import ContactPage from "@/app/(site)/contact/page"
import BookingsPage from "@/app/(site)/bookings/page"
import WishlistPage from "@/app/(site)/wishlist/page"
import ProfilePage from "@/app/(site)/profile/page"
import NotificationsPage from "@/app/(site)/notifications/page"
import AdminPage from "@/app/admin/[[...section]]/page"
import NotFoundPage from "@/app/not-found"
import ProtectedRoutes from "../components/protectedRoutes"
import Home from "../components/site/renter/home"
import OwnerDashboard from "../components/site/owner/OwnerDashboard"
import { AuthContext } from "./context/AuthContext"
import { useContext } from "react"

function CustomerRoute({ children }) {
  return <SiteLayout>{children}</SiteLayout>
}

export default function App() {
  const {user} = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Routes>
        <Route element = {<ProtectedRoutes allowedRoles={'renter'} />}>
          <Route path="/wishlist" element={<CustomerRoute><WishlistPage /></CustomerRoute>} />
          <Route path="/profile" element={<CustomerRoute><ProfilePage /></CustomerRoute>} />
          <Route path="/notifications" element={<CustomerRoute><NotificationsPage /></CustomerRoute>} />
          <Route path="/bookings" element={<CustomerRoute><BookingsPage /></CustomerRoute>} />
          <Route path="/booking" element={<CustomerRoute><BookingPage /></CustomerRoute>} />
          <Route path="/home" element={<CustomerRoute><Home/></CustomerRoute>} />
        </Route>

        <Route element = {<ProtectedRoutes allowedRoles={'owner'}/>}>
          <Route path="/owner/dashboard" element={<CustomerRoute> <OwnerDashboard/></CustomerRoute>}/>
        </Route>

        <Route path="/" element={<CustomerRoute><HomePage /></CustomerRoute>} />
        <Route path="/cars" element={<CustomerRoute><CarsPage /></CustomerRoute>} />
        <Route path="/cars/:id" element={<CustomerRoute><CarPage /></CustomerRoute>} />
      
        <Route path="/login" element={<CustomerRoute><LoginPage /></CustomerRoute>} />
        <Route path="/register" element={<CustomerRoute><RegisterPage /></CustomerRoute>} />
        <Route path="/register-owner" element={<CustomerRoute><RegisterOwner /></CustomerRoute>} />
        <Route path="/about" element={<CustomerRoute><AboutPage /></CustomerRoute>} />
        <Route path="/contact" element={<CustomerRoute><ContactPage /></CustomerRoute>} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/404" element={<CustomerRoute><NotFoundPage /></CustomerRoute>} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  )
}
