
'use client';

import React, { useState } from 'react';
import styles from './MainNavbar.module.scss';
import Link from 'next/link';

const MainNavbar = () => {
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState('USD');

  const translations = {
    English: {
      home: 'Home',
      demos: 'Demos',
      elements: 'Elements',
      shop: 'Shop',
      story: 'Our Story',
      blogs: 'Blogs',
      contact: 'Contact',
      sale: 'Sale! 30% OFF',
    },
    Azerbaijani: {
      home: 'Ana səhifə',
      demos: 'Demos',
      elements: 'Elementlər',
      shop: 'Mağaza',
      story: 'Hekayəmiz',
      blogs: 'Bloqlar',
      contact: 'Əlaqə',
      sale: 'Endirim! 30% ENDİRİM',
    },
  };

  const handleCurrencyChange = (currency: string) => {
    setCurrentCurrency(currency);
    setCurrencyOpen(false);
  };

  const handleLangChange = (lang: string) => {
    setCurrentLang(lang);
    setOpen(false);
  };

  return (
    <div className={styles.MainNavbar}>
      <div className={styles.mainNavbarContainer}>
        <div className={styles.mainNavbarLeft}>
          <div className={styles.navMenu}>
            <i className="ri-layout-grid-line"></i>
            <span>All Departments</span>
            <i className="ri-arrow-down-s-line"></i>
          </div>
        </div>

        <div className={styles.mainNavbarCenter}>
          <div className={styles.nav}>
            <ul>
              <li><Link href="/">{translations[currentLang].home}</Link></li>
              <li><Link href="/">{translations[currentLang].demos}</Link></li>
              <li><Link href="/">{translations[currentLang].elements}</Link></li>
              <li><Link href="/user/shop">{translations[currentLang].shop}</Link></li>
              <li><Link href="/our-story">{translations[currentLang].story}</Link></li>
              <li><Link href="/blog">{translations[currentLang].blogs}</Link></li>
              <li><Link href="/contact-us">{translations[currentLang].contact}</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.mainNavbarRight}>
          <div className={styles.language}>
            <div className={styles.trigger} onClick={() => setOpen(!open)}>
              <span>{currentLang}</span>
              <i className="ri-arrow-down-s-line"></i>
            </div>
            {open && (
              <ul className={styles.dropdown}>
                {currentLang !== 'English' && (
                  <li onClick={() => handleLangChange('English')}>English</li>
                )}
                {currentLang !== 'Azerbaijani' && (
                  <li onClick={() => handleLangChange('Azerbaijani')}>Azerbaijani</li>
                )}
              </ul>
            )}
          </div>

          <div className={styles.currency}>
            <div className={styles.trigger} onClick={() => setCurrencyOpen(!currencyOpen)}>
              <span>{currentCurrency}</span>
              <i className="ri-arrow-down-s-line"></i>
            </div>
            {currencyOpen && (
              <ul className={styles.dropdown}>
                {currentCurrency !== 'USD' && (
                  <li onClick={() => handleCurrencyChange('USD')}>USD</li>
                )}
                {currentCurrency !== 'EUR' && (
                  <li onClick={() => handleCurrencyChange('EUR')}>EUR</li>
                )}
              </ul>
            )}
          </div>
        </div>

        <div className={styles.buttonSale}>
          <Link href="/shop">
            <span>{translations[currentLang].sale}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
