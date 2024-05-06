"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";

import Link from "next/link";
import DeleteAction from "@/app/(protected)/categories/_component/DeleteAction";

export type CategoryType = Category;

export const categoryColumns: ColumnDef<CategoryType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="space-x-2">
          <DeleteAction id={product.id} />
        </div>
      );
    },
  },
];
