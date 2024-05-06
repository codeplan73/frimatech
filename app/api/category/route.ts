import { NextRequest, NextResponse } from "next/server";
import { CategoryeSchema } from "@/schema";
import { db } from "@/lib/db";

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();

  const validata = CategoryeSchema.safeParse(body);

  if (!validata.success)
    return NextResponse.json(validata.error.format(), { status: 400 });

  const { name, label } = validata.data;

  try {
    const newCategory = await db.category.create({
      data: {
        name,
        label,
      },
    });

    return NextResponse.json({
      newCategory,
      message: "Category created successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: error, status: 400 });
  }
}
