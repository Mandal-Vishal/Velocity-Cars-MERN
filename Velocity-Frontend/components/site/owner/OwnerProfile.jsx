import { Save } from "lucide-react";

import PageHeader from "./common/PageHeader";
import ProfileField from "./common/ProfileField";

function OwnerProfile({ user }) {
  return (
    <>
      <PageHeader
        title="Profile"
        description="Manage your owner account information."
      />

      <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
            {user?.firstName?.[0] || "O"}
            {user?.lastName?.[0] || ""}
          </div>

          <div>

            <h2 className="text-xl font-bold">
              {user?.firstName || "Owner"}{" "}
              {user?.lastName || ""}
            </h2>

            <p className="text-sm text-slate-500">
              Vehicle Owner
            </p>

          </div>

        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">

          <ProfileField
            label="First Name"
            value={user?.firstName || ""}
          />

          <ProfileField
            label="Last Name"
            value={user?.lastName || ""}
          />

          <ProfileField
            label="Email"
            value={user?.email || ""}
          />

          <ProfileField
            label="Role"
            value={user?.role || "Owner"}
          />

        </div>

        <button className="mt-6 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">

          <Save className="h-4 w-4" />

          Save Changes

        </button>

      </div>
    </>
  );
}

export default OwnerProfile;