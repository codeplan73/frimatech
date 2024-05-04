"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { any, set, z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { RegisterSchema } from "@/schema";
import InputField from "@/components/form-fields/InputField";
import SelectField from "@/components/form-fields/SelectField";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Spinner from "../Spinner";

export type RegisterFormData = z.infer<typeof RegisterSchema>;

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setSubmitting] = useState(false);

  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const handleRegister = async (data: RegisterFormData) => {
    try {
      setSubmitting(true);
      await axios.post("/api/auth/register", data);
      toast.success("Account Created successfully!");
      router.refresh();
      router.push("/auth/login");
      setSubmitting(false);
    } catch (error: any) {
      setSubmitting(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justiy-center py-16 px-10 w-full">
      <Card className="w-full md:w-6/12 mx-auto">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            Enter your account details to continue shopping
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(handleRegister)}>
          <CardContent>
            <div className="flex flex-col w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 w-full">
                <InputField
                  label="Fullname"
                  register={register}
                  placeholder="Full Name"
                  type="text"
                  errors={errors}
                  name="name"
                  disabled={isPending}
                />
              </div>
              <div className="flex flex-col space-y-1.5 w-full">
                <InputField
                  label="Address"
                  register={register}
                  placeholder="Enter Address"
                  type="text"
                  errors={errors}
                  name="address"
                  disabled={isPending}
                />
              </div>
              <div className="flex flex-col md:flex-row w-full gap-4">
                <div className="flex flex-col space-y-1.5 flex-1">
                  <InputField
                    label="Email"
                    register={register}
                    placeholder="Enter Email Address"
                    type="email"
                    errors={errors}
                    name="email"
                    disabled={isPending}
                  />
                </div>
                <div className="flex flex-col space-y-1.5 flex-1">
                  <InputField
                    label="Phone Number"
                    register={register}
                    placeholder="Enter Phone Number"
                    type="text"
                    errors={errors}
                    name="phone_number"
                    disabled={isPending}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row w-full gap-4">
                <div className="flex flex-col space-y-1.5 flex-1">
                  <InputField
                    label="City"
                    register={register}
                    placeholder="Enter City"
                    type="text"
                    errors={errors}
                    name="city"
                    disabled={isPending}
                  />
                </div>
                <div className="flex flex-col space-y-1.5 flex-1">
                  <InputField
                    label="State"
                    register={register}
                    placeholder="Enter State"
                    type="text"
                    errors={errors}
                    name="state"
                    disabled={isPending}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row w-full gap-4">
                <div className="flex flex-col space-y-1.5 flex-1">
                  <SelectField
                    register={register}
                    options={[
                      { value: "", label: "Select Gender" },
                      { value: "Male", label: "Male" },
                      { value: "Female", label: "Female" },
                    ]}
                    label="Gender"
                    name="gender"
                    errors={errors}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row w-full gap-4">
                <div className="flex flex-col space-y-1.5 flex-1 ">
                  <InputField
                    label="Password"
                    register={register}
                    placeholder="Enter Password"
                    type="password"
                    errors={errors}
                    name="password"
                    disabled={isPending}
                  />
                </div>
                <div className="flex flex-col space-y-1.5 flex-1">
                  <InputField
                    label="Confirm Password"
                    register={register}
                    placeholder="Enter password Confirmation"
                    type="password"
                    errors={errors}
                    name="confirmPassword"
                    disabled={isPending}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-bgPrimary text-textPrimary hover:text-white"
            >
              {isPending && <Spinner />}
              <span className="ml-1"> Register Account</span>
            </Button>
          </CardFooter>
          <CardFooter className="flex justify-between">
            <Link className="underline text-sm" href="/auth/login">
              Already have an account? Login
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RegisterForm;
