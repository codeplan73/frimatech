"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

type Payment = Product;

export const onGoingColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "assigneeName",
    header: "Staff Name",
  },
  {
    accessorKey: "postcode",
    header: "Postal Code",
  },
  {
    accessorKey: "clean_type",
    header: "Task Type",
  },
  {
    accessorKey: "booking_date",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-uk", {
        style: "currency",
        currency: "GBP",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },

  {
    accessorKey: "cleaning_status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("cleaning_status");
      let bgColor = "";

      switch (status) {
        case "NEW":
          bgColor = "bg-yellow-200 text-yellow-900";
          break;
        case "ONGOING":
          bgColor = "bg-purple-300 text-purple-900";
          break;
        case "COMPLETED":
          bgColor = "bg-green-300 text-green-900";
          break;
        default:
          bgColor = "bg-gray-500"; // Add a default color for unknown statuses
          break;
      }

      return (
        <div className={`p-1 rounded text-center ${bgColor}`}>
          {status as string}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/bookings/${payment.id}`}>View Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              Delete Booking
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
