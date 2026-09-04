function SettingRow({
  title,
  description,
  enabled,
  setEnabled,
}) {
  return (
    <div className="
      flex items-center
      justify-between
      rounded-2xl
      border border-slate-200
      bg-white p-5
      shadow-sm
    ">

      <div>

        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>

      </div>

      <button
        onClick={() =>
          setEnabled(!enabled)
        }
        className={`
          relative h-6 w-11
          rounded-full transition
          ${enabled
            ? "bg-blue-600"
            : "bg-slate-300"
          }
        `}
      >

        <span
          className={`
            absolute top-1
            h-4 w-4 rounded-full
            bg-white transition
            ${enabled
              ? "left-6"
              : "left-1"
            }
          `}
        />

      </button>

    </div>
  );
}


export default SettingRow;
