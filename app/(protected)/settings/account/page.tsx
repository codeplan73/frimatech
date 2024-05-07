"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import Spinner from "@/components/Spinner";
import BreadCumNav from "@/components/BreadCumNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { UserSchema } from "@/schema";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import InputControlled from "@/components/form-fields/inputControlled";
import { useSession } from "next-auth/react";
import InputWrapper from "@/components/form-fields/InputWrapper";
import { IoIosSend } from "react-icons/io";

export type userFormData = z.infer<typeof UserSchema>;

const PricePage = () => {
  const [userData, setUserData] = useState<userFormData | null>(null);
  const router = useRouter();
  const [isPending, setSubmitting] = useState(false);
  const session = useSession();

  const id = session.data?.user.id;
  const user = session.data?.user;

  useEffect(() => {
    async function getUserData() {
      const res = await axios.get(`/api/users/${id}`);
      setUserData(res.data);
    }
    getUserData();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<userFormData>({
    resolver: zodResolver(UserSchema),
  });

  const handleProfileUpdate = async (data: userFormData) => {
    const formData = { ...data, id };
    console.log(formData);
    try {
      setSubmitting(true);
      const response = await axios.patch(`/api/users/${id}`, formData);
      console.log(response);
      toast.success(response.data.message);
      router.push("/settings");
      setSubmitting(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (!userData) {
    return <Spinner />;
  }

  return (
    <div>
      <BreadCumNav
        dashboard="dashboard"
        currentPage="settings"
        currentSection="Account Settings"
      />

      <div className="py-4 bg-whites">
        <Card className="w-full">
          <CardContent>
            <form
              onSubmit={handleSubmit(handleProfileUpdate)}
              className="grid py-4 items-center gap-6"
            >
              <CardTitle>Account Setting</CardTitle>
              <InputWrapper>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={userData?.name ?? ""}
                  render={({ field }) => (
                    <InputControlled
                      {...field}
                      control={control} // <-- add this
                      errors={errors}
                      label="Fullname"
                      placeholder="Fullname"
                      disabled={isPending}
                    />
                  )}
                />
                <Controller
                  name="phone_number"
                  control={control}
                  defaultValue={userData?.phone_number ?? ""}
                  render={({ field }) => (
                    <InputControlled
                      {...field}
                      control={control} // <-- add this
                      errors={errors}
                      label="Phone Number"
                      placeholder="Phone Number"
                      readOnly
                      disabled={isPending}
                    />
                  )}
                />
              </InputWrapper>
              <InputWrapper>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue={userData?.gender ?? ""}
                  render={({ field }) => (
                    <InputControlled
                      {...field}
                      control={control} // <-- add this
                      errors={errors}
                      label="Gender"
                      placeholder="Gender"
                      disabled={isPending}
                    />
                  )}
                />
                <Controller
                  name="address"
                  control={control}
                  defaultValue={userData?.address ?? ""}
                  render={({ field }) => (
                    <InputControlled
                      {...field}
                      control={control} // <-- add this
                      errors={errors}
                      label="Address"
                      placeholder="Address"
                      disabled={isPending}
                    />
                  )}
                />
              </InputWrapper>

              <InputWrapper>
                <Controller
                  name="city"
                  control={control}
                  defaultValue={userData?.city ?? ""}
                  render={({ field }) => (
                    <InputControlled
                      {...field}
                      control={control} // <-- add this
                      errors={errors}
                      label="City"
                      placeholder="City"
                      disabled={isPending}
                    />
                  )}
                />
                <Controller
                  name="state"
                  control={control}
                  defaultValue={userData?.state ?? ""}
                  render={({ field }) => (
                    <InputControlled
                      {...field}
                      control={control} // <-- add this
                      errors={errors}
                      label="State"
                      placeholder="State"
                      disabled={isPending}
                    />
                  )}
                />
              </InputWrapper>

              <InputWrapper>
                <Button
                  disabled={isPending}
                  className="bg-textPrimary text-bgPrimary font-semibold text-md hover:bg-bgPrimary hover:text-textPrimary"
                  type="submit"
                >
                  {isPending && <Spinner />}
                  <IoIosSend className="text-md" />
                  <span className="ml-1">Update Settings</span>
                </Button>
              </InputWrapper>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PricePage;
