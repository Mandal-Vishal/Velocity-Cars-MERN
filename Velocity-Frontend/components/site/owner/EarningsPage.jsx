import {
  Wallet,
  TrendingUp,
  Clock3,
} from "lucide-react";

import PageHeader from "./common/PageHeader";
import StatCard from "./common/StatCard";

function EarningsPage() {
  return (
    <>
      <PageHeader
        title="Earnings"
        description="Track your rental income and financial performance."
      />

      <div className="grid gap-5 md:grid-cols-3">

        <StatCard
          title="This Month"
          value="₹1,24,500"
          description="+18% from last month"
          icon={Wallet}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          positive
        />

        <StatCard
          title="This Year"
          value="₹8,42,000"
          description="Total earnings"
          icon={TrendingUp}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Pending Payout"
          value="₹18,500"
          description="Will be paid soon"
          icon={Clock3}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />

      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-lg font-bold">
          Monthly Earnings
        </h2>

        <div className="mt-8 flex h-64 items-end gap-3">

          {[
            35,
            50,
            42,
            65,
            55,
            75,
            62,
            82,
            70,
            90,
            78,
            100,
          ].map((height, index) => (
            <div
              key={index}
              className="flex flex-1 items-end"
            >

              <div
                style={{
                  height: `${height}%`,
                }}
                className="
                  w-full rounded-t-lg
                  bg-blue-100
                  transition
                  hover:bg-blue-500
                "
              />

            </div>
          ))}

        </div>

      </div>
    </>
  );
}

export default EarningsPage;