import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SendMailPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-24">
      <div className="card">
        <h2>Forgot your password</h2>
        <p>Hey, we received a request to reset your password.</p>
        <p>Let’s get you a new one!</p>
        <Link href={"/"}>RESET MY PASSWORD</Link>
        <p>Didn’t request a password reset? You can ignore this message.</p>
      </div>
    </div>
  );
};

export default SendMailPage;
