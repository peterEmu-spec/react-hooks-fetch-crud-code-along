import React, { useState } from "react";

function ItemForm({ onAddItem }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Produce",
  });

  // handle input and select change
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // handle form submit
  function handleSubmit(event) {
    event.preventDefault();

    const newItem = {
      name: formData.name,
      category: formData.category,
      isInCart: false,
    };

    // send POST request to server
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((r) => r.json())
      .then((addedItem) => {
        onAddItem(addedItem);
        // reset the form
        setFormData({ name: "", category: "Produce" });
      });
  }

  return (
    <form className="new-item-form" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          placeholder="Enter item name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
          <option value="Meat">Meat</option>
          <option value="Dessert">Dessert</option> {/* ✅ Added to fix test */}
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;