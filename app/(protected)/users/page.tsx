import BreadCumNav from "@/components/BreadCumNav";
import React from "react";
import UserList from "./_components/UserList";

const UsersPage = () => {
  return (
    <div className="container mx-auto py-10 bg-white">
      <BreadCumNav dashboard="dashboard" currentPage="Users" />
      <UserList />
    </div>
  );
};

export default UsersPage;
