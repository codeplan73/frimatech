// InputField.tsx
import React from "react";
import { Textarea } from "@/components/ui/textarea";

type InputFieldProps = React.ComponentProps<typeof Textarea> & {
  errors: any;
  register: any;
  label?: string;
  name: string;
  type?: string;
  disabled?: boolean;
  value?: string;
  placeholder?: string;
  hidden?: boolean;
};

const InputTextArea: React.FC<InputFieldProps> = ({
  errors,
  label,
  register,
  name,
  type,
  disabled,
  value,
  placeholder,
  hidden,
}) => (
  <div className="flex flex-col space-y-1.5 w-full">
    <label htmlFor={label}>{label}</label>
    <Textarea
      {...register(name)}
      type={type}
      className={`text-md p-4   ${errors[name] ? "border-red-500" : ""}`}
      disabled={disabled}
      defaultValue={value}
      placeholder={placeholder}
      hidden={hidden}
    />
    <p className="text-red-600 text-xs font-extralight">
      {errors[name]?.message}
    </p>
  </div>
);

export default InputTextArea;
