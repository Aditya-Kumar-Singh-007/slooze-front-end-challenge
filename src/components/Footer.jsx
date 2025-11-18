import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About GROSSTORE</h3>
          <p>Your trusted partner in commodity management and inventory solutions.</p>
          <div className="social-links">
            <Facebook size={20} />
            <Twitter size={20} />
            <Instagram size={20} />
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            <li>Inventory Management</li>
            <li>Product Analytics</li>
            <li>Supply Chain</li>
            <li>Financial Reports</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <div className="contact-item">
            <Mail size={16} />
            <span>support@grosstore.com</span>
          </div>
          <div className="contact-item">
            <Phone size={16} />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="contact-item">
            <MapPin size={16} />
            <span>123 Business St, City</span>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 GROSSTORE. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;