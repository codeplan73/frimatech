"use server";

import { db } from "@/lib/db";
import { sendMail } from "@/lib/mail";
import { signJwt } from "@/lib/jwt";
import { compilePasswordResetEmail } from "@/lib/mail";

export async function forgotPassword(email: string) {
  console.log(email);

  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  console.log(user);

  if (!user) {
    return { error: "The User Does Not Exist!" };
  }

  const jwtUserId = signJwt({
    id: user.id,
  });

  const url = `${process.env.NEXTAUTH_URL}/auth/forgot/${jwtUserId}`;

  // const body = compilePasswordResetEmail(url);

  const body = `
     <div className="card">
        <h2>Forgot your password</h2>
        <p>Hey, we received a request to reset your password.</p>
        <p>Let’s get you a new one!</p>
        <a href={${url}}>RESET MY PASSWORD</a>
        <p>Didn’t request a password reset? You can ignore this message.</p>
      </div>
  `;

  const sendResult = await sendMail({
    to: user.email,
    name: user.name,
    subject: "Reset Password",
    body: body,
  });

  return sendResult;
}
