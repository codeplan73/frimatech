"use server";

import { compileOrderTemplate, sendMail } from "@/lib/mail";

export const sendOrderMail = async (
  totalItems: string,
  totalAmount: number,
  data: string[]
) => {
  await sendMail({
    to: "codeplan73@gmail.com",
    name: "Musa-Shop",
    subject: "Order Successfull",
    body: compileOrderTemplate(totalItems, totalAmount, data),
  });
};
