import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";

function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Message sent successfully!");

    setSent(true);
  };

  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-[.8fr_1.2fr] md:py-24">
      <div>
        <span className="text-sm font-semibold uppercase tracking-wide text-primary">
          Contact us
        </span>

        <h1 className="mt-3 font-display text-4xl font-extrabold text-secondary">
          We're here to help.
        </h1>

        <p className="mt-5 leading-relaxed text-muted-foreground">
          Questions about a booking or need help choosing a car? Our team is
          ready to help.
        </p>

        <div className="mt-10 space-y-5 text-sm">
          <p className="flex items-center gap-3">
            <Mail className="size-5 text-primary" />
            hello@velocity.rent
          </p>

          <p className="flex items-center gap-3">
            <Phone className="size-5 text-primary" />
            +1 (800) 555-0198
          </p>

          <p className="flex items-center gap-3">
            <MapPin className="size-5 text-primary" />
            100 Market Street, New York
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        {sent ? (
          <div className="py-14 text-center">
            <CheckCircle2 className="mx-auto size-12 text-primary" />

            <h2 className="mt-4 font-display text-2xl font-bold text-secondary">
              Message sent
            </h2>

            <p className="mt-2 text-muted-foreground">
              We'll get back to you shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Name
                </Label>

                <Input
                  id="name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">
                  Email
                </Label>

                <Input
                  id="contact-email"
                  type="email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">
                Subject
              </Label>

              <Input
                id="subject"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">
                Message
              </Label>

              <Textarea
                id="message"
                rows={6}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-full"
            >
              Send message
            </Button>
          </form>
        )}
      </div>
    </main>
  );
}

export { ContactPage as default };