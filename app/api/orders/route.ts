import { NextRequest, NextResponse } from "next/server";
import { ProductSchema } from "@/schema";
import { db } from "@/lib/db";

export async function GET(request: NextRequest, response: NextResponse) {
  return NextResponse.json({ message: "Orders route" });
}

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();

  console.log(body);

  //   const validata = ProductSchema.safeParse(body);

  //   if (!validata.success)
  //     return NextResponse.json(validata.error.format(), { status: 400 });

  //   const { productName, description, price, quantity, category, imageUrl } =
  //     validata.data;
}



{
    category
: 
"laptop"
createdAt
: 
"2024-05-07T14:11:09.510Z"
description
: 
"#### **Powerful laptop for professionals**\n\nLorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi numquam delectus nemo commodi saepe doloremque quae, libero quasi blanditiis accusamus mollitia consectetur recusandae, et a, quibusdam officiis eius laborum facilis assumenda. Itaque exercitationem eligendi impedit sequi debitis, officia enim incidunt hic provident magni error molestias alias repellendus blanditiis ducimus nesciunt!\n\nLorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi numquam delectus nemo commodi saepe doloremque quae, libero quasi blanditiis accusamus mollitia consectetur recusandae, et a, quibusdam officiis eius laborum facilis assumenda. Itaque exercitationem eligendi impedit sequi debitis, officia enim incidunt hic provident magni error molestias alias repellendus blanditiis ducimus nesciunt!\n"
id
: 
"clvwgxvts0007k9ii1ko7o2bh"
imageUrl
: 
"https://res.cloudinary.com/ddogq4ll7/image/upload/v1715091061/musa-shop/qrgklxnavbdklojbyyip.png"
price
: 
"1099"
productName
: 
"MacBook Pro"
quantity
: 
"2"
updated
: 
"2024-05-31T10:40:25.790Z"
updatedAt
: 
"2024-05-07T14:11:09.510Z"
[[Prototype]]
: 
Object
1
: 
category
: 
"phone"
createdAt
: 
"2024-05-07T14:12:09.929Z"
description
: 
"#### **Apple Watch Series 7**\n\nLorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi numquam delectus nemo commodi saepe doloremque quae, libero quasi blanditiis accusamus mollitia consectetur recusandae, et a, quibusdam officiis eius laborum facilis assumenda. Itaque exercitationem eligendi impedit sequi debitis, officia enim incidunt hic provident magni error molestias alias repellendus blanditiis ducimus nesciunt!\n\nLorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi numquam delectus nemo commodi saepe doloremque quae, libero quasi blanditiis accusamus mollitia consectetur recusandae, et a, quibusdam officiis eius laborum facilis assumenda. Itaque exercitationem eligendi impedit sequi debitis, officia enim incidunt hic provident magni error molestias alias repellendus blanditiis ducimus nesciunt!"
id
: 
"clvwgz5k40008k9ii4jhi5m60"
imageUrl
: 
"https://res.cloudinary.com/ddogq4ll7/image/upload/v1715091127/musa-shop/voxaa4jof4fshqppi5f0.png"
price
: 
"399"
productName
: 
"Apple Watch Series 7"
quantity
: 
"1"
updated
: 
"2024-05-31T10:40:53.827Z"
updatedAt
: 
"2024-05-07T14:12:09.929Z"
}