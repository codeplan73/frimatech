import { DataTable } from "@/components/table/userTable";
import { columns } from "@/components/table/userColumn";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import React from "react";

const UserList = async () => {
  const users: User[] = await db.user.findMany({
    orderBy: { id: "desc" },
  });
  return <DataTable columns={columns} data={users} />;
};

export default UserList;
