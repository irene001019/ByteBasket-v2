"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";  // Import useRouter
import { Button } from "@/components/ui/button";
import { Card, 
         CardContent, 
        CardDescription, 
        CardHeader, 
        CardTitle } 
        from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";

export default function Login() {
  const router = useRouter();  // Initialize the router

  // Click handler for login
  const handleLogin = () => {
    // Add any authentication logic here if needed
    router.push("/homepage");  // Navigate to homepage
  };

  return (
    <Card className="mx-auto max-w-sm mt-24">
      <CardHeader>
      <Link href="/" ><ChevronLeft /> </Link> {/*back to landing page*/}
        <CardTitle className="text-2xl text-center">Sign In</CardTitle>
        <CardDescription className="text-center">
          Enter your email and password to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="button" onClick={handleLogin} className="w-full">
          Sign In
          </Button>
          <Button variant="outline" className="w-full">
          Sign In with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Need an new account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
