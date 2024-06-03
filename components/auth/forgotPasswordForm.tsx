"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { ResetSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import InputField from "@/components/form-fields/InputField";
import { forgotPassword } from "@/actions/sendResetMail";

export type ResetPasswordFormData = z.infer<typeof ResetSchema>;

const ForgotPasswordForm = () => {
  const [isPending, setSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetSchema),
  });

  const handleReset = async (data: ResetPasswordFormData) => {
    forgotPassword(data.email);
    // try {
    //   setSubmitting(true);
    //   await axios.post("/api/auth/login", data);
    //   router.refresh();
    //   router.push("/auth/login");
    //   setSubmitting(false);
    // } catch (error: any) {
    //   setSubmitting(false);
    //   console.error(error.response.data.error);
    //   toast.error(error.response.data.error);
    // }
  };
  return (
    <form onSubmit={handleSubmit(handleReset)}>
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
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="submit"
          className="w-full bg-bgPrimary text-textPrimary hover:text-white"
        >
          Send Reset Link
        </Button>
      </CardFooter>
    </form>
  );
};

export default ForgotPasswordForm;
