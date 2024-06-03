import React from "react";
import { auth } from "@/auth";
import UserOrder from "../_components/UserOrder";
import OrderList from "./_components/Orderlist";
import BreadCumNav from "@/components/BreadCumNav";

const OrderPage = async () => {
  const session = await auth();

  if (session?.user.role === "USER" || session?.user.role === "CLIENT")
    return <UserOrder />;

  return (
    <div className="container py-10 mx-auto bg-white">
      <BreadCumNav dashboard="dashboard" currentPage="Orders" />
      <OrderList />
    </div>
  );
};

export default OrderPage;
