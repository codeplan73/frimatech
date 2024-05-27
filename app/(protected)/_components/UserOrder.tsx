import React from "react";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";

const UserOrder = async () => {
  //   const session = useSession();
  const session = await auth();
  return (
    <div>
      UserOrderPage
      <h4> All Use Order</h4>
      {session?.user.name}
      {session?.user.role}
    </div>
  );
};

export default UserOrder;
