import React, { useId } from "react";

const Input = React.forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full flex items-center justify-between mt-4">
        {label && (
          <label className="inline-block mr-3 pl-1 font-bold" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          type={type}
          className={`px-3 py-2 rounded-lg bg-zinc-300 text-black outline-none focus:border-zinc-500 duration-200 border-2 border-zinc-400 sm:w-[60%] ${className}`}
          {...props}
          ref={ref}
          id={id}
        />
      </div>
    );
  }
);
export default Input;
