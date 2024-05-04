"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import Spinner from "@/components/spinner";
import { IoIosSend } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ProductSchema } from "@/schema";
import InputField from "@/components/form-fields/InputField";
import InputTextArea from "@/components/form-fields/InputTextArea";
import InputFieldWrapper from "@/components/form-fields/InputWrapper";
import SelectField from "@/components/form-fields/SelectField";
import { User } from "@prisma/client";
import ImageUpload from "@/app/(protected)/_components/ImageUpload";
import { Input } from "@/components/ui/input";

export type ProductSchemaData = z.infer<typeof ProductSchema>;

// const IssueForm = ({ issue }: { issue?: Issue }) => {
const NewForm = ({ user }: { user?: User }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string[]>([]);
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

  const handleRegisterStaff = async (data: ProductSchemaData) => {
    const productData = {
      ...data,
      imageUrl: imageUrl,
    };

    console.log(productData);
    try {
      // setSubmitting(true);
      const response = await axios.post("/api/products", productData);
      toast.success("Staff Created successfully!");
      router.refresh();
      router.push("/products");
      // setSubmitting(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegisterStaff)}
      className="w-full md:w-10/12 flex flex-col items-start md:gap-4 gap-6 bg-white p-4"
    >
      <InputFieldWrapper>
        <InputField
          label="Product Name"
          register={register}
          placeholder="Enter Product Name"
          type="text"
          errors={errors}
          name="name"
          disabled={isPending}
        />
        <SelectField
          register={register}
          options={[
            { value: "", label: "Select Category" },
            { value: "Phones", label: "Phones" },
            { value: "Laptop", label: "laptop" },
            { value: "Speakers", label: "Speakers" },
            { value: "System Accessories", label: "System Accessories" },
            { value: "Phone Accessories", label: "Phonee Accessories" },
          ]}
          label="Product Category"
          name="category"
          errors={errors}
        />
      </InputFieldWrapper>

      <InputFieldWrapper>
        <InputField
          label="Price"
          register={register}
          placeholder="Enter Product Price"
          type="number"
          errors={errors}
          name="price"
          disabled={isPending}
        />
        <InputField
          label="Quantity"
          register={register}
          placeholder="Enter Product Quantity"
          type="number"
          errors={errors}
          name="quantity"
          disabled={isPending}
        />
      </InputFieldWrapper>

      <InputFieldWrapper>
        <InputTextArea
          label="Product Description"
          register={register}
          placeholder="Enter Product Description"
          type="text"
          errors={errors}
          name="description"
          disabled={isPending}
        />
      </InputFieldWrapper>

      <InputFieldWrapper>
        <div>
          {/* <Input
            type="file"
            className=""
            multiple
            {...register("imageUrl")}
            required
          /> */}
        </div>
        {/* <InputFieldWrapper>
        {product && (
          <Image
            src={product?.imageUrl}
            alt={product.name}
            height={200}
            width={200}
            className=""
          />
        )}
      </InputFieldWrapper> */}
        {/* <ImageUpload setImageUrl={setImageUrl} /> */}
        <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
      </InputFieldWrapper>

      <InputFieldWrapper>
        <Button
          disabled={isPending}
          className="bg-textPrimary text-bgPrimary font-semibold text-md hover:bg-bgPrimary hover:text-textPrimary"
          type="submit"
        >
          {isPending && <Spinner />}
          <IoIosSend className="text-md" />
          <span className="ml-1"> Submit</span>
        </Button>
      </InputFieldWrapper>
    </form>
  );
};

export default NewForm;
