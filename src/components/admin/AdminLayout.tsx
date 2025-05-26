import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Space } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { DownOutlined, UserOutlined, DashboardOutlined, ShoppingCartOutlined, TeamOutlined, TagsOutlined, CarryOutOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import styles from './AdminLayout.module.css'; // Import CSS module

const { Header, Content, Sider } = Layout;

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenu = (
    <Menu onClick={({ key }) => key === 'logout' && handleLogout()}>
      <Menu.Item key="profile" icon={<UserOutlined />}>Profile</Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>Đăng xuất</Menu.Item>
    </Menu>
  );

  // Determine selected menu key based on current path
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.startsWith('/admin/products')) return 'products';
    if (path.startsWith('/admin/orders')) return 'orders';
    if (path.startsWith('/admin/users')) return 'users';
    if (path.startsWith('/admin/categories')) return 'categories';
    if (path.startsWith('/admin/services')) return 'services';
    if (path.startsWith('/admin/test-drive-bookings')) return 'test-drive-bookings';
    return 'dashboard'; // Default to dashboard
  };

  return (
    <Layout className={styles.adminLayout}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} className={styles.adminSidebar}>
        <div className={styles.adminLogo}></div> {/* Replace with your logo */}
        <Menu theme="dark" mode="inline" selectedKeys={[getSelectedKey()]}>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <Link to="/admin">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="products" icon={<ShoppingCartOutlined />}>
            <Link to="/admin/products">Sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="orders" icon={<CarryOutOutlined />}>
            <Link to="/admin/orders">Đơn hàng</Link>
          </Menu.Item>
           <Menu.Item key="categories" icon={<TagsOutlined />}>
            <Link to="/admin/categories">Danh mục</Link>
          </Menu.Item>
          <Menu.Item key="services" icon={<DashboardOutlined />}>
            <Link to="/admin/services">Dịch vụ</Link>
          </Menu.Item>
          <Menu.Item key="test-drive-bookings" icon={<CarryOutOutlined />}>
            <Link to="/admin/test-drive-bookings">Đăng ký lái thử</Link>
          </Menu.Item>
          <Menu.Item key="users" icon={<TeamOutlined />}>
            <Link to="/admin/users">Người dùng</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className={styles.adminContentLayout}>
        <Header className={styles.adminHeader}>
          <div className={styles.headerTitle}>Admin Dashboard</div>
          <div className={styles.headerUser}>
             {user && (
              <Dropdown overlay={userMenu} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()} className={styles.userDropdownLink}>
                  <Space>
                    <UserOutlined />
                    {user.Username} <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            )}
          </div>
        </Header>
        <Content className={styles.adminContent}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout; 