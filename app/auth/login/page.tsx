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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Banner from "@/components/page-banner";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="">
      <Banner
        currentPage="SignIn to continue shopping"
        style={{ backgroundImage: "url('/img/auth.png')" }}
        title="Authentication"
        link="/"
      />
      <div className="flex items-center justify-center py-16 px-10">
        <Card className="w-[420px]">
          <CardHeader>
            <CardTitle>Secure Login</CardTitle>
            <CardDescription>
              Enter your account details to continue shopping
            </CardDescription>
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
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Password</Label>
                  <Input
                    id="name"
                    type="password"
                    placeholder="Enter Password"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="secondary" type="submit" className="w-full">
                SignIn
              </Button>
            </CardFooter>
            <CardFooter className="flex justify-between">
              <Link className="underline text-sm" href="/auth/forgot">
                Forgot Password
              </Link>
              <Link className="underline text-sm" href="/auth/register">
                Create Account
              </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
