import { NextRequest, NextResponse } from "next/server";
// import { OrderSchema } from "@/schema";
import { db } from "@/lib/db";

export async function GET(request: NextRequest, response: NextResponse) {
  return NextResponse.json({ message: "Orders route" });
}

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();

  const {
    shippingAddress,
    shippingCity,
    deliveryStatus,
    shippingName,
    paymentStatus,
    shippingState,
    totalAmount,
    totalItems,
    items,
    userId,
  } = body;

  const order = await db.order.create({
    data: {
      userId,
      shippingName,
      shippingAddress,
      shippingCity,
      deliveryStatus,
      paymentStatus,
      shippingState,
      totalAmount,
      totalItems,
    },
  });

  // Create the order items
  const orderItems = await Promise.all(
    items.map((item: Product) =>
      db.orderItem.create({
        data: {
          productId: item.id,
          category: item.category,
          description: item.description,
          imageUrl: item.imageUrl,
          price: item.price,
          productName: item.productName,
          quantity: item.quantity,
          orderId: order.id,
        },
      })
    )
  );

  return NextResponse.json({ order, orderItems });
}
