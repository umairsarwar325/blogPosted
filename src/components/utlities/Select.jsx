import React, { useId } from "react";

const Select = React.forwardRef(
  ({ label, options, className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full flex items-center justify-between mt-4">
        {label && (
          <label className="inline-block mr-3 pl-1 font-bold" htmlFor={id}>
            {label}
          </label>
        )}
        <select
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:border-zinc-950 duration-200 border-2 border-zinc-400 ${className}`}
          {...props}
          ref={ref}
          id={id}
        >
          {options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }
);
export default Select;
