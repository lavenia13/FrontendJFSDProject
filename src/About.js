// src/About.js
import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <section className="about-content">
        <div className="about-text">
          <h1 className="about-title">About Us</h1>
          <p>
            At Handloom Treasures, we celebrate the rich heritage of handloom fabrics while empowering the artisans who craft them. Our mission is to promote sustainable fashion by providing a global platform for these talented individuals. We are dedicated to preserving the art of handloom weaving, ensuring that its beauty and significance continue to inspire future generations. Our motto, "Crafting Tomorrow's Legacy," encapsulates our commitment to honoring tradition while innovating for the future.
          </p>
          <blockquote className="about-quote">
            <p>"Weaving dreams into reality, one thread at a time."</p>
          </blockquote>
        </div>
        <div className="about-image">
          <img 
            src="https://www.ibef.org/assets/images/exports/Handloom-Industry.jpg" 
            alt="Handloom Art" 
            className="about-image-src"
          />
        </div>
      </section>
    </div>
  );
}

export default About;
