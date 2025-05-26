import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../api/config';
import { Product } from '../api/types'; // Import Product type
import { Spin, message, Typography, Image, Descriptions, Space, Button, notification } from 'antd';
import { formatCurrency } from '../utils/format';

const { Title, Paragraph } = Typography;

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get product ID from URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false); // State for add to cart loading

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/san-pham/${id}`);
        // Assuming API response structure is { data: { ...productData } }
        setProduct(response.data.data); // Access nested data if needed, adjust based on actual API response
      } catch (error) {
        console.error('Error fetching product detail:', error);
        message.error('Không thể tải chi tiết sản phẩm.');
        setProduct(null); // Set product to null on error
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]); // Refetch when ID changes

  const handleAddToCart = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        notification.warning({
          message: 'Vui lòng đăng nhập',
          description: 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng',
        });
        return;
      }

      setAddingToCart(true);
      await axios.post(`${API_BASE_URL}/gio-hang/${userId}/items`, {
        ProductID: product?._id,
        quantity: 1,
        Price: product?.Price || 0
      });

      notification.success({
        message: 'Thành công',
        description: 'Đã thêm sản phẩm vào giỏ hàng',
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      notification.error({
        message: 'Lỗi',
        description: 'Không thể thêm sản phẩm vào giỏ hàng',
      });
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" tip="Đang tải sản phẩm..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Title level={3}>Không tìm thấy sản phẩm</Title>
        <Paragraph>Sản phẩm bạn đang tìm kiếm có thể không tồn tại hoặc đã bị gỡ bỏ.</Paragraph>
      </div>
    );
  }

  // Display product details
  return (
    <div className="product-detail-page">
      <div className="product-detail-page__container">
        <Title level={2}>{product.Product_Name}</Title>

        <div className="product-detail-page__main-info">
          <div className="product-detail-page__image">
            <Image src={product.Main_Image} alt={product.Product_Name} />
            {/* Add gallery of List_Image if available */}
          </div>
          <div className="product-detail-page__details">
            <Paragraph strong>Giá: {formatCurrency(product.Price)}</Paragraph>
            <Paragraph>Tồn kho: {product.Stock}</Paragraph>
            <Paragraph>Trạng thái: {product.Status === 'available' ? 'Còn hàng' : 'Hết hàng'}</Paragraph>

            <Title level={4}>Mô tả:</Title>
            <Paragraph>{product.Description || 'Đang cập nhật...'}</Paragraph>

            <Space size="middle" style={{ marginTop: '20px' }}>
              {/* Add to Cart button */}
              <Button
                type="primary"
                size="large"
                disabled={product.Status === 'unavailable' || addingToCart}
                onClick={handleAddToCart}
                loading={addingToCart}
              >
                Thêm vào giỏ hàng
              </Button>
              {/* Test Drive button */}
              <Button size="large" onClick={() => { /* TODO: Navigate to test drive form */ }}>
                Đặt lịch lái thử
              </Button>
            </Space>
          </div>
        </div>

        {product.Specifications && Object.keys(product.Specifications).length > 0 && (
          <div className="product-detail-page__specifications" style={{ marginTop: '40px' }}>
            <Title level={4}>Thông số kỹ thuật:</Title>
            <Descriptions bordered column={{ xs: 1, sm: 2, md: 3 }}>
              {Object.entries(product.Specifications).map(([key, value]) => (
                <Descriptions.Item key={key} label={key}>{String(value)}</Descriptions.Item>
              ))}
            </Descriptions>
          </div>
        )}

        {/* Add other sections like related products, reviews, etc. */}

      </div>
    </div>
  );
};

export default ProductDetailPage; 