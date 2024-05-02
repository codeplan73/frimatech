import React from "react";
import Banner from "@/components/page-banner";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="">
      <Banner
        currentPage="SignIn to continue shopping"
        style={{ backgroundImage: "url('/img/auth.png')" }}
        title="Authentication"
        link="/"
      />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
