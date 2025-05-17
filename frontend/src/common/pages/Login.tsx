import React, { useCallback } from "react";
import { Button, Form, Input, Card, Flex } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";
import type { LoginInput, LoginOutput } from "../types";
import { RoleEnum } from "../enums/role.enum";
import { LocalStorageKeys } from "../enums/local-storage-keys.enum";
import { toast } from "react-toastify";

export const Login: React.FC = () => {
  const { mutate: login, isPending } = useLogin();
  const navigate = useNavigate();

  const onSuccess = useCallback(
    (loginOutput: LoginOutput) => {
      localStorage.setItem(LocalStorageKeys.TOKEN, loginOutput.token);

      loginOutput.user.role.name == RoleEnum.ADMIN
        ? navigate("/admin/events")
        : navigate("/user/home");
    },
    [navigate]
  );

  const onError = useCallback((error: any) => toast.error(error.message), []);

  const onFinish = useCallback(
    (value: LoginInput) => login(value, { onSuccess, onError }),
    [onSuccess, onError, login]
  );

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Card style={{ maxWidth: 500, minWidth: 300 }} title="Login">
        <Form name="basic" onFinish={onFinish} autoComplete="off">
          <Form.Item<LoginInput>
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<LoginInput>
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              loading={isPending}
            >
              Login
            </Button>
          </Form.Item>
          <div style={{ textAlign: "center" }}>
            doesn't have account? <Link to="/auth/signup">sign up</Link>
          </div>
        </Form>
      </Card>
    </Flex>
  );
};
