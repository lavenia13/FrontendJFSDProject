import React, { useEffect, useState } from "react";
import './ArtisanOrders.css';

function ArtisanOrders() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ customerName: "", status: "" });
  const [error, setError] = useState("");
  const [editOrder, setEditOrder] = useState(null); // Track the order being edited

  // Fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  // Function to fetch orders from the backend
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:2030/api/orders");
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error(err.message);
      setError("Error fetching orders.");
    }
  };

  // Handle input field changes for new and edit orders
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editOrder) {
      setEditOrder((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewOrder((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Function to add a new order
  const addOrder = async () => {
    try {
      const response = await fetch("http://localhost:2030/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });
      if (!response.ok) {
        throw new Error("Failed to add order");
      }
      fetchOrders(); // Refresh orders after adding
      setNewOrder({ customerName: "", status: "" }); // Reset input fields
    } catch (err) {
      console.error(err.message);
      setError("Error adding order.");
    }
  };

  // Function to delete an order
  const deleteOrder = async (id) => {
    try {
      const response = await fetch(`http://localhost:2030/api/orders/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete order");
      }
      fetchOrders(); // Refresh orders after deletion
    } catch (err) {
      console.error(err.message);
      setError("Error deleting order.");
    }
  };

  // Function to update an order
  const updateOrder = async () => {
    try {
      const response = await fetch(`http://localhost:2030/api/orders/${editOrder.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editOrder),
      });
      if (!response.ok) {
        throw new Error("Failed to update order");
      }
      fetchOrders(); // Refresh orders after update
      setEditOrder(null); // Reset edit mode
    } catch (err) {
      console.error(err.message);
      setError("Error updating order.");
    }
  };

  return (
    <div className="content">
      <h1>Orders</h1>
      {error && <div className="error">{error}</div>}

      {/* Order List Section */}
      <section>
        <h2>Order List</h2>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              {editOrder && editOrder.id === order.id ? (
                <>
                  <input
                    type="text"
                    name="customerName"
                    value={editOrder.customerName}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="status"
                    value={editOrder.status}
                    onChange={handleInputChange}
                  />
                  <button onClick={updateOrder}>Save</button>
                  <button onClick={() => setEditOrder(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <div>Order ID: {order.id}</div>
                  <div>Customer: {order.customerName}</div>
                  <div>Status: {order.status}</div>
                  <button onClick={() => setEditOrder(order)}>Update</button>
                  <button onClick={() => deleteOrder(order.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Add Order Section */}
      <section>
        <h2>Add Order</h2>
        <input
          type="text"
          placeholder="Customer Name"
          name="customerName"
          value={newOrder.customerName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Status"
          name="status"
          value={newOrder.status}
          onChange={handleInputChange}
        />
        <button onClick={addOrder}>Add Order</button>
      </section>
    </div>
  );
}

export default ArtisanOrders;
