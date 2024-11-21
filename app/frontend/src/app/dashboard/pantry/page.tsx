import EditableTableLayout from "@/components/layout";

export default function PantryList() {
  return (
    <EditableTableLayout
      title="Your Pantry"
      columns={[
        { header: "Select", accessor: "selected", type: "checkbox" },
        { header: "Item Name", accessor: "itemName", type: "text", placeholder: "Enter item name" },
        { header: "Amount", accessor: "amount", type: "text", placeholder: "Enter amount" },
        { header: "Expiration Date", accessor: "expirationDate", type: "date" },
      ]}
      
    />
  );
}
