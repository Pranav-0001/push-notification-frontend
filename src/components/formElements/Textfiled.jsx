import React from "react";

export default function Textfiled({
  placeholder,
  label,
  required,
  error,
  touched,
  ...rest
}) {
  return (
    <>
      <p>
        {label} {required && <span className="text-red-600">*</span>}
      </p>
      <input
        type="text"
        className={`outline-none border w-full  rounded shadow h-10 px-2 ${
          touched && error && "border-red-500"
        }`}
        placeholder={placeholder}
        {...rest}
      />
      {touched && error && <p className="text-xs text-red-600">{error}</p>}
    </>
  );
}
