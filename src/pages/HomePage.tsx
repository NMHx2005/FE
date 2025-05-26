import React, { useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import styles from './HomePage.module.scss'; // Import CSS module

const HomePage: React.FC = () => {
  const [activeProductTab, setActiveProductTab] = useState('BMW');
  const [activeNumberTab, setActiveNumberTab] = useState('X');

  return (
    <div className={styles.homePage}>
      <HeroSlider />

      {/* Product Categories */}
      <section className={styles.productSection}>
        <h2 className={styles.productSectionTitle}>DÒNG SẢN PHẨM</h2>
        {/* Product Tabs */}
        <div className={styles.productTabs}>
          {['BMW', 'BMW M', 'BMW i'].map((tab) => (
            <button
              key={tab}
              className={`${styles.productTab}${activeProductTab === tab ? ` ${styles.productTabActive}` : ''}`}
              onClick={() => setActiveProductTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Number Tabs */}
        <div className={styles.productNumberTabs}>
          {['3', '4', '5', '7', '8', 'X', 'Z'].map((number) => (
            <button
              key={number}
              className={`${styles.productNumberTab}${activeNumberTab === number ? ` ${styles.productNumberTabActive}` : ''}`}
              onClick={() => setActiveNumberTab(number)}
            >
              {number}
            </button>
          ))}
        </div>
        {/* Car Grid */}
        <div className={styles.productContainer}>
          <div className={styles.productRow}>
            {/* X5 */}
            <div className={styles.productCard}>
              <img src="/images/x5_resize.webp" alt="BMW X5" className={styles.productImage} />
              <div className={styles.productTitle}>BMW X5</div>
              <div className={styles.productFuel}>Xăng</div>
              <div className={styles.productPrice}>3.469.000.000 VND</div>
            </div>
            {/* X6 */}
            <div className={styles.productCard}>
              <img src="/images/x6.avif" alt="BMW X6" className={styles.productImage} />
              <div className={styles.productTitle}>BMW X6</div>
              <div className={styles.productFuel}>Xăng</div>
              <div className={styles.productPrice}>4.459.000.000 VND</div>
            </div>
            {/* X7 */}
            <div className={styles.productCard}>
              <img src="/images/x7_1_.webp" alt="BMW X7" className={styles.productImage} />
              <div className={styles.productTitle}>BMW X7</div>
              <div className={styles.productFuel}>Xăng</div>
              <div className={styles.productPrice}>5.549.000.000 VND</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featureSection}>
        <h2 className={styles.productSectionTitle}>TIỆN ÍCH</h2>
        <div className={styles.featureRow}>
          {/* Feature 1 */}
          <div className={styles.featureCard}>
            <img src="/images/feature-1.jpg" alt="Sổ sách xe" />
            <div className={styles.featureOverlay}>
              <div className={styles.featureTitle}>Sổ sách xe</div>
            </div>
          </div>
          {/* Feature 2 */}
          <div className={styles.featureCard}>
            <img src="/images/feature-2.jpg" alt="Bảng giá chi tiết" />
            <div className={styles.featureOverlay}>
              <div className={styles.featureTitle}>Bảng giá chi tiết</div>
            </div>
          </div>
          {/* Feature 3 */}
          <div className={styles.featureCard}>
            <img src="/images/feature-3.jpg" alt="Đặt lịch hẹn" />
            <div className={styles.featureOverlay}>
              <div className={styles.featureTitle}>Đặt lịch hẹn</div>
            </div>
          </div>
          {/* Feature 4 */}
          <div className={styles.featureCard}>
            <img src="/images/feature-4.jpg" alt="Đặt lịch lái thử" />
            <div className={styles.featureOverlay}>
              <div className={styles.featureTitle}>Đặt lịch lái thử</div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className={styles.newsSection}>
        <h2 className={styles.productSectionTitle}>TIN TỨC</h2>
        <div className={styles.newsItem}>
          <img src="/images/bmw-connect.jpg" alt="BMW Connect Drive" className={styles.newsImage} />
          <div className={styles.newsContent}>
            <h3>BMW CONNECT DRIVE</h3>
            <p>
              Các tính năng và dịch vụ có trên BMW Connect Drive đều là các tính năng hiện đại hỗ trợ người dùng.
              Những tính năng thông minh và tiện ích sẽ giúp đỡ cho cuộc sống của bạn trở nên dễ dàng hơn.
            </p>
            <button className={styles.newsBtnMore}>Tìm hiểu thêm</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 