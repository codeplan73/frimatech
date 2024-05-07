import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BreadCumNav from "@/components/BreadCumNav";
import { useSession } from "next-auth/react";

const PasswordPage = () => {
  const session = useSession();
  return (
    <div className="flex flex-col gap-4">
      <BreadCumNav
        dashboard="dashoard"
        currentPage="settings"
        currentSection="Password"
      />

      <Card className="w-full md:w-8/12">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update Password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-8">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Current Password</Label>
                <Input
                  id="name"
                  type="password"
                  placeholder="Enter your current password"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">New Password</Label>
                <Input
                  id="name"
                  type="password"
                  placeholder="Enter new password"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Confirm New Password</Label>
                <Input
                  id="name"
                  type="password"
                  placeholder="Confirm New Passwords"
                />
              </div>
            </div>
            <Button type="submit" className="bg-warningColor mt-6">
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordPage;
