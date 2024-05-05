import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { db } from "@/lib/db";
import { Product } from "@prisma/client";

export default async function ProductList() {
  const products: Product[] = await db.product.findMany({});

  if (!products) return null;

  return (
    <div>
      <DataTable columns={columns} data={products} />
    </div>
  );
}
