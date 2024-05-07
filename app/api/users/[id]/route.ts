import { NextRequest, NextResponse } from "next/server";
import { UserSchema } from "@/schema";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await db.user.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!user)
    return NextResponse.json({ message: "User Not Found", status: 404 });

  return NextResponse.json(user);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const validata = UserSchema.safeParse(body);

  if (!validata.success)
    return NextResponse.json(validata.error.format(), { status: 400 });

  const { name, phone_number, gender, address, city, state } = validata.data;

  const updatedUser = await db.user.update({
    where: { id: params.id },
    data: {
      name,
      phone_number,
      gender,
      address,
      city,
      state,
      // email: "user@gmail.com",
      // role: "CLIENT",
    },
  });

  return NextResponse.json({
    updatedUser,
    message: "Account updated successfully",
    status: 200,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await db.product.findUnique({
    where: { id: params.id },
  });

  if (!product)
    return NextResponse.json({ error: "Invalid product Id" }, { status: 404 });

  await db.product.delete({
    where: { id: product.id },
  });

  return NextResponse.json({
    message: "Product deleted successfully",
    status: 200,
  });
}
