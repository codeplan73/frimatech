import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const category = await db.category.findUnique({
    where: { id: params.id },
  });

  if (!category)
    return NextResponse.json({ error: "Invalid product Id" }, { status: 404 });

  await db.category.delete({
    where: { id: category.id },
  });

  return NextResponse.json({
    message: "Product deleted successfully",
    status: 200,
  });
}
