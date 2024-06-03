"use server";

import { sendMail } from "@/lib/mail";

export const sendContactMail = async (
  email: string,
  name: string,
  subject: string,
  message: string
) => {
  const mailBody = `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
    `;

  await sendMail({
    to: "info@frimatechnology.com",
    name,
    subject,
    body: mailBody,
    // body: compileOrderTemplate(totalItems, totalAmount, data),
  });
};
