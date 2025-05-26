import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { RootState } from '../../store';
import { productService } from '../../api/services/product';
import { formatCurrency } from '../../utils/format';
import { toast } from 'react-toastify';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Product, CartItem } from '../../api/types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const productData = await productService.getProductById(id);
          setProduct(productData);
        }
      } catch (err) {
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!product) return <p>Không tìm thấy sản phẩm.</p>;

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

  const handleAddToCart = () => {
    if (product) {
      const existingItem = cartItems.find(item => item.ProductID === product._id);
      if (existingItem) {
        dispatch(addToCart({ ...existingItem, Quantity: existingItem.Quantity + quantity }));
      } else {
        const newItem: CartItem = {
          _id: '',
          CartID: '',
          ProductID: product._id,
          Quantity: quantity,
          Price: product.Price,
          Product: product,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        dispatch(addToCart(newItem));
      }
      toast.success(`${quantity} x ${product.Product_Name} đã thêm vào giỏ hàng`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="relative">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img
              src={allImages[currentImageIndex]}
              alt={product.Product_Name}
              className="w-full h-full object-cover"
            />
            {allImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
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
                  className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 ${
                    currentImageIndex === index
                      ? 'ring-2 ring-primary-600'
                      : ''
                  }`}
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {product.Product_Name}
          </h1>
          <p className="text-2xl font-bold text-primary-600 mt-4">
            {formatCurrency(product.Price)}
          </p>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">Mô tả</h2>
            <p className="mt-2 text-gray-600">{product.Description}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Thông số kỹ thuật
            </h2>
            <div className="mt-2 grid grid-cols-2 gap-4">
              {Object.entries(product.Specifications).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <span className="text-sm text-gray-500">{key}</span>
                  <span className="text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-2 text-gray-600 hover:text-primary-600"
                >
                  -
                </button>
                <span className="px-3 py-2">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.min(product.Stock, prev + 1)
                    )
                  }
                  className="px-3 py-2 text-gray-600 hover:text-primary-600"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.Status === 'unavailable'}
                className={`flex-1 bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors ${
                  product.Status === 'unavailable'
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                {product.Status === 'unavailable'
                  ? 'Hết hàng'
                  : 'Thêm vào giỏ hàng'}
              </button>
            </div>
            {product.Stock > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                Còn {product.Stock} sản phẩm
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 