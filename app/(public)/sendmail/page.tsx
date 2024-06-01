import React from "react";
import { compileOrderTemplate, sendMail } from "@/lib/mail";
import { Button } from "@/components/ui/button";

const SendMailPage = () => {
  const sendMailForm = async () => {
    "use server";
    await sendMail({
      to: "codeplan73@gmail.com",
      name: "Musa-Shop",
      subject: "Order Successfull",
      body: compileOrderTemplate("4"),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-24">
      <form action="" method="post">
        <Button formAction={sendMailForm}>Test</Button>
      </form>
    </div>
  );
};

export default SendMailPage;
