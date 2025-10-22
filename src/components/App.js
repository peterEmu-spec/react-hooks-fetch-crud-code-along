import React, { useEffect, useState } from "react";
import ShoppingList from "./ShoppingList";
import ItemForm from "./ItemForm";

function App() {
  const [items, setItems] = useState([]);

  // GET items on mount
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((data) => setItems(data));
  }, []);

  // Add new item (POST)
  function handleAddItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
  }

  // Update item (PATCH)
  function handleUpdateItem(updatedItem) {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  }

  // Delete item (DELETE)
  function handleDeleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  return (
    <div>
      <h1>Shopping List</h1>
      <ItemForm onAddItem={handleAddItem} />
      <ShoppingList
        items={items}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
}

export default App;
