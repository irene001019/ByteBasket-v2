import { Item, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Item[]> {
  // Fetch data from your API here.
//   id: string
//   itemName: string
//   amount: string
//   description: string
//   price: number
//   date: string 
  return [
    {
        id: "728ed52f",
        itemName: "Apple",
        amount: "3 lb",
        description: "bought from superstor",
        price: 30,
        date: "2024-11-19",
    },
    {
        id: "728ed52g",
        itemName: "Banana",
        amount: "1 lb",
        description: "bought from costco",
        price: 10,
        date: "2024-11-10",
    },
    {
        id: "728ed52h",
        itemName: "KIWI",
        amount: "2 lb",
        description: "bought from superstor",
        price: 5,
        date: "2024-11-11",
    },
    // ...
  ]
}

export default async function shoppingHistoryPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10 bg-gray-100/50 min-h-screen">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
