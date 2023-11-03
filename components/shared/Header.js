import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Logo from "../../public/images/logo.png";

import {
  BarChartOutlined,
  MedicineBoxOutlined,
  ApartmentOutlined,
  TeamOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import { Layout, Menu } from "antd";

const { Sider, Content } = Layout;

const HeaderCom = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const navLinks = [
    {
      key: "1",
      href: "/dashboard",
      label: "Dashboard",
      icon: <BarChartOutlined />,
    },
    {
      key: "2",
      href: "/doctors",
      label: "Doctors",
      icon: <MedicineBoxOutlined />,
    },
    { key: "3", href: "/clients", label: "Clients", icon: <TeamOutlined /> },
    {
      key: "4",
      href: "/clinics",
      label: "Clinics",
      icon: <ApartmentOutlined />,
    },
    // {
    //   key: "5",
    //   href: "/support",
    //   label: "Customer Support",
    //   icon: <CustomerServiceOutlined />,
    // },
  ];
  return (
    <>
      <Layout>
        <Sider
          style={{ minHeight: "100vh" }}
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          {!collapsed && (
            <div className="text-center mt-4 mb-3">
              <Image src={Logo} height={60} width={60} />
              <hr style={{ color: "silver" }} />
            </div>
          )}
          {collapsed && (
            <div className="text-center mt-4 mb-3">
              <Image src={Logo} height={30} width={30} />
              <hr style={{ color: "silver" }} />
            </div>
          )}
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            {navLinks.map((link, i) => (
              <div key={i} className="m-2">
                <Menu.Item icon={link.icon}>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </Menu.Item>
              </div>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ backgroundColor: "white", minHeight: "100vh" }}>
            {collapsed && (
              <span className="menu-toggler">
                <AiOutlineRight onClick={() => setCollapsed(!collapsed)} />
              </span>
            )}
            {!collapsed && (
              <span className="menu-toggler">
                <AiOutlineLeft onClick={() => setCollapsed(!collapsed)} />
              </span>
            )}
            <React.Fragment>{children}</React.Fragment>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default HeaderCom;
