import React from "react";
import { auth } from "@/auth";
import UserOrder from "../_components/UserOrder";

const DashBoardPage = async () => {
  const session = await auth();

  if (session?.user.role !== "ADMIN") return <UserOrder />;
  return (
    <div>
      <h3>Admin Section</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
        praesentium quis voluptatem suscipit quae ipsum assumenda beatae
        excepturi fugiat! Sed, odit fugiat? Eius error beatae necessitatibus
        nihil fugiat minus voluptate sed voluptatibus molestias. Magni qui
        neque, eligendi excepturi molestias nesciunt? Velit asperiores nemo
        minima voluptatum odit vitae consequuntur tenetur sunt.
      </p>
    </div>
  );
};

export default DashBoardPage;
