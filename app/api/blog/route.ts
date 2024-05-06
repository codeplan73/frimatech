import { NextRequest, NextResponse } from "next/server";
import { BlogSchema } from "@/schema";
import { db } from "@/lib/db";

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();

  const validata = BlogSchema.safeParse(body);

  if (!validata.success)
    return NextResponse.json(validata.error.format(), { status: 400 });

  const { title, bodyText, coverImage } = validata.data;

  console.log(validata.data, "data");

  try {
    const newBlog = await db.blog.create({
      data: {
        title,
        bodyText,
        coverImage: coverImage!,
      },
    });

    return NextResponse.json({
      newBlog,
      message: "Category created successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: error, status: 400 });
  }
}

export async function GET(request: NextRequest, response: NextResponse) {
  const blog = await db.blog.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ data: blog, status: 200 });
}
