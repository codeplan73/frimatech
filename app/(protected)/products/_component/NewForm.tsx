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
import ImageUpload from "@/app/(protected)/_components/ImageUpload";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export type ProductSchemaData = z.infer<typeof ProductSchema>;

// const IssueForm = ({ issue }: { issue?: Issue }) => {
const NewForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [thumbNail, setThumbNail] = useState("");
  // const [imageUrl, setImageUrl] = useState<string[]>([]);s
  // const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
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
    const productData = {
      ...data,
      imageUrl: imageUrl,
    };

    try {
      setSubmitting(true);
      const response = await axios.post("/api/products", productData);
      if (response.status === 200) {
        toast.success(response.data.message);
        router.refresh();
        router.push("/products");
        setSubmitting(false);
      } else {
        toast.error(response.data.message);
        setSubmitting(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="w-full md:w-10/12 flex flex-col items-start md:gap-4 gap-6 bg-white p-4"
    >
      <InputFieldWrapper>
        <InputField
          label="Product Name"
          register={register}
          placeholder="Enter Product Name"
          type="text"
          errors={errors}
          name="productName"
          disabled={isPending}
        />
        <SelectField
          register={register}
          options={[
            { value: "", label: "Select Category" },
            { value: "Phones", label: "Phones" },
            { value: "Laptop", label: "Laptop" },
            { value: "Watch", label: "Watch" },
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
        <Controller
          disabled={isPending}
          name="description"
          control={control}
          // defaultValue={product?.longDescription}
          render={({ field }) => (
            <SimpleMDE
              className="w-full"
              placeholder="Enter Product Description"
              {...field}
            />
          )}
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
        <ImageUpload setThumbNail={setThumbNail} setImageUrl={setImageUrl} />
        {/* <ImageUpload setImageUrl={setImageUrl} />
        <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} /> */}
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
