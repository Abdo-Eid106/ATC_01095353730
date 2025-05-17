import { Avatar, Button, Flex, Layout, Space, theme } from "antd";
import { MdLogout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { IoHomeOutline } from "react-icons/io5";

export const Header = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = useCallback(() => {
    localStorage.clear();
    queryClient.clear();

    navigate("/auth/login", { replace: true });
  }, [navigate]);

  return (
    <Layout.Header>
      <Flex justify="space-between" align="center">
        <Link to="/user/home">
          <IoHomeOutline size={20} color={colorPrimary} />
        </Link>
        <Space>
          <Avatar size={64} icon={<FaUserCircle />} />
          <Button
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            <MdLogout />
          </Button>
        </Space>
      </Flex>
    </Layout.Header>
  );
};
