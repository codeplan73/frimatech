"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendContactMail } from "@/actions/sendContactMail";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "@/components/Spinner";

const formSchema = z.object({
  fullname: z.string().min(2, "Fullname must be at least 4 characters."),
  email: z.string().email("Please enter a valid email address"),
  // phone: z.string().min(11, "Please enter Phone number"),
  subject: z.string().min(4, "Please enter subject"),
  message: z.string().min(20, "Please enter message"),
});

const ContactForm = () => {
  const [isPending, setSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);

    await sendContactMail(
      values.email,
      values.fullname,
      values.subject,
      values.message
    );

    Swal.fire({
      title: "Mail Sent!",
      text: "Your message was sent successfully, we will respond to your mail as soon as possible!",
      icon: "success",
    });

    values.email = "";
    values.fullname = "";
    values.subject = "";
    values.message = "";

    setSubmitting(false);

    router.push("/");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full p-6 space-y-6 border-2 shadow-lg md:w-6/12 md:p-10 rounded-xl"
      >
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Fullname"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter Email"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Subject"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Subject"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit">
          {isPending && <Spinner />}
          <span className="ml-1"> Submit</span>
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
