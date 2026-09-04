import React, { useMemo, useState } from "react";
import Image from "@/components/compat/image";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  MapPin,
  CalendarDays,
  ShieldCheck,
  CreditCard,
  Wallet,
  Building2,
  Check,
  ArrowLeft,
  ArrowRight,
  Lock,
  CircleCheck,
  Clock3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const STEPS = ["Trip Details", "Your Info", "Payment"];

const today = new Date();

const iso = (date) => {
  return date.toISOString().split("T")[0];
};

const defaultPickup = iso(
  new Date(today.getTime() + 864e5)
);

const defaultReturn = iso(
  new Date(today.getTime() + 4 * 864e5)
);

function BookingFlow({ car }) {
  const router = useNavigate();

  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [booking, setBooking] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [pickupLoc, setPickupLoc] = useState(
    car.location || ""
  );

  const [dropLoc, setDropLoc] = useState(
    car.location || ""
  );

  const [pickupDate, setPickupDate] =
    useState(defaultPickup);

  const [returnDate, setReturnDate] =
    useState(defaultReturn);

  const [addInsurance, setAddInsurance] =
    useState(true);

  const [addDriver, setAddDriver] =
    useState(false);

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [license, setLicense] =
    useState("");

  const [payMethod, setPayMethod] =
    useState("card");

  const days = useMemo(() => {
    const pickup = new Date(pickupDate).getTime();
    const returned = new Date(returnDate).getTime();

    const difference = Math.round(
      (returned - pickup) / 864e5
    );

    return difference > 0 ? difference : 1;
  }, [pickupDate, returnDate]);

  const subtotal =
    Number(car.pricePerDay || 0) * days;

  // Keeping your existing simulated fee structure
  const serviceFee = 25;

  const insurance = addInsurance
    ? 15 * days
    : 0;

  const driver = addDriver
    ? 30 * days
    : 0;

  const taxes = Math.round(
    (subtotal +
      serviceFee +
      insurance +
      driver) *
      0.08
  );

  const total =
    subtotal +
    serviceFee +
    insurance +
    driver +
    taxes;

  const canProceed = () => {
    if (step === 0) {
      return Boolean(
        pickupLoc &&
          dropLoc &&
          pickupDate &&
          returnDate &&
          new Date(returnDate) > new Date(pickupDate)
      );
    }

    if (step === 1) {
      return Boolean(
        firstName &&
          lastName &&
          email &&
          phone &&
          license
      );
    }

    return true;
  };

  const createBooking = async () => {
    if (submitting) return;

    try {
      setSubmitting(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/bookings`,
        {
          carId: car._id,

          pickupLocation: pickupLoc,
          dropLocation: dropLoc,

          pickupDate,
          returnDate,

          firstName,
          lastName,
          email,
          phone,
          license,

          days,

          subtotal,
          serviceFee,
          insurance,
          additionalDriver: driver,
          taxes,
          total,

          paymentMethod: payMethod,
        },
        {
          withCredentials: true,
        }
      );

      setBooking(response.data.booking);
      setDone(true);

      toast.success(
        "Booking request sent to the owner"
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(
        "Failed to create booking:",
        error
      );

      toast.error(
        error.response?.data?.msg ||
          "Failed to send booking request"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    if (!canProceed()) {
      if (
        step === 0 &&
        new Date(returnDate) <=
          new Date(pickupDate)
      ) {
        toast.error(
          "Return date must be after pickup date"
        );
      } else {
        toast.error(
          "Please fill in all required fields"
        );
      }

      return;
    }

    if (step < STEPS.length - 1) {
      setStep((current) => current + 1);
      return;
    }

    createBooking();
  };

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <Clock3 className="size-9" />
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight">
          Booking Request Sent
        </h1>

        <p className="mt-2 text-muted-foreground">
          Your request has been sent to the car owner.
          Your booking will remain pending until the
          owner accepts or rejects it.
        </p>

        <Card className="mt-8 overflow-hidden text-left">
          <div className="flex items-center gap-4 border-b bg-muted/40 p-5">
            <Image
              src={
                car.image ||
                "/placeholder.svg"
              }
              alt={`${car.brand} ${car.model}`}
              width={90}
              height={60}
              className="rounded-lg object-cover"
            />

            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">
                Booking ID
              </p>

              <p className="truncate font-mono text-lg font-bold">
                {booking?._id || "Processing"}
              </p>
            </div>

            <Badge className="ml-auto bg-amber-100 text-amber-700 hover:bg-amber-100">
              Pending
            </Badge>
          </div>

          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <Detail
              label="Vehicle"
              value={`${car.brand} ${car.model}`}
            />

            <Detail
              label="Total"
              value={`₹${total}`}
            />

            <Detail
              label="Pickup"
              value={`${formatDate(
                pickupDate
              )} · ${pickupLoc}`}
            />

            <Detail
              label="Return"
              value={`${formatDate(
                returnDate
              )} · ${dropLoc}`}
            />
          </div>
        </Card>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link to="/bookings">
              <CircleCheck className="mr-2 size-4" />
              View My Bookings
            </Link>
          </Button>

          <Button
            variant="outline"
            asChild
          >
            <Link to="/cars">
              Browse More Cars
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 -ml-2 text-muted-foreground"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-1 size-4" />
        Back
      </Button>

      {/* Step indicator */}
      <div className="mb-10 flex items-center justify-center">
        {STEPS.map((label, index) => (
          <div
            key={label}
            className="flex items-center"
          >
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex size-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                  index < step &&
                    "border-primary bg-primary text-primary-foreground",
                  index === step &&
                    "border-primary text-primary",
                  index > step &&
                    "border-border text-muted-foreground"
                )}
              >
                {index < step ? (
                  <Check className="size-4" />
                ) : (
                  index + 1
                )}
              </div>

              <span
                className={cn(
                  "text-xs font-medium",
                  index <= step
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </div>

            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-3 h-0.5 w-12 sm:w-24",
                  index < step
                    ? "bg-primary"
                    : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          {/* STEP 1 */}
          {step === 0 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold">
                Where &amp; when?
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field
                  label="Pickup Location"
                  icon={MapPin}
                >
                  <Input
                    value={pickupLoc}
                    onChange={(event) =>
                      setPickupLoc(
                        event.target.value
                      )
                    }
                    placeholder="City or airport"
                  />
                </Field>

                <Field
                  label="Drop-off Location"
                  icon={MapPin}
                >
                  <Input
                    value={dropLoc}
                    onChange={(event) =>
                      setDropLoc(
                        event.target.value
                      )
                    }
                    placeholder="City or airport"
                  />
                </Field>

                <Field
                  label="Pickup Date"
                  icon={CalendarDays}
                >
                  <Input
                    type="date"
                    min={iso(new Date())}
                    value={pickupDate}
                    onChange={(event) =>
                      setPickupDate(
                        event.target.value
                      )
                    }
                  />
                </Field>

                <Field
                  label="Return Date"
                  icon={CalendarDays}
                >
                  <Input
                    type="date"
                    min={pickupDate}
                    value={returnDate}
                    onChange={(event) =>
                      setReturnDate(
                        event.target.value
                      )
                    }
                  />
                </Field>
              </div>

              <Separator className="my-6" />

              <h3 className="text-sm font-semibold">
                Add extras
              </h3>

              <div className="mt-4 space-y-3">
                <Extra
                  checked={addInsurance}
                  onChange={setAddInsurance}
                  title="Full Coverage Insurance"
                  desc="Zero-deductible protection for total peace of mind."
                  price="₹15/day"
                />

                <Extra
                  checked={addDriver}
                  onChange={setAddDriver}
                  title="Additional Driver"
                  desc="Add a second authorized driver to your rental."
                  price="₹30/day"
                />
              </div>
            </Card>
          )}

          {/* STEP 2 */}
          {step === 1 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold">
                Driver details
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="First Name">
                  <Input
                    value={firstName}
                    onChange={(event) =>
                      setFirstName(
                        event.target.value
                      )
                    }
                    placeholder="John"
                  />
                </Field>

                <Field label="Last Name">
                  <Input
                    value={lastName}
                    onChange={(event) =>
                      setLastName(
                        event.target.value
                      )
                    }
                    placeholder="Doe"
                  />
                </Field>

                <Field label="Email">
                  <Input
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }
                    placeholder="john@email.com"
                  />
                </Field>

                <Field label="Phone">
                  <Input
                    value={phone}
                    onChange={(event) =>
                      setPhone(
                        event.target.value
                      )
                    }
                    placeholder="+91 9876543210"
                  />
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Driver's License Number">
                    <Input
                      value={license}
                      onChange={(event) =>
                        setLicense(
                          event.target.value
                        )
                      }
                      placeholder="DL-1234-5678"
                    />
                  </Field>
                </div>
              </div>

              <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5 text-primary" />
                Your information is encrypted and secure.
              </p>
            </Card>
          )}

          {/* STEP 3 */}
          {step === 2 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold">
                Payment method
              </h2>

              <RadioGroup
                value={payMethod}
                onValueChange={setPayMethod}
                className="mt-6 space-y-3"
              >
                <PayOption
                  value="card"
                  current={payMethod}
                  icon={CreditCard}
                  label="Credit / Debit Card"
                />

                <PayOption
                  value="upi"
                  current={payMethod}
                  icon={Wallet}
                  label="UPI"
                />

                <PayOption
                  value="netbanking"
                  current={payMethod}
                  icon={Building2}
                  label="Net Banking"
                />
              </RadioGroup>

              {payMethod === "card" && (
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Field label="Card Number">
                      <Input placeholder="4242 4242 4242 4242" />
                    </Field>
                  </div>

                  <Field label="Name on Card">
                    <Input placeholder="John Doe" />
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Expiry">
                      <Input placeholder="MM/YY" />
                    </Field>

                    <Field label="CVV">
                      <Input placeholder="123" />
                    </Field>
                  </div>
                </div>
              )}

              {payMethod === "upi" && (
                <div className="mt-6">
                  <Field label="UPI ID">
                    <Input placeholder="yourname@bank" />
                  </Field>
                </div>
              )}

              {payMethod === "netbanking" && (
                <div className="mt-6">
                  <Field label="Select Bank">
                    <Input placeholder="e.g. HDFC, SBI, ICICI" />
                  </Field>
                </div>
              )}

              <p className="mt-6 flex items-center gap-2 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                <Lock className="size-3.5 text-primary" />
                This is a simulated payment. No real charge will be made.
              </p>
            </Card>
          )}

          {/* Navigation buttons */}
          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              onClick={() =>
                step === 0
                  ? router.back()
                  : setStep(
                      (current) => current - 1
                    )
              }
              disabled={submitting}
            >
              <ArrowLeft className="mr-1 size-4" />

              {step === 0 ? "Cancel" : "Back"}
            </Button>

            <Button
              onClick={handleNext}
              disabled={submitting}
            >
              {submitting
                ? "Sending Request..."
                : step === STEPS.length - 1
                  ? `Send Booking Request · ₹${total}`
                  : "Continue"}

              {!submitting &&
                step !==
                  STEPS.length - 1 && (
                  <ArrowRight className="ml-1 size-4" />
                )}
            </Button>
          </div>
        </div>

        {/* Booking summary */}
        <div>
          <Card className="sticky top-24 overflow-hidden">
            <div className="flex gap-4 p-5">
              <Image
                src={
                  car.image ||
                  "/placeholder.svg"
                }
                alt={`${car.brand} ${car.model}`}
                width={100}
                height={70}
                className="rounded-lg object-cover"
              />

              <div className="min-w-0">
                <h3 className="truncate font-semibold">
                  {car.brand} {car.model}
                </h3>

                <p className="text-xs text-muted-foreground">
                  {car.location} · {car.year}
                </p>

                <p className="mt-1 text-sm">
                  <span className="font-bold">
                    ₹{car.pricePerDay}
                  </span>

                  <span className="text-muted-foreground">
                    /day
                  </span>
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-3 p-5 text-sm">
              <Row
                label={`₹${car.pricePerDay} × ${days} days`}
                value={`₹${subtotal}`}
              />

              <Row
                label="Service fee"
                value={`₹${serviceFee}`}
              />

              {addInsurance && (
                <Row
                  label="Full coverage insurance"
                  value={`₹${insurance}`}
                />
              )}

              {addDriver && (
                <Row
                  label="Additional driver"
                  value={`₹${driver}`}
                />
              )}

              <Row
                label="Taxes (8%)"
                value={`₹${taxes}`}
              />

              <Separator className="my-1" />

              <Row
                label="Total"
                value={`₹${total}`}
                bold
              />
            </div>

            <div className="border-t bg-muted/40 p-4">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5 text-primary" />

                Your booking will remain pending until
                the owner confirms it.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  children,
}) {
  const id = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  return (
    <div className="space-y-2">
      <Label
        htmlFor={id}
        className="flex items-center gap-1.5 text-sm"
      >
        {Icon && (
          <Icon className="size-3.5 text-muted-foreground" />
        )}

        {label}
      </Label>

      {React.isValidElement(children)
        ? React.cloneElement(children, {
            id,
          })
        : children}
    </div>
  );
}

function Extra({
  checked,
  onChange,
  title,
  desc,
  price,
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors hover:bg-muted/40">
      <Checkbox
        checked={checked}
        onCheckedChange={(value) =>
          onChange(Boolean(value))
        }
        className="mt-0.5"
      />

      <div className="flex-1">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-semibold">
            {title}
          </span>

          <span className="text-sm font-semibold text-primary">
            {price}
          </span>
        </div>

        <p className="mt-0.5 text-xs text-muted-foreground">
          {desc}
        </p>
      </div>
    </label>
  );
}

function PayOption({
  value,
  current,
  icon: Icon,
  label,
}) {
  const active = value === current;

  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors",
        active
          ? "border-primary bg-secondary/40"
          : "hover:bg-muted/40"
      )}
    >
      <RadioGroupItem value={value} />

      <Icon
        className={cn(
          "size-5",
          active
            ? "text-primary"
            : "text-muted-foreground"
        )}
      />

      <span className="text-sm font-medium">
        {label}
      </span>
    </label>
  );
}

function Row({
  label,
  value,
  bold = false,
}) {
  return (
    <div className="flex justify-between gap-4">
      <span
        className={cn(
          bold
            ? "font-semibold"
            : "text-muted-foreground"
        )}
      >
        {label}
      </span>

      <span
        className={cn(
          bold
            ? "text-base font-bold"
            : "font-medium"
        )}
      >
        {value}
      </span>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-0.5 font-medium">
        {value}
      </p>
    </div>
  );
}

function formatDate(date) {
  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

export { BookingFlow };
