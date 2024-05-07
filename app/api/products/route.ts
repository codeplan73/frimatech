import { NextRequest, NextResponse } from "next/server";
import Cloudinary from "@/config/cloudinary";
import { ProductSchema } from "@/schema";
import { db } from "@/lib/db";

export async function GET(request: NextRequest, response: NextResponse) {
  const products = await db.product.findMany();
  return NextResponse.json({ data: products, status: 200 });
}

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();

  const validata = ProductSchema.safeParse(body);

  if (!validata.success)
    return NextResponse.json(validata.error.format(), { status: 400 });

  const { productName, description, price, quantity, category, imageUrl } =
    validata.data;

  try {
    const newProduct = await db.product.create({
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
      newProduct,
      message: "Product created successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: error, status: 400 });
  }

  // convet images to base64
  //  const imageUploadPromises = [];
  // for (const image of images) {
  //   const imageBuffer = await image.arrayBuffer();
  //   const imageArray = Array.from(new Uint8Array(imageBuffer));
  //   const imageData = Buffer.from(imageArray);
  //   const imageBase64 = imageData.toString("base64");

  //   // make request to cloudinary
  //   const result = await Cloudinary.uploader.upload(
  //     `data:image/png;base64,${imageBase64}`,
  //     {
  //       folder: "musa",
  //     }
  //   );

  //   imageUploadPromises.push(result.secure_url);

  //   //wait for all images to be uploaded
  //   const uploadedImages = await Promise.all(imageUploadPromises);

  //   // const productData.images = uploadedImages;
  // }
}
