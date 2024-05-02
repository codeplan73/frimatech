import { z } from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

const baseRegisterSchema = {
  name: z.string().min(1, {
    message: "Name is required",
  }),
  phone_number: z.string().min(3, { message: "Please enter phone number" }),
  address: z.string().min(3, { message: "Please enter your address" }),
  city: z.string().min(3, { message: "Please enter your city" }),
  state: z.string().min(3, { message: "Please enter your statee" }),
  gender: z.string().min(3, { message: "Please select your gender" }),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  confirmPassword: z
    .string()
    .min(6, "Enter confirm password")
    .max(50, "Password must be less than 50 characters"),
};

export const RegisterSchema = z
  .object(baseRegisterSchema)
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password doesn't match!",
    path: ["confirmPassword"],
  });

const baseUpdateSchema = {
  name: baseRegisterSchema.name,
  phone_number: baseRegisterSchema.phone_number,
  address: baseRegisterSchema.address,
  city: baseRegisterSchema.city,
  email: baseRegisterSchema.email,
  marital_status: z.string().min(3, { message: "marital status is required" }),
  nationality: z.string().min(3, { message: "Nationality is required" }),
  dob: z.string().min(3, { message: "Date of birth is required" }),
  gender: z.string().min(3, { message: "Please select your gender" }),
  postal_code: z.string().min(3, { message: "Please enter your Postcode" }),
  employee_id: z.string().min(3, { message: "Employee ID is required" }),
  employment_date: z
    .string()
    .min(3, { message: "Please enter your joining date" }),
  employment_type: z
    .string()
    .min(3, { message: "Please enter your employment type" }),
  working_days: z.string().min(3, { message: "Working days required" }),
  // status: z.string().min(3, { message: "Please enter Work status" }),
};

export const UpdateStaffSchema = z.object(baseUpdateSchema);

export const priceSchema = z.object({
  id: z.string().min(1, { message: "Id is required" }),
  hourly_rate: z.string().min(1, { message: "Hourly Rate is required" }),
  bedroom_count: z.string().min(1, { message: "bedroom amount is required" }),
  bathroom_count: z.string().min(1, { message: "bathroom amount is required" }),
  standard: z.string().min(1, { message: "standard amount is required" }),
  deep_clean: z.string().min(1, { message: "deep clean amount is required" }),
  move_in_out: z.string().min(1, { message: "Move in/out price is required" }),
  post_construction: z
    .string()
    .min(1, { message: "Post Construction amount is required" }),
  extra_task: z.string().min(1, { message: "Extra task amount is required" }),
  bring_our_own_materials: z
    .string()
    .min(1, { message: "Our material price is required" }),
});
