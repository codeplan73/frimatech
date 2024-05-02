import React from "react";
import Banner from "@/components/page-banner";
import RegisterForm from "@/components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="">
      <Banner
        currentPage="Setup your account"
        style={{ backgroundImage: "url('/img/auth.png')" }}
        title="Authentication"
        link="/"
      />
      <div className="flex items-center justify-center w-full mx-auto">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
