// src/pages/TodoPage.jsx
import { useState } from "react";

export default function TodoPage() {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/submittodoitem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemName, itemDescription }),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div>
      <h2>To-Do Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
        <textarea
          placeholder="Item Description"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
          required
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}
