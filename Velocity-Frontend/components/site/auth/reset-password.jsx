import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Car, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import axios from "axios";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
        {
          email,
          otp,
          newPassword,
        }
      );

      console.log(response.data);

      setMessage("Password reset successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Reset password error:", error);

      setError(
        error.response?.data?.msg ||
          "Failed to reset password"
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
              Reset password
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Enter the OTP sent to your email and create a new password.
            </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email address
              </Label>

              <Input
                id="email"
                type="email"
                value={email}
                disabled
              />
            </div>

            {/* OTP */}
            <div className="space-y-2">
              <Label htmlFor="otp">
                OTP
              </Label>

              <Input
                id="otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                value={otp}
                required
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">
                New password
              </Label>

              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  required
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                  className="pr-10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword(!showNewPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={
                    showNewPassword
                      ? "Hide new password"
                      : "Show new password"
                  }
                >
                  {showNewPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirm new password
              </Label>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  required
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  className="pr-10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Success */}
            {message && (
              <p className="text-sm text-green-600">
                {message}
              </p>
            )}

            {/* Error */}
            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full rounded-full"
              disabled={loading}
            >
              {loading
                ? "Resetting password..."
                : "Reset Password"}
            </Button>

          </form>

          {/* Login Link */}
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

export default ResetPassword;

