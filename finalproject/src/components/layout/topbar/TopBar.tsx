'use client';

import React from 'react';
import styles from './TopBar.module.scss';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { logout } from '@/store/userSlice';
import AuthModal from '@/components/auth/AuthModal';

interface TopBarProps {
  onCartClick: () => void;
}

const TopBar = ({ onCartClick }: TopBarProps) => {
  const dispatch = useDispatch();
  const [isAuthModalOpen, setAuthModalOpen] = React.useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const user = useSelector((state: RootState) => state.user.user);
  const isLoggedIn = !!user;

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <>
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.left}>
            <Link href="/">
              <img src="/images/Logo-2x.webp" alt="Logo" className={styles.logo} />
            </Link>
          </div>

          <div className={styles.center}>
            <input
              type="text"
              placeholder="Search for iPad"
              className={styles.searchInput}
            />
            <button className={styles.searchButton}>
              <i className="ri-search-line"></i>
            </button>
          </div>

          <div className={styles.right}>
            <div className={styles.phoneBox}>
              <i className="ri-phone-line"></i>
              <div>
                <small>Need help? Call us:</small>
                <strong>+1 800 212 3434</strong>
              </div>
            </div>

            <div className={styles.iconLinks}>
              {isLoggedIn ? (
                <div
                  className={styles.iconButton}
                  onClick={handleLogout}
                  role="button"
                  tabIndex={0}
                >
                  <i className="ri-logout-box-line"></i>
                  <span>Logout</span>
                </div>
              ) : (
                <div
                  className={styles.iconButton}
                  onClick={() => setAuthModalOpen(true)}
                  role="button"
                  tabIndex={0}
                >
                  <i className="ri-user-line"></i>
                  <span>Sign In</span>
                </div>
              )}

              <div>
                <i className="ri-bar-chart-line"></i>
                <span>Compare</span>
              </div>
              <div>
                <i className="ri-heart-line"></i>
                <span>Favorites</span>
              </div>

              <div
                className={styles.cartIconWrapper}
                onClick={onCartClick}
                role="button"
                tabIndex={0}
              >
                <i className="ri-shopping-cart-line"></i>
                <span>Cart</span>
                {itemCount > 0 && (
                  <span className={styles.cartCount}>{itemCount}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};

export default TopBar;



