import EditableTableLayout from "@/components/layout";

export default function ShoppingList() {
  return (
    <EditableTableLayout
      title="Shopping List"
      columns={[
        { header: "Select", accessor: "selected", type: "checkbox" },
        { header: "Item Name", accessor: "itemName", type: "text", placeholder: "Enter item name" },
        { header: "Amount", accessor: "amount", type: "text", placeholder: "Enter amount" },
        { header: "Section", accessor: "section", type: "text", placeholder: "Enter section" },
      ]}
    />
  );
}
