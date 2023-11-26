import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Logo from "../../public/images/logo.png";
import { useRouter } from "next/router";

import {
  BarChartOutlined,
  MedicineBoxOutlined,
  ApartmentOutlined,
  TeamOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

import { Layout, Menu } from "antd";
import Cookies from "js-cookie";

const { Sider, Content } = Layout;

const HeaderCom = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const router = useRouter();

  function getItem(label, key, icon, href, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
      href,
    };
  }

  const items = [
    getItem("Dashboard", "1", <BarChartOutlined />, "/dashboard"),
    getItem("Doctors", "2", <MedicineBoxOutlined />, "/doctors"),
    getItem("Users", "3", <TeamOutlined />, "/clients"),
    getItem("Clinics", "4", <ApartmentOutlined />, "/clinics"),
    getItem("Settings", "sub1", <SettingOutlined />, "/settings", [
      getItem("Add Admin", "5", null, "/administration"),
      getItem("Account Settings", "6", null, "/settings"),
    ]),
  ];

  return (
    <>
      <Layout>
        <Sider
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
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
          <Menu
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
          >
            {items.map((item) =>
              item.children ? (
                // Render a sub-menu if the item has children
                <Menu.SubMenu
                  key={item.key}
                  icon={item.icon}
                  title={item.label}
                >
                  {item.children.map((subItem) => (
                    <Menu.Item key={subItem.key}>
                      <Link className="nav-link" href={subItem.href}>{subItem.label}</Link>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ) : (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link className="nav-link" href={item.href}>{item.label}</Link>
                </Menu.Item>
              )
            )}
          </Menu>

          <div
            onClick={() => {
              Cookies.remove("id");
              Cookies.remove("token");
              Cookies.remove("user");
              router.push("/");
            }}
            className="logout mt-5"
          >
            <HiOutlineArrowRightOnRectangle size={collapsed ? 25 : 28} />
            {!collapsed && <span className="mx-2">Logout</span>}
          </div>
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
