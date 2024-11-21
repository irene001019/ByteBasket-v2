import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className=" bg-white sticky top-0 z-40 border-b border-transparent transition duration-200 ease-in-out animate-header-slide">
        <div className="mx-auto w-full max-w-7xl px-52">
          <div className="flex items-center justify-between transition duration-500 ease-in-out md:flex">
            <div className="flex lg:w-[255px]">
              <Image
                src="/Logo.png"
                alt="ByteBasket Logo"
                width={250}
                height={50}
                className="mr-2"
              />
            </div>
            <nav className="flex gap-4">
              <Link
                href="/login"
                className={buttonVariants({ variant: "ghost" })}
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className={buttonVariants({ variant: "default" })}
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-32 text-center">
        <div className="text-center ">
          <h1 className="mb-6 text-6xl font-bold tracking-tight">
            Your Smart Kitchen
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              {" "}
              Assistant
            </span>
          </h1>
          <h2 className="mb-8 mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Transform your grocery shopping and cooking experience with
            AI-powered shopping lists, pantry management, and personalized
            recipe suggestions.
          </h2>
        </div>
          <Link
            href="/signup"
            className={buttonVariants({ variant: "default" })}
          >
            Get Started
          </Link>
      
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">
          Kitchen Tools That Actually Pull Their Weight
        </h2>
        <p className="text-lg text-center mb-12 text-gray-600">
          Say goodbye to expired yogurt, aimless shopping, and dinner disasters.
          Hello, genius kitchen hacks!
        </p>

        <div className="grid grid-cols-1 gap-8 px-4 py-16 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Smart Shopping Lists</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                The only list that’s smarter than you. (No offense.)
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="mb-3 text-xl font-semibold">
                Pantry Tracker
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Because finding expired yogurt in the back of the fridge is so
                last year.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="mb-3 text-xl font-semibold">
                AI Recipe Suggestions
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Your pantry + AI = Dinner magic (or at least edible results).
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-center mb-12 text-gray-600">
            Because nobody brags about forgetting their groceries.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Avatar className="mb-4">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <CardTitle>Amazing App!</CardTitle>
                <CardDescription>
                  "Never forgotten an ingredient since I started using
                  ByteBasket" - JD
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Avatar className="mb-4">
                  <AvatarFallback>CD</AvatarFallback>
                </Avatar>
                <CardTitle>Super Convenient</CardTitle>
                <CardDescription>
                  "I can’t believe I used to write shopping lists on paper like
                  it was 2005. Thanks, ByteBasket!" - CD
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Avatar className="mb-4">
                  <AvatarFallback>EF</AvatarFallback>
                </Avatar>
                <CardTitle>10/10 Would Recommend</CardTitle>
                <CardDescription>
                  "My dog accidentally added 10 packs of bacon to my list. Best
                  accident ever. Thanks, ByteBasket!" - EF
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
