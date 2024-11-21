"use client";

import React, { useState } from "react";

type ListItem = {
  id: string;
  itemName: string;
  amount: string;
  expirationDate?: string; // Optional for different table configurations
  section?: string; // Optional for Shopping List
  selected: boolean;
};

type EditableTableLayoutProps = {
  title: string;
  columns: {
    header: string;
    accessor: keyof ListItem;
    type: "text" | "date" | "checkbox"; // Field type for input rendering
    placeholder?: string; // Optional placeholder for text fields
  }[];
};

const EditableTableLayout: React.FC<EditableTableLayoutProps> = ({
  title,
  columns,
}) => {
  const [data, setData] = useState<ListItem[]>([
    { id: "1", itemName: "", amount: "", expirationDate: "", section: "", selected: false },
    { id: "2", itemName: "", amount: "", expirationDate: "", section: "", selected: false },
  ]);

  const handleInputChange = (
    id: string,
    field: keyof ListItem,
    value: string | boolean
  ) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const addRow = () => {
    setData((prev) => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        itemName: "",
        amount: "",
        expirationDate: "",
        section: "",
        selected: false,
      },
    ]);
  };

  return (
    <div className="p-4 py-10min-h-screen bg-gray-100/50 p-4  py-10">
      <div className="flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        {title}
        </h1>
        </div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="border border-gray-300 px-4 py-2 bg-[#A1EEBD]/50"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className= "bg-white/70">
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={col.accessor} className="border border-gray-300 px-4 py-2">
                  {col.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={item[col.accessor] as boolean}
                      onChange={(e) =>
                        handleInputChange(item.id, col.accessor, e.target.checked)
                      }
                    />
                  ) : col.type === "date" ? (
                    <input
                      type="date"
                      value={(item[col.accessor] as string) || ""}
                      onChange={(e) =>
                        handleInputChange(item.id, col.accessor, e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                  ) : (
                    <input
                      type="text"
                      value={(item[col.accessor] as string) || ""}
                      onChange={(e) =>
                        handleInputChange(item.id, col.accessor, e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                      placeholder={col.placeholder || ""}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={addRow}
        className="mt-4 px-3 bg-green-900 text-white rounded hover:bg-blue-500 text-2xl"
      >
        +
      </button>
    </div>
  );
};

export default EditableTableLayout;
