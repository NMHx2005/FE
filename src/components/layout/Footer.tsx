import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__column">
            <h3 className="footer__title">Car Rental</h3>
            <p className="footer__description">
              Dịch vụ cho thuê xe chất lượng cao với giá cả phải chăng.
            </p>
            {/* Add social media icons if needed */}
            {/* <div className=\"footer__social\"> */}
            {/*   <a href=\"#\" className=\"footer__social-link\"><i className=\"fab fa-facebook\"></i></a> */}
            {/*   <a href=\"#\" className=\"footer__social-link\"><i className=\"fab fa-twitter\"></i></a> */}
            {/*   <a href=\"#\" className=\"footer__social-link\"><i className=\"fab fa-instagram\"></i></a> */}
            {/* </div> */}
          </div>

          <div className="footer__column">
            <h3 className="footer__title">Liên kết</h3>
            <ul className="footer__list">
              <li>
                <Link to="/" className="footer__link">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/san-pham" className="footer__link">
                   Sản phẩm
                </Link>
              </li>
               <li>
                <Link to="/dich-vu" className="footer__link">
                   Dịch vụ
                </Link>
              </li>
               <li>
                <Link to="/price-list" className="footer__link">
                   Bảng giá
                </Link>
              </li>
               <li>
                <Link to="/tin-tuc" className="footer__link">
                   Tin tức
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer__link">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer__column">
            <h3 className="footer__title">Liên hệ</h3>
            <ul className="footer__list">
               <li className="footer__contact-item">
                 {/* Add icon if needed */}
                 {/* <i className=\"fas fa-envelope\"></i> */}
                 Email: info@carrental.com
               </li>
               <li className="footer__contact-item">
                  {/* Add icon if needed */}
                 {/* <i className=\"fas fa-phone-alt\"></i> */}
                 Điện thoại: (84) 123-456-789
               </li>
               <li className="footer__contact-item">
                  {/* Add icon if needed */}
                 {/* <i className=\"fas fa-map-marker-alt\"></i> */}
                 Địa chỉ: 123 Đường ABC, Quận XYZ, TP. HCM
               </li>
            </ul>
          </div>
           {/* Add another column if needed based on main.scss structure */}
            <div className="footer__column">
             <h3 className="footer__title">Theo dõi chúng tôi</h3>
             <div className="footer__social">
                 {/* Example social links - replace with actual icons and links */}
                 <a href="#" className="footer__social-link">{/* <i className="fab fa-facebook-f"></i> */}Facebook</a>
                 <a href="#" className="footer__social-link">{/* <i className="fab fa-twitter"></i> */}Twitter</a>
                 <a href="#" className="footer__social-link">{/* <i className="fab fa-instagram"></i> */}Instagram</a>
             </div>
           </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; 2024 Car Rental. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 