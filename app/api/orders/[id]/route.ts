import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const order = await db.order.findFirst({
    where: { id: parseInt(params.id) },
  });

  if (!order)
    return NextResponse.json({
      message: "Order cannot Not Found",
      status: 404,
    });

  const updatedOrder = await db.order.update({
    where: { id: parseInt(params.id) },
    data: {
      deliveryStatus: "Delivered",
    },
  });

  return NextResponse.json({
    updatedOrder,
    message: "Delivery Status Updated Successfully",
    status: 200,
  });
}
