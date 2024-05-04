import React from "react";

interface SelectFieldProps {
  register: any;
  options: { value: string; label: string }[];
  label: string;
  name: string;
  errors: any;
}

const SelectField: React.FC<SelectFieldProps> = ({
  register,
  options,
  label,
  name,
  errors,
}) => {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <label htmlFor={name}>{label}</label>
      <select
        {...register(name)}
        className={`border focus:outline-blue-400 rounded-md p-2  ${
          errors[name] ? "border-red-500" : "border-slate-300"
        }`}
      >
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p className="text-red-600 text-xs font-extralight">
        {errors[name]?.message}
      </p>
    </div>
  );
};

export default SelectField;
