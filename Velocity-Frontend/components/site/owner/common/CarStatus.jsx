function CarStatus({
  label,
  value,
  color,
}) {
  return (
    <div className="flex items-center gap-2">

      <span
        className={`
          h-2.5 w-2.5
          rounded-full ${color}
        `}
      />

      <span className="text-slate-600">
        {label}
      </span>

      <span className="font-semibold">
        {value}
      </span>

    </div>
  );
}

/* ================================================= */
/* QUICK ACTION */
/* ================================================= */

export default CarStatus;
