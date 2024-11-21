import React from "react";
import { ReceiptText } from "lucide-react"; // Optional: Add Lucid icon if desired

type ReceiptLayoutProps = {
  children: React.ReactNode;
};

const ReceiptLayout: React.FC<ReceiptLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F0F9F6]/50 flex flex-col">
      
      <div className="flex justify-center p-4 py-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-12">Receipt Manager</h1>
      </div>
      

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center p-6">
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
          {children}
        </div>
      </main>
    </div>
  );
};

export default ReceiptLayout;
