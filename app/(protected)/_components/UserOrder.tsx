import React from "react";
import { auth } from "@/auth";
import { DataTable } from "@/components/table/order-table";
import { columns } from "@/components/table/order-column-client";
import { db } from "@/lib/db";
import { Order } from "@prisma/client";

const UserOrder = async () => {
  const session = await auth();

  const orders: Order[] = await db.order.findMany({
    where: { userId: session?.user.id },
    orderBy: { id: "desc" },
  });

  if (!orders) return null;
  return (
    <div className="container py-10 mx-auto bg-white">
      <DataTable columns={columns} data={orders} />
    </div>
  );
};

export default UserOrder;
