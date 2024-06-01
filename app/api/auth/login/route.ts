import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schema";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/resendMail";

export async function POST(
  request: NextRequest,
  response: NextResponse,
  callbackUrl?: string | null
) {
  const body = await request.json();
  const validatedFields = LoginSchema.safeParse(body);

  if (!validatedFields.success)
    return NextResponse.json(validatedFields.error.format(), {
      status: 400,
    });

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return NextResponse.json(
      { error: "Email does not exist!" },
      { status: 400 }
    );
  }

  // if (!existingUser.emailVerified) {
  //   const verificationToken = await generateVerificationToken(
  //     existingUser.email
  //   );
  //   console.log("3rd call");
  //   await sendVerificationEmail(
  //     verificationToken.email,
  //     verificationToken.token
  //   );
  //   return NextResponse.json({ success: "Confirmation email sent!" });
  // }

  try {
    console.log("signin call");
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    // Return a success response
    return NextResponse.json({ success: "Logged in successfully!" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return NextResponse.json(
            { error: "Invalid credentials!" },
            { status: 400 }
          );
        default:
          return NextResponse.json(
            { error: "Something went wrong!" },
            { status: 500 }
          );
      }
    }

    throw error;
  }
}
