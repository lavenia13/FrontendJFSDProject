import React, { useEffect, useState } from "react";
import './ArtisanInventory.css'; 

function ArtisanInventory() {
  const [inventory, setInventory] = useState([]);
  const [newInventory, setNewInventory] = useState({ productName: "", stockQuantity: 0 });
  const [editId, setEditId] = useState(null); // Add a state to track which inventory item is being edited

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const response = await fetch("http://localhost:2030/api/inventory");
    const data = await response.json();
    setInventory(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInventory((prev) => ({ ...prev, [name]: value }));
  };

  const addInventory = async () => {
    await fetch("http://localhost:2030/api/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newInventory),
    });
    fetchInventory();
    setNewInventory({ productName: "", stockQuantity: 0 });
  };

  const updateInventory = async () => {
    if (editId !== null) {
      await fetch(`http://localhost:2030/api/inventory/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInventory),
      });
      fetchInventory();
      setNewInventory({ productName: "", stockQuantity: 0 }); // Reset fields after update
      setEditId(null); // Reset the edit state
    }
  };

  const deleteInventory = async (id) => {
    await fetch(`http://localhost:2030/api/inventory/${id}`, {
      method: "DELETE",
    });
    fetchInventory();
  };

  const handleEditClick = (item) => {
    setNewInventory({ productName: item.productName, stockQuantity: item.stockQuantity });
    setEditId(item.id); // Store the item ID to identify which item is being edited
  };

  return (
    <div className="content">
      <h1>Inventory</h1>
      <section>
        <h2>Inventory List</h2>
        <ul>
          {inventory.map((item) => (
            <li key={item.id}>
              <div>Product: {item.productName}</div>
              <div>Stock: {item.stockQuantity}</div>
              <button onClick={() => deleteInventory(item.id)}>Delete</button>
              <button onClick={() => handleEditClick(item)}>Update</button>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>{editId ? "Update Inventory" : "Add Inventory"}</h2>
        <input
          type="text"
          placeholder="Product Name"
          name="productName"
          value={newInventory.productName}
          onChange={handleInputChange}
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          name="stockQuantity"
          value={newInventory.stockQuantity}
          onChange={handleInputChange}
        />
        <button onClick={editId ? updateInventory : addInventory}>
          {editId ? "Update Inventory" : "Add Inventory"}
        </button>
      </section>
    </div>
  );
}

export default ArtisanInventory;
