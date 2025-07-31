'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
       
        <div className={styles.logoSection}>
          <Link href="/">
            <img src="/images/Logo-footer.svg" alt="XStore Logo" />
          </Link>
          <div className={styles.contactInfo}>
            <h5>Call us 24/7</h5>
            <h3>+1 1800 9797 6000</h3>
            <p>215 Western Plaza, Melbourne, Australia</p>
            <a href="mailto:contact@xstore.com">contact@xstore.com</a>
            <div className={styles.socialIcons}>
              <Link href="#"><i className="ri-facebook-fill"></i></Link>
              <Link href="#"><i className="ri-twitter-x-line"></i></Link>
              <Link href="#"><i className="ri-instagram-line"></i></Link>
              <Link href="#"><i className="ri-youtube-line"></i></Link>
              <Link href="#"><i className="ri-telegram-line"></i></Link>
            </div>
          </div>
        </div>

        
        <div className={styles.menuList}>
          <h4>Our Story</h4>
          <ul>
            <li><Link href="#">Company Profile</Link></li>
            <li><Link href="#">Our Facility</Link></li>
            <li><Link href="#">Commitment To Quality</Link></li>
            <li><Link href="#">Contract Manufacturing</Link></li>
            <li><Link href="#">Our Awards</Link></li>
          </ul>
        </div>

       
        <div className={styles.menuList}>
          <h4>Categories</h4>
          <ul>
            <li><Link href="#">Smartphone</Link></li>
            <li><Link href="#">Gaming Laptop</Link></li>
            <li><Link href="#">Smart Home</Link></li>
            <li><Link href="#">Major Appliances</Link></li>
            <li><Link href="#">Technologies</Link></li>
            <li><Link href="#">Accessories</Link></li>
          </ul>
        </div>

       
        <div className={styles.menuList}>
          <h4>Quick Link</h4>
          <ul>
            <li><Link href="#">Blog</Link></li>
            <li><Link href="#">Subscription</Link></li>
            <li><Link href="#">Announcements</Link></li>
            <li><Link href="#">FAQ’s</Link></li>
          </ul>
        </div>

       
        <div className={styles.menuList}>
          <h4>Contact Us</h4>
          <ul>
            <li><Link href="#">Become a Seller</Link></li>
            <li><Link href="#">Contract Manufacturing</Link></li>
            <li><Link href="#">Terms & Condition</Link></li>
            <li><Link href="#">Career with us</Link></li>
            <li><Link href="#">Consumer enquiry</Link></li>
          </ul>
        </div>
      </div>

      
      <div className={styles.bottomBar}>
        <p>© 2024 XStore theme. Created by 8theme – WordPress WooCommerce themes.</p>
        <div className={styles.payments}>
          <a href="#"><img src="/images/Payment.svg" alt="Visa" /></a>
      
        </div>
      </div>
    </footer>
  );
};

export default Footer;
