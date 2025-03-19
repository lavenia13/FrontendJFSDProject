import React, { useEffect, useState } from 'react';
import './ArtisanProducts.css';

function ArtisanProducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ productId: '', name: '', description: '', price: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:2030/api/products');
    const data = await response.json();
    setProducts(data);
  };

  const handleAddProduct = async () => {
    const response = await fetch('http://localhost:2030/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });
    if (response.ok) {
      fetchProducts();
      setNewProduct({ productId: '', name: '', description: '', price: '' });
    }
  };

  const handleDeleteProduct = async (id) => {
    await fetch(`http://localhost:2030/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product }); // Populate editing fields
  };

  const handleUpdateProduct = async () => {
    if (editingProduct) {
      const response = await fetch(`http://localhost:2030/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      });
      if (response.ok) {
        fetchProducts();
        setEditingProduct(null); // Reset editing state
      }
    }
  };

  return (
    <div className="content">
      <h1>Products</h1>
      <section>
        <h2>Add Product</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add</button>
      </section>

      <h2>Available Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <div>Product ID: {product.productId}</div>
            <div>Name: {product.name}</div>
            <div>Description: {product.description}</div>
            <div>Price: {product.price}</div>
            <button onClick={() => handleEditProduct(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editingProduct && (
        <section>
          <h2>Edit Product</h2>
          <input
            type="text"
            placeholder="Name"
            value={editingProduct.name}
            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={editingProduct.description}
            onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={editingProduct.price}
            onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
          />
          <button onClick={handleUpdateProduct}>Update</button>
          <button onClick={() => setEditingProduct(null)}>Cancel</button>
        </section>
      )}
    </div>
  );
}

export default ArtisanProducts;
