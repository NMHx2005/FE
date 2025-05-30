import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const cartState = useSelector((state: RootState) => state.cart);
  const cart = cartState.cart;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const itemCount = cart?.items?.length || 0;

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header__auth-bar">
        <div className="header__container header__auth-container">
          <div className="header__auth-links">
            {user ? (
              <>
                <span>Xin chào {user.Username}</span>
                <button onClick={handleLogout} className="header__auth-button">Đăng xuất</button>
              </>
            ) : (
              <>
                <Link to="/login" className="header__auth-link" onClick={closeMobileMenu}>Đăng nhập</Link>
                <Link to="/register" className="header__auth-link" onClick={closeMobileMenu}>
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="header__main-bar">
        <div className="header__container header__main-container">
          <div className="header__row">
            <Link to="/" className="header__logo-link" onClick={closeMobileMenu}>
              <img src="./images/BMW_logo_(gray).svg.png" alt="Logo" className="header__logo" />
            </Link>
            
            <nav className="header__nav">
              <Link to="/" className="header__nav-link" onClick={closeMobileMenu}>Trang chủ</Link>
              <Link to="/san-pham" className="header__nav-link" onClick={closeMobileMenu}>Sản phẩm</Link>
              <Link to="/dich-vu" className="header__nav-link" onClick={closeMobileMenu}>Dịch vụ</Link>
              <Link to="/bang-gia" className="header__nav-link" onClick={closeMobileMenu}>Bảng giá</Link>
              <Link to="/tin-tuc" className="header__nav-link" onClick={closeMobileMenu}>Tin tức</Link>
              <Link to="/dat-hen-lai-thu" className="header__nav-link" onClick={closeMobileMenu}>Đăng ký lái thử</Link>
            </nav>

            <div className="header__search-container">
              <input type="text" placeholder="Tìm kiếm..." className="header__search-box" />
              <button type="button" className="header__search-button"><SearchOutlined /></button>
            </div>
            
            <Link to="/cart" className="header__cart-link" onClick={closeMobileMenu}>
              <FaShoppingCart className="header__cart-icon" />
              {itemCount > 0 && (
                <span className="header__cart-count">
                  {itemCount}
                </span>
              )}
            </Link>

            <button className="header__mobile-menu-button" onClick={toggleMobileMenu}>
              <FaBars />
            </button>
          </div>
        </div>
      </div>

      <div className={`header__mobile-menu ${isMobileMenuOpen ? 'header__mobile-menu--open' : ''}`}>
        <div className="header__mobile-menu-header">
          <button className="header__mobile-menu-close" onClick={toggleMobileMenu}><FaTimes /></button>
        </div>
         <nav className="header__mobile-menu-nav">
            <Link to="/" className="header__mobile-menu-link" onClick={closeMobileMenu}>Trang chủ</Link>
            <Link to="/san-pham" className="header__mobile-menu-link" onClick={closeMobileMenu}>Sản phẩm</Link>
            <Link to="/dich-vu" className="header__mobile-menu-link" onClick={closeMobileMenu}>Dịch vụ</Link>
            <Link to="/bang-gia" className="header__mobile-menu-link" onClick={closeMobileMenu}>Bảng giá</Link>
            <Link to="/tin-tuc" className="header__mobile-menu-link" onClick={closeMobileMenu}>Tin tức</Link>
            <Link to="/dat-hen-lai-thu" className="header__mobile-menu-link" onClick={closeMobileMenu}>Đăng ký lái thử</Link>
         </nav>
         <div className="header__mobile-menu-auth">
             {user ? (
              <><Link to="/profile" className="header__mobile-menu-link" onClick={closeMobileMenu}>Thông tin cá nhân</Link>
                 {user.Role === 'admin' && (
                   <Link to="/admin" className="header__mobile-menu-link" onClick={closeMobileMenu}>Quản trị</Link>
                )}
                <button onClick={handleLogout} className="header__mobile-menu-link">Đăng xuất</button></>
            ) : (
              <><Link to="/login" className="header__mobile-menu-link" onClick={closeMobileMenu}>Đăng nhập</Link>
                <Link to="/register" className="header__mobile-menu-link" onClick={closeMobileMenu}>Đăng ký</Link></>
            )}
         </div>
      </div>
      
      {isMobileMenuOpen && <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>}
    </header>
  );
};

export default Header; 