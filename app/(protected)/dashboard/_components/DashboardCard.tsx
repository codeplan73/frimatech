import CardWrapper from "@/components/card-wrapper";
import React from "react";
import { IoBriefcaseOutline } from "react-icons/io5";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { BiTask } from "react-icons/bi";
import { GrTask } from "react-icons/gr";
import { FaChartLine } from "react-icons/fa";
import { FaUsersLine } from "react-icons/fa6";
import { PiUsersFourFill } from "react-icons/pi";
import Card from "@/app/(protected)/_components/Card";
import { db } from "@/lib/db";

const DashboardCard = async () => {
  const totalRevenue = await db.order.aggregate({
    _sum: {
      totalAmount: true,
    },
  });

  const amount = totalRevenue._sum.totalAmount
    ? parseFloat(totalRevenue._sum.totalAmount.toString()!)
    : 0;
  const formatted = new Intl.NumberFormat("en-ng", {
    style: "currency",
    currency: "NGN",
  }).format(amount);

  const orders = await db.order.count({});

  const pendingOrder = await db.order.count({
    where: { deliveryStatus: "Pending" },
  });

  const products = await db.product.count({});

  const users = await db.user.count({});

  const blogs = await db.blog.count({});

  return (
    <CardWrapper>
      <Card
        icon={
          <FaChartLine className="p-2 text-4xl bg-textPrimary text-bgPrimary rounded-xl" />
        }
        amount={formatted}
        heading="Total Revenue"
      />

      <Card
        icon={
          <IoBriefcaseOutline className="p-2 text-4xl bg-textPrimary text-bgPrimary rounded-xl" />
        }
        amount={orders.toString()}
        heading="Total Orders"
      />

      <Card
        icon={
          <BiTask className="p-2 text-4xl bg-textPrimary text-bgPrimary rounded-xl" />
        }
        amount={pendingOrder.toString()}
        heading="Pending Order"
      />

      <Card
        icon={
          <GrTask className="p-2 text-4xl bg-textPrimary text-bgPrimary rounded-xl" />
        }
        amount={products.toString()}
        heading="Total Product"
      />

      <Card
        icon={
          <FaUsersLine className="p-2 text-4xl bg-textPrimary text-bgPrimary rounded-xl" />
        }
        amount={users.toString()}
        heading="Total Users"
      />

      <Card
        icon={
          <PiUsersFourFill className="p-2 text-4xl bg-textPrimary text-bgPrimary rounded-xl" />
        }
        amount={blogs.toString()}
        heading="Total Post"
      />
    </CardWrapper>
  );
};

export default DashboardCard;
