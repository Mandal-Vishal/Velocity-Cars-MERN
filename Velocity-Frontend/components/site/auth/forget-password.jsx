import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        {
          email,
        }
      );

      console.log(response.data);

      setMessage("OTP sent successfully. Check your email.");

      // Go to reset password page after OTP is sent
      setTimeout(() => {
        navigate("/reset-password", {
          state: { email },
        });
      }, 1000);

    } catch (error) {
      console.error("Forgot password error:", error);

      setError(
        error.response?.data?.msg ||
        "Failed to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center bg-muted/30 px-4 py-16">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">

          {/* Header */}
          <div className="mb-7 text-center">

            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Car className="size-6" />
            </div>

            <h1 className="mt-4 font-display text-2xl font-bold text-secondary">
              Forgot password?
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Enter your email and we'll send you an OTP to reset your password.
            </p>

          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-2">
              <Label htmlFor="email">
                Email address
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Success message */}
            {message && (
              <p className="text-sm text-green-600">
                {message}
              </p>
            )}

            {/* Error message */}
            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full rounded-full"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>

          </form>

          {/* Back to login */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-semibold text-primary"
            >
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;

