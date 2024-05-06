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

export const ProductSchema = z.object({
  productName: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "description required" }),
  price: z.string().min(1, { message: "price required" }),
  imageUrl: z.string().optional(),
  category: z.string().min(1, { message: "category required" }),
  quantity: z.string().min(1, { message: "Quantity required" }),
  // imageUrl: z.array(z.string().url()).min(1, { message: "Image is required" }),
});
export const ProductUpdateSchema = z.object({
  id: z.string(),
  productName: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "description required" }),
  price: z.string().min(1, { message: "price required" }),
  imageUrl: z.string().optional(),
  category: z.string().min(1, { message: "category required" }),
  quantity: z.string().min(1, { message: "Quantity required" }),
  // imageUrl: z.array(z.string().url()).min(1, { message: "Image is required" }),
});

export const CategorySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  label: z.string().min(1, { message: "label required" }),
});

export const BlogSchema = z.object({
  title: z.string().min(8, { message: "Name is required" }),
  bodyText: z.string().min(15, { message: "label required" }),
  coverImage: z.string().optional(),
});

export const CommentSchema = z.object({
  username: z.string().min(1, { message: "name is required" }),
  comment: z.string().min(1, { message: "comment required" }),
  blogId: z.string().min(1, { message: "id required" }),
});
