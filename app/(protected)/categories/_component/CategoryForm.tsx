"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import Spinner from "@/components/Spinner";
import { IoIosSend } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ProductSchema } from "@/schema";
import InputField from "@/components/form-fields/InputField";
import InputFieldWrapper from "@/components/form-fields/InputWrapper";

export type ProductSchemaData = z.infer<typeof ProductSchema>;

const CategoryForm = () => {
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
  } = useForm<ProductSchemaData>({
    resolver: zodResolver(ProductSchema),
  });

  const handleRegister = async (data: ProductSchemaData) => {
    try {
      setSubmitting(true);

      const response = await axios.post("/api/category", data);
      toast.success(response.data.message);
      router.refresh();
      router.push("/products");
      setSubmitting(false);
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="w-full md:w-10/12 flex flex-col items-start md:gap-4 gap-6 bg-white p-4"
    >
      <InputFieldWrapper>
        <InputField
          label="Price"
          register={register}
          placeholder="Enter Category Name"
          type="text"
          errors={errors}
          name="name"
          disabled={isPending}
        />
        <InputField
          label="Quantity"
          register={register}
          placeholder="Enter Category Label"
          type="text"
          errors={errors}
          name="label"
          disabled={isPending}
        />
      </InputFieldWrapper>

      <InputFieldWrapper>
        <Button
          disabled={isPending}
          className="bg-textPrimary text-bgPrimary font-semibold text-md hover:bg-bgPrimary hover:text-textPrimary"
          type="submit"
        >
          {isPending && <Spinner />}
          <IoIosSend className="text-md" />
          <span className="ml-1">Add Category</span>
        </Button>
      </InputFieldWrapper>
    </form>
  );
};

export const revalidate = 1;

export default CategoryForm;
