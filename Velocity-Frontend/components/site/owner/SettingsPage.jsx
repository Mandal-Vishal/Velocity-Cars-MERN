import { useState } from "react";

import {
  Settings,
} from "lucide-react";

import PageHeader from "./common/PageHeader";
import SettingRow from "./common/SettingRow";

function SettingsPage() {
  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [bookingNotifications, setBookingNotifications] =
    useState(true);

  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage your dashboard preferences."
      />

      <div className="max-w-3xl space-y-5">

        <SettingRow
          title="Email Notifications"
          description="Receive important updates through email."
          enabled={emailNotifications}
          setEnabled={setEmailNotifications}
        />

        <SettingRow
          title="Booking Notifications"
          description="Get notified when someone books your car."
          enabled={bookingNotifications}
          setEnabled={setBookingNotifications}
        />

      </div>
    </>
  );
}

/* ================================================= */
/* ADD CAR MODAL */
/* ================================================= */

export default SettingsPage;
