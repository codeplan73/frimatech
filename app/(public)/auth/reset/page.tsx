import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Banner from "@/components/page-banner";

const ResetPage = () => {
  return (
    <div className="">
      <Banner
        currentPage=""
        style={{ backgroundImage: "url('/img/auth.png')" }}
        title="Reset Password"
        link="/"
      />
      <div className="flex items-center justify-center py-16 px-10">
        <Card className="w-[420px]">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              Enter your new password and comfirm password
            </CardDescription>
          </CardHeader>
          <form>
            <CardContent>
              <div className="grid w-full items-center gap-4">
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
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="submit"
                className="w-full bg-bgPrimary text-textPrimary hover:text-white"
              >
                Reset Password
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ResetPage;
