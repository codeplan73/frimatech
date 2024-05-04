import { NextRequest, NextResponse } from "next/server";
import Cloudinary from "@/config/cloudinary";
import { ProductSchema } from "@/schema";

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();
  const imageUploadPromises = [];

  console.log(body);

  // convet images to base64
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
