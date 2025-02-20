import React from 'react';
import './Contact.css'; // Import the CSS file

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        <h1 className="contact-title">Let's Connect!</h1>

        <div className="contact-grid">

          {/* Contact Info Card */}
          <div className="contact-card">
            <h2>Get in Touch</h2>
            <p>Feel free to reach out for collaborations or just to say hello!</p>
            <div className="contact-details">
              <p><strong>Email:</strong> pasadill211@gmail.com</p>
              <p><strong>Location:</strong> Zamboanga City,Philippines</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="contact-form">
            <h2>Send a Message</h2>
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Contact;
