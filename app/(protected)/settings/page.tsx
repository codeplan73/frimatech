import React from "react";
import SettingLink from "./_components/SettingLink";
import BreadCumNav from "@/components/BreadCumNav";

const SettingsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <BreadCumNav dashboard="dashoard" currentPage="settings" />
      <SettingLink />
    </div>
  );
};

export default SettingsPage;
