import React, { useRef, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

import './Home.css';

function Home() {
  const typesSectionRef = useRef(null);
  const [expandedCategory, setExpandedCategory] = useState(null);


  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  const heroImages = [
    {
      img: "https://st3.depositphotos.com/3058513/15404/i/450/depositphotos_154044038-stock-photo-background-of-bamboo-mat-plate.jpg",
      title: "Welcome to Handloom Treasures",
      description:
        "Discover the elegance and artistry of authentic handloom products crafted by skilled artisans from around the world.",
    },
    {
      img: "https://t4.ftcdn.net/jpg/02/23/09/65/360_F_223096532_IF9tbORAsAeyy88QAKLLEk2gNEn0dHil.jpg",
      title: "Artistry in Every Thread",
      description: "Experience the rich tradition of handwoven fabrics with timeless designs.",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0R9mSwO3hSL6W1dqxkFi3nlbfZLXtqXD8hA&s",
      title: "Heritage Meets Elegance",
      description: "Support sustainable fashion by choosing authentic handlooms.",
    },
  ];
  // Function to scroll to collections sectio
  const scrollToCollections = () => {
    typesSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-page">
       <section className="hero-section">
        <Slider {...sliderSettings}>
          {heroImages.map((slide, index) => (
            <div key={index} className="hero-slide">
              <div
                className="hero-slide-image"
                style={{
                  backgroundImage: `url(${slide.img})`,
                }}
              >
                <div className="hero-overlay">
                  <div className="hero-content">
                    <h1>{slide.title}</h1>
                    <p>{slide.description}</p>
                    <button
                      className="explore-button"
                      onClick={scrollToCollections} // Scroll to collections section
                    >
                      Explore Collections
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* About Handlooms */}
      <section className="about-section">
        <h2>About Handlooms</h2>
        <p>Handlooms are fabrics created with intricate artistry, passed down through generations. Each piece tells a story of heritage, skill, and craftsmanship.</p>
      </section>

      {/* Types of Handlooms */}
      <section className="types-section" ref={typesSectionRef}>
        <h2>Our Collections</h2>
        
        <div className="handloom-type" onClick={() => toggleCategory('Cotton')}>
          <img src="https://m.media-amazon.com/images/I/81-IkIqx6JL._AC_UY1100_.jpg" alt="Cotton Handloom" />
          <h3>Cotton Handloom</h3>
          <p>Known for its softness and comfort, ideal for traditional wear.</p>
          {expandedCategory === 'Cotton' && (
            <div className="expanded-content">
              <h3>Cotton Categories</h3>
              <ul>
                <li><strong>Khadi</strong>: Hand-spun and hand-woven, khadi cotton is known for its raw texture and durability, symbolizing India's independence.</li>
                <li><strong>Chanderi Cotton</strong>: Lightweight and soft, often blended with silk and used for sarees and suits.</li>
                <li><strong>Ikat Cotton</strong>: Known for unique dyeing technique with geometric designs, especially from Pochampally and Odisha.</li>
                <li><strong>Narayanpet Cotton</strong>: From Maharashtra and Karnataka, with traditional striped patterns, ideal for everyday wear.</li>
              </ul>
            </div>
          )}
        </div>
        
        <div className="handloom-type" onClick={() => toggleCategory('Silk')}>
          <img src="https://img.perniaspopupshop.com/catalog/product/s/n/SNGC122303_1.jpg?impolicy=detailimageprod" alt="Silk Handloom" />
          <h3>Silk Handloom</h3>
          <p>Renowned for luxurious feel, perfect for special occasions.</p>
          {expandedCategory === 'Silk' && (
            <div className="expanded-content">
              <h3>Silk Categories</h3>
              <ul>
                <li><strong>Banarasi Silk</strong>: Known for intricate zari work and Mughal-inspired designs, ideal for weddings.</li>
                <li><strong>Mysore Silk</strong>: Fine texture, rich colors with plain bodies and traditional zari borders.</li>
                <li><strong>Gadwal Silk</strong>: Lightweight weave with contrast borders, often blending silk and cotton.</li>
                <li><strong>Kalamkari Silk</strong>: Traditional hand-painted or block-printed motifs, popular for sarees and dupattas.</li>
              </ul>
            </div>
          )}
        </div>
        
        <div className="handloom-type" onClick={() => toggleCategory('Wool')}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNbsBz2alcCONGkrT4_48r5q0K8_McY1WiHQ&s" alt="Wool Handloom" />
          <h3>Wool Handloom</h3>
          <p>Known for warmth and durability, excellent for colder climates.</p>
          {expandedCategory === 'Wool' && (
            <div className="expanded-content">
              <h3>Wool Categories</h3>
              <ul>
                <li><strong>Pashmina</strong>: Luxurious and warm, made from the fine undercoat of Himalayan goats, known for hand-embroidery.</li>
                <li><strong>Coorgi Shawls</strong>: Thick wool shawls from Karnataka, worn by the Kodava community.</li>
                <li><strong>Dhabla</strong>: Woolen shawls from Gujarat with vibrant geometric patterns, used by the Rabari community.</li>
                <li><strong>Rupshu Shawls</strong>: Thick and warm shawls from Ladakh, often made from yak or sheep wool.</li>
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Scrolling Quotes Section */}
      <section className="quotes-section">
        <div className="quotes-container">
          <div className="quote">
            "Handlooms reflect the heart and soul of artisans."
          </div>
          <div className="quote">
            "Each fabric tells a story of tradition and craftsmanship."
          </div>
          <div className="quote">
            "Preserve heritage, wear handloom."
          </div>
          <div className="quote">
            "Sustainable fashion, woven with love."
          </div>
          <div className="quote">
            "Empowering artisans, one thread at a time."
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;