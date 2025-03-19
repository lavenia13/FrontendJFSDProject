import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

// Import components
import Navbar from "./Navbar";
import Home from "./Home";
import AdminLogin from "./AdminLogin";
import About from "./About";
import ContactUs from "./ContactUs";
import ArtisanLoginSignup from "./ArtisanLoginSignup";
import ArtisanHomePage from "./ArtisanHomePage";
import ArtisanProducts from "./ArtisanProducts";
import ArtisanOrders from "./ArtisanOrders";
import ArtisanInventory from "./ArtisanInventory";
import ArtisanNavbar from "./ArtisanNavbar";
import ArtisanProfile from "./ArtisanProfile";
import AdminHomePage from "./AdminHomepage";
import AdminNavbar from "./AdminNavbar";
import AdminBuyerUsers from "./AdminBuyerUsers";
import AdminArtisanUsers from "./AdminArtisanUsers";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import AdminInventory from "./AdminInventory";
import BuyerLoginSignup from "./BuyerLoginSignup";
import BuyerHomePage from "./BuyerHomePage";
import BuyerNavbar from "./BuyerNavbar";
import BuyerProfile from "./BuyerProfile";
import BuyerWishlist from "./BuyerWishlist";
import ProductsPage from "./ProductsPage";
import CartPage from "./CartPage";
import Wishlist from "./BuyerWishlist";
import Checkout from "./Checkout";
import OrderReceipt from "./OrderReceipt";

function Layout() {
  const location = useLocation();

  // Define the routes where the Navbar should be displayed
  const navbarRoutes = ["/", "/aboutus", "/contactus", "/admin","/buyer","/artisan"];

  return (
    <div className="App">
      {/* Show Navbar only for the specified pages */}
      {navbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        {/* General Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/admin" element={<AdminLogin />} />

        {/* Artisan Routes */}
        <Route path="/artisan" element={<ArtisanLoginSignup />} />
        <Route path="/artisan-home" element={<><ArtisanNavbar /><ArtisanHomePage /></>} />
        <Route path="/products" element={<><ArtisanNavbar /><ArtisanProducts /></>} />
        <Route path="/orders" element={<><ArtisanNavbar /><ArtisanOrders /></>} />
        <Route path="/inventory" element={<><ArtisanNavbar /><ArtisanInventory /></>} />
        <Route path="/artisan-profile" element={<><ArtisanNavbar /><ArtisanProfile /></>} />

        {/* Admin Routes */}
        <Route path="/admin-home" element={<><AdminNavbar /><AdminHomePage /></>} />
        <Route path="/admin-buyerusers" element={<><AdminNavbar /><AdminBuyerUsers /></>} />
        <Route path="/admin-Artisanusers" element={<><AdminNavbar /><AdminArtisanUsers /></>} />
        <Route path="/admin-orders" element={<><AdminNavbar /><AdminOrders /></>} />
        <Route path="/admin-products" element={<><AdminNavbar /><AdminProducts /></>} />
        <Route path="/admin-inventory" element={<><AdminNavbar /><AdminInventory /></>} />

        {/* Buyer Routes */}
        <Route path="/buyer" element={<BuyerLoginSignup />} />
        <Route path="/buyer-home" element={<><BuyerNavbar /><BuyerHomePage /></>} />
        <Route path="/buyer-profile" element={<><BuyerNavbar /><BuyerProfile /></>} />
        <Route path="/buyer-wishlist" element={<><BuyerNavbar /><BuyerWishlist /></>} />
        <Route path="/buyer-products" element={<><BuyerNavbar /><ProductsPage /></>} />
        <Route path="/buyer-cart" element={<><BuyerNavbar /><CartPage/></>} />
        <Route path="/wishlist" element={<><BuyerNavbar /><Wishlist /></>} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-receipt" element={<OrderReceipt />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
