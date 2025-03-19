import React, { useState } from 'react';
import './ContactUs.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:2030/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setPopupMessage('Details sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Reset the form
      } else {
        setPopupMessage('Failed to send details. Please try again.');
      }
    } catch (error) {
      setPopupMessage('An error occurred. Please try again.');
    } finally {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
    }
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>We'd love to hear from you! Whether you have questions or just want to get in touch, feel free to reach out.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your Email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleInputChange}
            rows="4"
            placeholder="Your Message"
            required
          ></textarea>
        </div>

        <button className="submit-button" type="submit">
          Send Message
        </button>
      </form>

      <div className="contact-info">
        <h2>Our Location</h2>
        <p>Bandar Road, Vijayawada , India</p>
        <p>
          Phone: <a href="tel:+1234567890">+91 1234569078</a>
        </p>
        <p>
          Email: <a href="mailto:Heirava@gmail.com">Heirava@gmail.com</a>
        </p>
      </div>

      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=..."
          width="100%"
          height="250"
          allowFullScreen=""
          loading="lazy"
          title="Location Map"
        ></iframe>
      </div>

      {showPopup && (
        <div className="popup-message show">
          {popupMessage}
        </div>
      )}
    </div>
  );
}

export default ContactUs;
