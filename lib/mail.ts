import nodemailer from "nodemailer";
import * as Handlebars from "handlebars";
import { orderTemplate } from "./templates/orderTemplate";
import { resetPasswordTemplate } from "./templates/resetPasswordTemplate";
const domain = process.env.NEXT_PUBLIC_APP_URL;

export async function sendMail({
  to,
  name,
  subject,
  body,
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
}) {
  const { SMPT_EMAIL, SMTP_GMAIL_PASS } = process.env;
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMPT_EMAIL,
      pass: SMTP_GMAIL_PASS,
    },
  });

  try {
    const tesResult = await transport.verify();
    // console.log("test result", tesResult);
  } catch (error) {
    console.log(error);
  }

  try {
    const sendResult = await transport.sendMail({
      from: "Musa-Shop",
      to,
      subject,
      html: body,
    });
    console.log({ sendResult });
  } catch (error) {
    console.log(error);
  }
}

export function compileOrderTemplate(
  totalItems: string,
  totalAmount: number,
  data: string[]
) {
  const template = Handlebars.compile(orderTemplate);
  const htmlBody = template({ totalItems, totalAmount, data });

  return htmlBody;
}

export function compilePasswordResetEmail(url: string) {
  const template = Handlebars.compile(resetPasswordTemplate);
  const htmlBody = template(url);

  return htmlBody;
}
