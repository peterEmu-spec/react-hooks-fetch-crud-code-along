import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  function handleToggleCart() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      // <-- use backticks here
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
      .then((r) => r.json())
      .then((updatedItem) => onUpdateItem(updatedItem));
  }

  function handleDelete() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      // <-- backticks here too
      method: "DELETE",
    }).then(() => onDeleteItem(item));
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick={handleToggleCart}>
        {item.isInCart ? "Remove From Cart" : "Add to Cart"}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default Item;
