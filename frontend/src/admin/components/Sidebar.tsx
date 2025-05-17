import { Menu, Layout } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { TbCategory } from "react-icons/tb";
import { IoPricetagsOutline } from "react-icons/io5";
import { BiCalendarEvent } from "react-icons/bi";
import { useCallback } from "react";
import { MdLogout } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";

const { Sider } = Layout;

const items = [
  {
    key: "2",
    label: <Link to="/admin/events">Events</Link>,
    icon: <BiCalendarEvent />,
  },
  {
    key: "3",
    label: <Link to="/admin/categories">Categories</Link>,
    icon: <TbCategory />,
  },
  {
    key: "4",
    label: <Link to="/admin/tags">Tags</Link>,
    icon: <IoPricetagsOutline />,
  },
];

type Props = {
  collapsed: boolean;
};

export const Sidebar = ({ collapsed }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = useCallback(() => {
    localStorage.clear();
    queryClient.clear();

    navigate("/auth/login", { replace: true });
  }, [navigate]);

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          ...items,
          {
            key: "5",
            label: "logout",
            icon: <MdLogout />,
            onClick: logout,
          },
        ]}
      />
    </Sider>
  );
};
