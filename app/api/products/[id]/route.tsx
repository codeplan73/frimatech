import { NextRequest, NextResponse } from "next/server";
import { ProductSchema } from "@/schema";
import { db } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const validata = ProductSchema.safeParse(body);

  if (!validata.success)
    return NextResponse.json(validata.error.format(), { status: 400 });

  const { productName, description, price, quantity, category, imageUrl } =
    validata.data;

  const updatedProduct = await db.product.update({
    where: { id: params.id },
    data: {
      productName,
      description,
      quantity,
      price,
      category,
      imageUrl: imageUrl!,
    },
  });

  return NextResponse.json({
    updatedProduct,
    message: "Product updated successfully",
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
