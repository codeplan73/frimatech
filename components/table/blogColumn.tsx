"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Blog } from "@prisma/client";

import Link from "next/link";
import DeleteAction from "@/app/(protected)/blog/_components/DeleteAction";

export type BlogType = Blog;

export const blogColumns: ColumnDef<BlogType>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.coverImage}
          alt="Title"
          width={32}
          height={32}
          className="h-12 w-12 rounded"
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const blog = row.original;

      return (
        <div className="flex gap-1 items-center space-x-2">
          <Link
            className="border border-bgPrimary text-bgPrimary rounded-md p-2"
            href={`/blog/edit/${blog.id}`}
          >
            Edit
          </Link>
          <DeleteAction id={blog.id} />
        </div>
      );
    },
  },
];
