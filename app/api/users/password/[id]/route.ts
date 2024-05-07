import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { PasswordSchema } from "@/schema";
import { db } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const validata = PasswordSchema.safeParse(body);

  if (!validata.success)
    return NextResponse.json(validata.error.format(), { status: 400 });

  const { password } = validata.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.findUnique({
    where: { id: params.id },
  });

  if (!user) return NextResponse.json({ message: "invalid user", status: 404 });

  const updatedUserPassword = await db.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
    },
  });

  return NextResponse.json({
    updatedUserPassword,
    message: "Password updated successfully",
    status: 200,
  });
}
