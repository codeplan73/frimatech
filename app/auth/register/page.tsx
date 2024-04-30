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
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="">
      <Banner
        currentPage="Setup your account"
        style={{ backgroundImage: "url('/img/auth.png')" }}
        title="Authentication"
        link="/"
      />
      <div className="flex items-center justify-center py-16 px-10">
        <Card className="w-6/12">
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Enter your account details to continue shopping
            </CardDescription>
          </CardHeader>
          <form>
            <CardContent>
              <div className="flex flex-col w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label htmlFor="name">FullName</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your fullname"
                  />
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label htmlFor="name">Address</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your address"
                  />
                </div>
                <div className="flex flex-col md:flex-row w-full gap-4">
                  <div className="flex flex-col space-y-1.5 flex-1">
                    <Label htmlFor="name">Email</Label>
                    <Input
                      id="name"
                      type="email"
                      className="w-full"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5 flex-1">
                    <Label htmlFor="name">Phone</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your phone"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row w-full gap-4">
                  <div className="flex flex-col space-y-1.5 flex-1">
                    <Label htmlFor="name">Password</Label>
                    <Input
                      id="name"
                      type="password"
                      className="w-full"
                      placeholder="Enter your password"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5 flex-1">
                    <Label htmlFor="name">Confirm Password</Label>
                    <Input
                      id="name"
                      type="password"
                      placeholder="Confirm your passwords"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="submit"
                className="bg-bgPrimary text-textPrimary hover:text-white"
              >
                Register Account
              </Button>
            </CardFooter>
            <CardFooter className="flex justify-between">
              <Link className="underline text-sm" href="/auth/login">
                Already have an account? Login
              </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
