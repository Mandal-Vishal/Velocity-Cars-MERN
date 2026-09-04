function ProfileField({
  label,
  value,
}) {
  return (
    <div>

      <label className="
        mb-2 block
        text-xs font-semibold
        uppercase tracking-wide
        text-slate-400
      ">
        {label}
      </label>

      <input
        defaultValue={value}
        className="
          h-11 w-full
          rounded-lg
          border border-slate-200
          bg-slate-50
          px-3 text-sm
          outline-none
          focus:border-blue-500
          focus:bg-white
          focus:ring-2
          focus:ring-blue-100
        "
      />

    </div>
  );
}

/* ================================================= */
/* SETTING ROW */
/* ================================================= */

export default ProfileField;
