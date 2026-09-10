import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Car, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { AuthContext } from "@/src/context/AuthContext";
import axios from "axios";

function AuthForm({ mode, role }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Show / hide password
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // =========================
      // REGISTER
      // =========================
      if (mode === "register") {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/register`,
          {
            firstName,
            lastName,
            email,
            password,
            role,
          }
        );

        console.log(response.data);

        navigate("/login");
      }

      // =========================
      // LOGIN
      // =========================
      else if (mode === "login") {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/login`,
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        );

        console.log(response.data);

        const user = response.data.user;

        setUser(user);

        if (user.role === "renter") {
          navigate("/");
        } else {
          navigate("/owner/dashboard");
        }
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      
      {/* =========================
          HEADER
      ========================= */}
      <div className="mb-7 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Car className="size-6" />
        </div>

        <h1 className="mt-4 font-display text-2xl font-bold text-secondary">
          {mode === "login"
            ? "Welcome back"
            : "Create your account"}
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "login"
            ? "Sign in to manage your reservations."
            : role === "owner"
            ? "Speed up your earnings with Velocity"
            : "Join thousands of drivers choosing Velocity."}
        </p>
      </div>

      {/* =========================
          FORM
      ========================= */}
      <form onSubmit={submitHandler} className="space-y-4">

        {/* =========================
            FIRST NAME + LAST NAME
        ========================= */}
        {mode === "register" && (
          <div className="grid gap-4 sm:grid-cols-2">

            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="first">First name</Label>

              <Input
                id="first"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="last">Last name</Label>

              <Input
                id="last"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

          </div>
        )}

        {/* =========================
            EMAIL
        ========================= */}
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>

          <Input
            id="email"
            type="email"
            value={email}
            placeholder="you@example.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* =========================
            PASSWORD
        ========================= */}
        <div className="space-y-2">

          {/* Password Label + Forgot Password */}
          <div className="flex justify-between">
            <Label htmlFor="password">
              Password
            </Label>

            {mode === "login" && (
              <Link
                to="/forgot-password"
                className="text-xs font-medium text-primary"
              >
                Forgot password?
              </Link>
            )}
          </div>

          {/* Password Input + Eye Icon */}
          <div className="relative">

            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>

          </div>
        </div>

        {/* =========================
            TERMS
        ========================= */}
        {mode === "register" && (
          <div className="flex items-start gap-2 text-xs text-muted-foreground">

            <input
              id="terms"
              type="checkbox"
              required
              className="mt-0.5 accent-primary"
            />

            <label htmlFor="terms">
              I agree to the terms and privacy policy.
            </label>

          </div>
        )}

        {/* =========================
            SUBMIT BUTTON
        ========================= */}
        <Button
          type="submit"
          className="w-full rounded-full"
        >
          {mode === "login"
            ? "Sign in"
            : "Create account"}
        </Button>

      </form>

      {/* =========================
          BOTTOM LINK
      ========================= */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        {mode === "login"
          ? "New to Velocity? "
          : "Already have an account? "}

        <Link
          to={mode === "login" ? "/register" : "/login"}
          className="font-semibold text-primary"
        >
          {mode === "login"
            ? "Create an account"
            : "Sign in"}
        </Link>
      </p>
    </div>
  );
}


// ========================================
// AUTH SHELL
// ========================================

function AuthShell({ children }) {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center bg-muted/30 px-4 py-16">
      <div className="w-full">
        {children}
      </div>
    </main>
  );
}

export { AuthForm, AuthShell };