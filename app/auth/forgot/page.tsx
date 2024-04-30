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

const ForgotPasswordPage = () => {
  return (
    <div className="">
      <Banner
        currentPage=""
        style={{ backgroundImage: "url('/img/auth.png')" }}
        title="Forgot Password"
        link="/"
      />
      <div className="flex items-center justify-center py-16 px-10">
        <Card className="w-[420px]">
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>Enter your email address</CardDescription>
          </CardHeader>
          <form>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Email</Label>
                  <Input
                    id="name"
                    type="email"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="submit"
                className="w-full bg-bgPrimary text-textPrimary hover:text-white"
              >
                Send Reset Link
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
