import React from "react";
import { auth } from "@/auth";
import UserOrder from "../_components/UserOrder";
import DashboardCard from "./_components/DashboardCard";

const DashBoardPage = async () => {
  const session = await auth();

  if (session?.user.role !== "ADMIN") return <UserOrder />;
  return (
    <div className="flex flex-col gap-12">
      <DashboardCard />
    </div>
  );
};

export default DashBoardPage;
