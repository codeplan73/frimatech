import { NextRequest, NextResponse } from "next/server";
import { BlogSchema } from "@/schema";
import { db } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const validata = BlogSchema.safeParse(body);

  if (!validata.success)
    return NextResponse.json(validata.error.format(), { status: 400 });

  const { title, bodyText, coverImage } = validata.data;

  const updatedBlog = await db.blog.update({
    where: { id: params.id },
    data: {
      title,
      bodyText,
      coverImage,
    },
  });

  return NextResponse.json({
    updatedBlog,
    message: "Product updated successfully",
    status: 200,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const blog = await db.blog.findUnique({
    where: { id: params.id },
  });

  if (!blog)
    return NextResponse.json({ error: "Invalid blog Id" }, { status: 404 });

  await db.blog.delete({
    where: { id: blog.id },
  });

  return NextResponse.json({
    message: "Blog post deleted successfully",
    status: 200,
  });
}
