import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../api/config';
import { Product } from '../api/types'; // Import Product type
import { Typography, Spin, Image as AntdImage, Descriptions, Space, Button, notification, Card, message } from 'antd';
import { formatCurrency } from '../utils/format';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const { Title, Paragraph } = Typography;

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  const handleRegisterConsultation = () => {
    navigate('/dich-vu'); // Navigate to the services page
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

  const allImages = product.List_Image ? [product.Main_Image, ...product.List_Image] : [product.Main_Image];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="relative">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <AntdImage
                src={allImages[currentImageIndex]}
                alt={product.Product_Name}
                className="w-full h-full object-cover"
                preview={true}
              />
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 z-10"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 z-10"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 ${currentImageIndex === index ? 'border-primary-600' : 'border-transparent'}`}
                  >
                    <img
                      src={image}
                      alt={`${product.Product_Name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <Title level={2} className="!mt-0 mb-2">{product.Product_Name}</Title>
            <Typography.Text strong className="text-2xl text-primary-600 mb-4">{formatCurrency(product.Price)}</Typography.Text>

            {/* Added vertical spacing between sections */}
            <div className="mt-8">
              <Title level={4} className="mb-2">Mô tả</Title>
              <Paragraph>{product.Description || 'Đang cập nhật...'}</Paragraph>
            </div>

            <div className="mt-8">
              <Title level={4} className="mb-2">Thông số kỹ thuật</Title>
              {product.Specifications && Object.keys(product.Specifications).length > 0 ? (
                 <Descriptions bordered size="small" column={{
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 3,
                    xl: 4,
                    xxl: 4,
                  }}>
                   {Object.entries(product.Specifications).map(([key, value]) => (
                     <Descriptions.Item key={key} label={key}>{String(value)}</Descriptions.Item>
                   ))}
                 </Descriptions>
              ) : (
                <Paragraph>Đang cập nhật...</Paragraph>
              )}
            </div>

            <div className="mt-8">
              {/* Đăng ký tư vấn button */}
              <Button
                type="primary"
                size="large"
                onClick={handleRegisterConsultation}
                block // Make button full width
              >
                Đăng ký tư vấn
              </Button>
              {product.Stock !== undefined && ( // Display stock if available
                 <Typography.Text type="secondary" className="mt-2 block text-right">Còn {product.Stock} sản phẩm</Typography.Text>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetailPage; 