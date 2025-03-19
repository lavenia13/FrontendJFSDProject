import React, { useState, useEffect } from 'react';
import './AdminProducts.css';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    productId: '',
    name: '',
    description: '',
    price: ''
  });

  useEffect(() => {
    fetch('http://localhost:2030/api/products') // Corrected endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data || []); // Ensure data is an array
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  // Handle Delete Product
  const handleDelete = (id) => {
    fetch(`http://localhost:2030/api/products/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        setProducts(products.filter((product) => product.id !== id)); // Remove the deleted product from the list
      })
      .catch((error) => console.error('Error deleting product:', error));
  };

  // Handle Update Product (open the update form)
  const handleUpdateClick = (product) => {
    setEditingProduct(product);
    setUpdatedProduct({
      productId: product.productId,
      name: product.name,
      description: product.description,
      price: product.price
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit updated product data
  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    const updatedData = { ...updatedProduct, id: editingProduct.id };

    fetch(`http://localhost:2030/api/products/${editingProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        setProducts(products.map((product) =>
          product.id === editingProduct.id ? { ...product, ...updatedData } : product
        ));
        setEditingProduct(null); // Close the form
      })
      .catch((error) => console.error('Error updating product:', error));
  };

  return (
    <div className="admin-products">
      <h2>Product List</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.productId}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  <button onClick={() => handleUpdateClick(product)}>Update</button>
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products available.</p>
      )}

      {editingProduct && (
        <div className="update-form">
          <h3>Edit Product Details</h3>
          <form onSubmit={handleUpdateSubmit}>
            <div>
              <label>Product ID:</label>
              <input
                type="text"
                name="productId"
                value={updatedProduct.productId}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={updatedProduct.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={updatedProduct.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={updatedProduct.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <button type="submit">Update Product</button>
              <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;
