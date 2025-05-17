import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

export const Loading: React.FC = () => {
  return (
    <Flex
      align="center"
      justify="center"
      gap="middle"
      style={{ width: "100vw", height: "100vh", backgroundColor: "white" }}
    >
      <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />
    </Flex>
  );
};
