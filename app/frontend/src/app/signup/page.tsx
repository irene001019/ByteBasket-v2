import Link from "next/link";

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
import { ChevronLeft } from "lucide-react";

export default function Signup() {
  return (
    <Card className="mx-auto max-w-sm mt-24 ">
      <CardHeader>
      <Link href="/" ><ChevronLeft /> </Link> {/*back to landing page*/}
        <CardTitle className="text-2xl text-center">Create Account</CardTitle>
        <CardDescription className="text-center">
          Enter your name, email and password to create new account.
        </CardDescription>
      </CardHeader>
      <CardContent>
      <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
          Sign In
          </Link>
        </div>
        
        <div className="grid gap-4">
        <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="fname">First Name*</Label>
            </div>
            <Input id="fname" type="text" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="lname">Last Name*</Label>
            </div>
            <Input id="lname" type="text" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email*</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password*</Label>
            </div>
            <Input id="password" type="password" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Confirm Password*</Label>
            </div>
            <Input id="confirmpassword" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <Button variant="outline" className="w-full">
          Sign Up with Google
          </Button>
        </div>
        
      </CardContent>
    </Card>
  );
} 
