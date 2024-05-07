import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

type InputFieldProps = React.ComponentProps<typeof Input> & {
  control: any;
  errors: any;
  label?: string;
  name: string;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  hidden?: boolean;
};

const InputControlled: React.FC<InputFieldProps> = ({
  control,
  errors,
  label,
  name,
  type,
  disabled,
  placeholder,
  hidden,
}) => (
  <div className="w-full space-y-1">
    <label htmlFor={label}>{label}</label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          type={type}
          className={`text-lg p-4 ${errors[name] ? "border-red-500" : ""}`}
          disabled={disabled}
          placeholder={placeholder}
          hidden={hidden}
        />
      )}
    />
    <p className="text-red-600 text-xs font-extralight">
      {errors[name]?.message}
    </p>
  </div>
);

export default InputControlled;
