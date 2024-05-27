import React from "react";
import { auth } from "@/auth";
import UserOrder from "../_components/UserOrder";

const OrderPage = async () => {
  const session = await auth();

  if (session?.user.role === "USER" || session?.user.role === "CLIENT")
    return <UserOrder />;

  return (
    <div>
      AdminOrderPage
      <h4>{session?.user.name}</h4>
      <h4>{session?.user.role}</h4>
    </div>
  );
};

export default OrderPage;
