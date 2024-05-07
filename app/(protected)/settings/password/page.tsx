"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import Spinner from "@/components/Spinner";
import BreadCumNav from "@/components/BreadCumNav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import InputWrapper from "@/components/form-fields/InputWrapper";
import { IoIosSend } from "react-icons/io";
import InputField from "@/components/form-fields/InputField";
import { PasswordSchema } from "@/schema";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export type userPasswordData = z.infer<typeof PasswordSchema>;

const PasswordPage = () => {
  const [isPending, setSubmitting] = useState(false);
  const router = useRouter();
  const session = useSession();
  const id = session.data?.user.id;

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<userPasswordData>({
    resolver: zodResolver(PasswordSchema),
  });

  const handlePasswordUpdate = async (data: userPasswordData) => {
    const formData = { ...data, id };
    console.log(formData);
    try {
      setSubmitting(true);
      const response = await axios.patch(`/api/users/password/${id}`, formData);
      toast.success(response.data.message);
      router.push("/settings");
      setSubmitting(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <BreadCumNav
        dashboard="dashoard"
        currentPage="settings"
        currentSection="Password"
      />

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update Password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handlePasswordUpdate)}>
            <div className="grid w-full items-center gap-8">
              <InputWrapper>
                <InputField
                  label="New Password"
                  register={register}
                  placeholder="Enter New Password"
                  type="password"
                  errors={errors}
                  name="password"
                  disabled={isPending}
                />
                {/* </InputWrapper>
              <InputWrapper> */}
                <InputField
                  label="Password Confirmation"
                  register={register}
                  placeholder="Enter Password Confirmation"
                  type="password"
                  errors={errors}
                  name="confirm_password"
                  disabled={isPending}
                />
              </InputWrapper>
            </div>
            <InputWrapper>
              <Button
                disabled={isPending}
                className="bg-textPrimary text-bgPrimary font-semibold text-md hover:bg-bgPrimary hover:text-textPrimary"
                type="submit"
              >
                {isPending && <Spinner />}
                <IoIosSend className="text-md" />
                <span className="ml-1">Update Password</span>
              </Button>
            </InputWrapper>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordPage;
