import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  AlertCircleIcon,
  RefrigeratorIcon,
  ShoppingCartIcon,
} from "lucide-react";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100/50 p-4  py-10">
      <div className="flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Welcome Back Sunshine!
        </h1>
      </div>
      <div className="main-content px-6">
        <section className="flex justify-center items-center">
          <div className="grid grid-rows-3 grid-flow-col gap-4 md:grid-cols-3 lg:gap-8 max-w-7xl mx-auto">
            <div className="col-span-3">
              <Card className="p-8 bg-gradient-to-br from-pink-300 via-red-200 to-yellow-300 text-black rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-center mb-4">
                    Heads up!
                  </CardTitle>
                  <AlertCircleIcon
                    size="3em"
                    className="mx-auto mb-4 text-red-600"
                  />
                  <CardDescription className="text-lg">
                    <ul className="list-disc space-y-2">
                      <li>You have 3 items in your shopping list.</li>
                      <li>You have 2 items in your pantry.</li>
                    </ul>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
            <div className="row-span-2 col-span-2">
              <Card className="p-8 bg-gradient-to-br from-green-200 to-teal-300 text-black rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-center mb-4">
                    What's in my Cart?
                  </CardTitle>
                  <ShoppingCartIcon
                    size="3em"
                    className="mx-auto mb-4 text-green-600"
                  />
                  <CardDescription className="text-lg">
                    <ul className="list-disc space-y-2">
                      <li>Tomatoes</li>
                      <li>Potatoes</li>
                      <li>Onions</li>
                    </ul>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
            <div className="row-span-2 col-span-2">
              <Card className="p-8 bg-gradient-to-br from-blue-200 to-purple-300 text-black rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-center mb-4">
                    What's in my Pantry?
                  </CardTitle>
                  <RefrigeratorIcon
                    size="3em"
                    className="mx-auto mb-4 text-blue-600"
                  />
                  <CardDescription className="text-lg">
                    <ul className="list-disc space-y-2">
                      <li>Milk</li>
                      <li>Bread</li>
                      <li>Butter</li>
                    </ul>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
