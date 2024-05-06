import { categoryColumns } from "@/components/table/categoryColumns";
import { DataTable } from "@/components/table/categoryTable";
import { db } from "@/lib/db";
import { Category } from "@prisma/client";

export default async function CategoryList() {
  const categories: Category[] = await db.category.findMany({
    orderBy: { id: "desc" },
  });

  if (!categories) return null;

  return (
    <div>
      <DataTable columns={categoryColumns} data={categories} />
    </div>
  );
}

export const revalidate = 1;
