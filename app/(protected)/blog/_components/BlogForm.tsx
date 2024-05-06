"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import Spinner from "@/components/Spinner";
import { IoIosSend } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { BLogSchema } from "@/schema";
import InputField from "@/components/form-fields/InputField";
import InputFieldWrapper from "@/components/form-fields/InputWrapper";
import ImageUpload from "./../_components/ImageUpload";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Image from "next/image";

export type BlogSchemaData = z.infer<typeof BLogSchema>;

const BlogForm = ({ blog }: { blog?: BlogSchemaData }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [thumbNail, setThumbNail] = useState("");
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogSchemaData>({
    resolver: zodResolver(BLogSchema),
  });

  useEffect(() => {
    if (blog?.coverImage) {
      setCoverImage(blog.coverImage);
    }
  }, [blog]);

  const handleSubmitBlog = async (data: BlogSchemaData) => {
    const blogData = {
      ...data,
      coverImage: setCoverImage,
    };

    try {
      setSubmitting(true);
      if (blog) {
        const response = await axios.patch("/api/blog/" + blog.id, blogData);
        toast.success(response.data.message);
        router.refresh();
        reset();
        router.push("/blog");
        setSubmitting(false);
      } else {
        const response = await axios.post("/api/blog", blogData);
        toast.success(response.data.message);
        router.refresh();
        reset();
        router.push("/blog");
        setSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitBlog)}
      className="w-full md:w-10/12 flex flex-col items-start md:gap-4 gap-6 bg-white p-4"
    >
      <InputFieldWrapper>
        <InputField
          label="Title"
          register={register}
          placeholder="Enter  Title"
          type="text"
          errors={errors}
          name="title"
          value={blog?.title}
          disabled={isPending}
        />
      </InputFieldWrapper>

      <InputFieldWrapper>
        <Controller
          disabled={isPending}
          name="body"
          control={control}
          defaultValue={blog?.body}
          render={({ field }) => (
            <SimpleMDE
              className="w-full"
              placeholder="Enter Product Description"
              {...field}
            />
          )}
        />
      </InputFieldWrapper>

      <div className="w-full flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6">
        <div>
          {blog && (
            <Image
              src={blog?.coverImage ?? ""}
              alt={blog.title}
              height={200}
              width={200}
              className=""
            />
          )}
        </div>
        <ImageUpload setThumbNail={setThumbNail} setImageUrl={setCoverImage} />
      </div>

      <InputFieldWrapper>
        <Button
          disabled={isPending}
          className="bg-textPrimary text-bgPrimary font-semibold text-md hover:bg-bgPrimary hover:text-textPrimary"
          type="submit"
        >
          {isPending && <Spinner />}
          <IoIosSend className="text-md" />
          <span className="ml-1">{blog ? "Update Blog" : "Create Blog"}</span>
        </Button>
      </InputFieldWrapper>
    </form>
  );
};

export const revalidate = 1;

export default BlogForm;
