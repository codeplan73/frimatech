"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import Spinner from "@/components/spinner";

import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { UpdateStaffSchema } from "@/schemas";
import InputField from "@/components/form-fields/InputField";
import InputFieldWrapper from "@/components/form-fields/InputFieldWrapper";
import SelectField from "@/components/form-fields/SelectField";
import { User } from "@prisma/client";
import UserDeleteAction from "./UserDeleteAction";

export type RegisterStaffFormData = z.infer<typeof UpdateStaffSchema>;

const EditForm = ({ user }: { user: User }) => {
  const [isPending, setSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterStaffFormData>({
    resolver: zodResolver(UpdateStaffSchema),
  });

  const handleRegisterStaff = async (data: RegisterStaffFormData) => {
    try {
      setSubmitting(true);
      const response = await axios.patch("/api/users/staff/" + user.id, data);
      if (response.status === 200) {
        toast.success("Staff details updated successfully!");
        router.refresh();
        router.push("/users");
        setSubmitting(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const router = useRouter();
  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit(handleRegisterStaff)}
        className="w-full md:w-10/12 flex flex-col items-start md:gap-4 gap-6 bg-white p-4"
      >
        <InputFieldWrapper>
          <InputField
            label="Fullname"
            register={register}
            placeholder="Full Name"
            type="text"
            errors={errors}
            name="name"
            disabled={isPending}
            value={user?.name}
          />
          <InputField
            label="Phone Number"
            register={register}
            type="text"
            errors={errors}
            name="phone_number"
            disabled={isPending}
            value={user?.phone_number ?? ""}
          />
        </InputFieldWrapper>
        <InputFieldWrapper>
          <SelectField
            register={register}
            options={[
              {
                value: user?.marital_status ?? "",
                label: user?.marital_status ?? "",
              },
              { value: "Single", label: "Single" },
              { value: "Married", label: "Married" },
              { value: "Widow", label: "Widow" },
              { value: "Widower", label: "Widower" },
              { value: "Divorced", label: "Divorced" },
            ]}
            label="Marital Status"
            name="marital_status"
            errors={errors}
          />

          <SelectField
            register={register}
            options={[
              {
                value: user?.gender ?? "",
                label: user?.gender ?? "",
              },
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
            ]}
            label="Gender"
            name="gender"
            errors={errors}
          />
        </InputFieldWrapper>
        <InputFieldWrapper>
          <InputField
            label="Email"
            register={register}
            type="email"
            errors={errors}
            name="email"
            disabled={isPending}
            value={user?.email ?? ""}
          />
          <InputField
            label="Date of Birth"
            register={register}
            type="date"
            errors={errors}
            name="dob"
            disabled={isPending}
            value={user?.dob ?? ""}
          />
        </InputFieldWrapper>
        <InputFieldWrapper>
          <InputField
            label="Address"
            register={register}
            type="text"
            errors={errors}
            name="address"
            disabled={isPending}
            value={user?.address ?? ""}
          />
        </InputFieldWrapper>
        <InputFieldWrapper>
          <InputField
            label="City"
            register={register}
            type="text"
            errors={errors}
            name="city"
            disabled={isPending}
            value={user?.city ?? ""}
          />
          <InputField
            label="Postal Code"
            register={register}
            type="text"
            errors={errors}
            name="postal_code"
            disabled={isPending}
            value={user?.postal_code ?? ""}
          />
          <InputField
            label="Nationality"
            register={register}
            type="text"
            errors={errors}
            name="nationality"
            disabled={isPending}
            value={user?.nationality ?? ""}
          />
        </InputFieldWrapper>
        <InputFieldWrapper>
          <InputField
            label="Employee ID"
            register={register}
            type="text"
            errors={errors}
            name="employee_id"
            disabled={isPending}
            value={user?.employee_id ?? ""}
          />

          <SelectField
            register={register}
            options={[
              {
                value: user?.employment_type ?? "",
                label: user?.employment_type ?? "",
              },
              { value: "Full-time", label: "Full-time" },
              { value: "Part-time", label: "Part-time" },
              { value: "Contract", label: "Contract" },
            ]}
            label="Employment Type"
            name="employment_type"
            errors={errors}
          />
        </InputFieldWrapper>
        <InputFieldWrapper>
          <InputField
            label="Employment Date"
            register={register}
            type="date"
            errors={errors}
            name="employment_date"
            value={user?.employment_date ?? ""}
            disabled={isPending}
          />
          <SelectField
            register={register}
            options={[
              {
                value: user?.working_days ?? "",
                label: user?.working_days ?? "",
              },
              { value: "Daily", label: "Daily" },
              { value: "Monday - Friday", label: "Monday - Friday" },
              { value: "Monday - Saturday", label: "Monday - Saturday" },
              { value: "Monday - Sunday", label: "Monday - Sunday" },
              { value: "Selected Days", label: "Selected Days" },
            ]}
            label="Working Days"
            name="working_days"
            errors={errors}
          />
        </InputFieldWrapper>

        <Button disabled={isPending} className="bg-warningColor" type="submit">
          {isPending && <Spinner />}
          <span className="ml-1"> Submit</span>
        </Button>
      </form>

      <div className="absolute bottom-4 md:left-32">
        <UserDeleteAction userId={user.id} name={user.name} />
      </div>
    </div>
  );
};

export default EditForm;
