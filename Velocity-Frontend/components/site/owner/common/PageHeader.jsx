import {
  Plus,
} from "lucide-react";

function PageHeader({
  title,
  description,
  button,
  onButtonClick,
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">

      <div>

        <p className="mb-2 text-sm font-medium text-blue-600">
          Owner Portal
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {description}
        </p>

      </div>

      {button && (
        <button
          onClick={onButtonClick}
          className="
            flex w-fit items-center
            gap-2 rounded-xl
            bg-blue-600 px-5 py-3
            text-sm font-semibold
            text-white shadow-lg
            shadow-blue-600/20
            hover:bg-blue-700
          "
        >
          <Plus className="h-4 w-4" />

          {button}

        </button>
      )}

    </div>
  );
}

/* ================================================= */
/* STAT CARD */
/* ================================================= */

export default PageHeader;
