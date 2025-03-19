import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './ProductsPage.css';
import image1 from './assets/images/image1.jpg';
import image2 from './assets/images/image2.jpg';
import image3 from './assets/images/image3.png';
import image4 from './assets/images/image4.jpg';
import image5 from './assets/images/image5.jpg';
import image6 from './assets/images/image6.jpg';
import image7 from './assets/images/image7.jpg';
import image8 from './assets/images/image8.jpg';
import image9 from './assets/images/image9.jpg';
import image10 from './assets/images/image10.jpg';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Fetch products (this could be from an API or local data)
  useEffect(() => {
    const fetchedProducts = [
      { id: 1, name: 'Traditional Saree', description: 'A beautiful saree', price: 2500, image: image1 },
      { id: 2, name: 'Elegant Shawl', description: 'A stylish shawl', price: 1800, image: image2 },
      { id: 3, name: 'Handloom Dress Material', description: 'Quality handloom fabric', price: 3200, image: image3 },
      { id: 4, name: 'Printed Cotton Kurta', description: 'Comfortable cotton kurta', price: 1200, image: image4 },
      { id: 5, name: 'Embroidered Dupatta', description: 'Hand-embroidered dupatta', price: 1500, image: image5 },
      { id: 6, name: 'Handwoven Stole', description: 'Vibrant and warm stole', price: 2000, image: image6 },
      { id: 7, name: 'Kanjivaram Silk Saree', description: 'Elegant Kanjivaram silk saree', price: 5000, image: image7 },
      { id: 8, name: 'Handcrafted Jute Bag', description: 'Eco-friendly jute bag', price: 800, image: image8 },
      { id: 9, name: 'Block Print Cushion Cover', description: 'Hand block printed cover', price: 600, image: image9 },
      { id: 10, name: 'Handwoven Woolen Blanket', description: 'Soft and cozy blanket', price: 3500, image: image10 }
    ];
    setProducts(fetchedProducts);
  }, []);

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
    // Store product in local storage or state for cart
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.push(product);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    navigate('/buyer-cart'); // Redirect to the Cart page
  };

  // Handle adding product to wishlist
  const handleAddToWishlist = (product) => {
    console.log('Added to wishlist:', product);
    // Store product in local storage or state for wishlist
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlistItems.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    navigate('/wishlist'); // Redirect to the Wishlist page
  };

  return (
    <div className="products-page">
      <h2>Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-image" 
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            <button onClick={() => handleAddToWishlist(product)}>Add to Wishlist</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
