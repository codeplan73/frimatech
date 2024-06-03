import React from "react";
import { auth } from "@/auth";
import UserOrder from "../_components/UserOrder";
import DashboardCard from "./_components/DashboardCard";
import { DataTable } from "@/components/table/data-table-filter";
import { columns } from "@/components/table/order-column";
import Link from "next/link";
import { db } from "@/lib/db";

const DashBoardPage = async () => {
  const session = await auth();

  const orders = await db.order.findMany({});

  if (session?.user.role !== "ADMIN") return <UserOrder />;
  return (
    <div className="flex flex-col gap-12">
      <DashboardCard />

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-8 p-4 bg-white rounded-md">
          <div className="flex items-center justify-between">
            <Link
              href="/orders"
              className="px-2 border rounded-md text-slate-600"
            >
              View all
            </Link>
          </div>
          <DataTable columns={columns} data={orders} />
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
