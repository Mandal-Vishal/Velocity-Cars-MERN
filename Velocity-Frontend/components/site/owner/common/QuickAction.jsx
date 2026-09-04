import {
  ArrowUpRight,
} from "lucide-react";

function QuickAction({
  icon: Icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="
        group flex items-center
        gap-4 rounded-2xl
        border border-slate-200
        bg-white p-4
        text-left shadow-sm
        transition duration-300
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >

      <div className="
        flex h-11 w-11
        shrink-0 items-center
        justify-center
        rounded-xl
        bg-blue-50
        text-blue-600
        transition
        group-hover:scale-105
      ">
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="mt-1 truncate text-xs text-slate-400">
          {description}
        </p>

      </div>

      <ArrowUpRight
        className="
          h-4 w-4
          text-slate-300
          transition
          group-hover:text-blue-600
        "
      />

    </button>
  );
}

/* ================================================= */
/* PROFILE FIELD */
/* ================================================= */

export default QuickAction;
