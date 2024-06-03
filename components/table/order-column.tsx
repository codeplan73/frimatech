"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Order } from "@prisma/client";

import Link from "next/link";
import EditAction from "@/app/(protected)/orders/_components/EditAction";

export type OrderType = Order;

export const columns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "shippingName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Status",
  },
  {
    accessorKey: "deliveryStatus",
    header: "Delivery",
    cell: ({ row }) => {
      const status = row.getValue("deliveryStatus");
      let bgColor = "";

      switch (status) {
        case "Pending":
          bgColor = "border-2 border-red-300 text-yellow-900";
          break;
        case "Delivered":
          bgColor = "border-2 border-green-500 text-green-900";
          break;
        default:
          bgColor = "bg-gray-500"; // Add a default color for unknown statuses
          break;
      }

      return (
        <div className={`px-2 py-1 rounded text-center ${bgColor}`}>
          {status as string}
        </div>
      );
    },
  },
  {
    accessorKey: "totalItems",
    header: "Quantity",
  },
  {
    accessorKey: "shippingAddress",
    header: "Address",
  },
  {
    accessorKey: "shippingCity",
    header: "City",
  },
  {
    accessorKey: "totalAmount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("totalAmount"));
      const formatted = new Intl.NumberFormat("en-ng", {
        style: "currency",
        currency: "NGN",
      }).format(price);

      return <div className="font-medium text-right">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="flex items-center gap-1 space-x-2">
          <Link
            className="p-2 border rounded-md border-bgPrimary text-bgPrimary"
            href={`/orders/edit/${order.id}`}
          >
            View
          </Link>

          {order.deliveryStatus === "Pending" && (
            <EditAction id={parseInt(order.id.toString())} />
          )}
        </div>
      );
    },
  },
];
