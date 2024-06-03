import React from "react";
import Banner from "@/components/page-banner";
import ForgotPasswordForm from "@/components/auth/forgotPasswordForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const ForgotPasswordPage = () => {
  return (
    <div className="">
      <Banner
        currentPage=""
        style={{ backgroundImage: "url('/img/auth.png')" }}
        title="Forgot Password"
        link="/"
      />

      <div className="flex items-center justify-center px-10 py-16">
        <Card className="w-[420px]">
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>Enter your email address</CardDescription>
          </CardHeader>
          <ForgotPasswordForm />
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
