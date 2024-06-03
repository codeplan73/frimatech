"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/schema";
import InputField from "@/components/form-fields/InputField";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Spinner from "@/components/Spinner";

export type LoginFormData = z.infer<typeof LoginSchema>;

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
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      setSubmitting(true);
      await axios.post("/api/auth/login", data);
      router.refresh();
      router.push("/auth/login");
      setSubmitting(false);
    } catch (error: any) {
      setSubmitting(false);
      console.error(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="flex items-center justify-center px-10 py-16">
      <Card className="w-[420px]">
        <CardHeader>
          <CardTitle>Secure Login</CardTitle>
          <CardDescription>
            Enter your account details to continue shopping
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(handleLogin)}>
          <CardContent>
            <div className="grid items-center w-full gap-4">
              <div className="flex flex-col space-y-1.5">
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
              <div className="flex flex-col space-y-1.5">
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
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              disabled={isPending}
              type="submit"
              className="w-full bg-bgPrimary text-textPrimary hover:text-white"
            >
              {isPending && <Spinner />}
              <span className="ml-1"> SignIn</span>
            </Button>
          </CardFooter>
          <CardFooter className="flex justify-between">
            <Link className="text-sm underline" href="/auth/forgot">
              Forgot Password
            </Link>
            <Link className="text-sm underline" href="/auth/register">
              Create Account
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RegisterForm;
