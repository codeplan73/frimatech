import { columns } from "@/components/table/order-column";
import { DataTable } from "@/components/table/data-table-filter";
import { db } from "@/lib/db";
import { Order } from "@prisma/client";

export default async function OrderList() {
  const orders: Order[] = await db.order.findMany({
    orderBy: { id: "desc" },
  });

  if (!orders) return null;

  return (
    <div>
      <DataTable columns={columns} data={orders} />
    </div>
  );
}

export const revalidate = 1;
