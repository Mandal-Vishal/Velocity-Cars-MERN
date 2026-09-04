import {
  ArrowUpRight,
} from "lucide-react";

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconBg,
  iconColor,
  positive,
}) {
  return (
    <div className="
      group rounded-2xl
      border border-slate-200
      bg-white p-5 shadow-sm
      transition duration-300
      hover:-translate-y-1
      hover:shadow-md
    ">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            {value}
          </h2>

        </div>

        <div
          className={`
            flex h-11 w-11
            items-center justify-center
            rounded-xl ${iconBg} ${iconColor}
          `}
        >
          <Icon className="h-5 w-5" />
        </div>

      </div>

      <div className="mt-4 flex items-center gap-1 text-xs">

        {positive && (
          <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
        )}

        <span
          className={
            positive
              ? "font-semibold text-emerald-600"
              : "text-slate-500"
          }
        >
          {description}
        </span>

      </div>

    </div>
  );
}

/* ================================================= */
/* CAR STATUS */
/* ================================================= */

export default StatCard;
