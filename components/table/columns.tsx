"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Product } from "@prisma/client";

import Link from "next/link";
import DeleteAction from "@/app/(protected)/products/_component/DeleteAction";

export type Payment = Product;

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.imageUrl}
          alt="Product"
          width={32}
          height={32}
          className="h-12 w-12 rounded"
        />
      );
    },
  },
  {
    accessorKey: "productName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-uk", {
        style: "currency",
        currency: "GBP",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="space-x-2">
          <Link
            className="border border-bgPrimary text-bgPrimary rounded-md p-2"
            href={`/products/edit/${product.id}`}
          >
            Edit
          </Link>
          <DeleteAction id={product.id} />
        </div>
      );
    },
  },
];
