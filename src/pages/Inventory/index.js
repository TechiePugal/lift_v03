import React, { useState } from "react";
import InventoryLayout from "../../components/ui/Inventory/InventoryLayout";

const categoriesData = [
  {
    code: "100",
    itemName: "Disposible Gloves",
    category: "Medical Supplies",
    brandNmodel: "Adidas",
    uom: "box",
    rol: "5",
    stock: "06",
    price: "500"
  },
  {
    code: "101",
    itemName: "Surgical Masks",
    category: "Medical Supplies",
    brandNmodel: "Nike",
    uom: "box",
    rol: "10",
    stock: "20",
    price: "800"
  },
  {
    code: "102",
    itemName: "Hand Sanitizer",
    category: "Medical Supplies",
    brandNmodel: "Puma",
    uom: "bottle",
    rol: "3",
    stock: "15",
    price: "300"
  },
  {
    code: "103",
    itemName: "Disposable Gowns",
    category: "Medical Supplies",
    brandNmodel: "Reebok",
    uom: "piece",
    rol: "8",
    stock: "12",
    price: "700"
  },
  {
    code: "104",
    itemName: "First Aid Kits",
    category: "Medical Supplies",
    brandNmodel: "Under Armour",
    uom: "kit",
    rol: "2",
    stock: "8",
    price: "1200"
  },
  // Add more objects as needed
];


const InventoryPage = () => {
  // const [categoriesData, setCategoriesData] = useState([])
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [category, setCategory] = useState([]);
const [selectedCategory, setSelectedCategory] = useState("")
  return (
    <div>
      <InventoryLayout
        categoriesData={categoriesData}
        loading={loading}
        setSearchKey={setSearchKey}
        searchKey={searchKey}
        category={category}
        setCategory={setCategory}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
};

export default InventoryPage;
