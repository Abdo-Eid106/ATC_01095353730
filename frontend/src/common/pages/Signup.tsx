import React, { useCallback } from "react";
import { Button, Form, Input, Card, Flex } from "antd";
import { Link, useNavigate } from "react-router-dom";
import type { SignupInput } from "../types";
import { useSignup } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { SuccessEnum } from "../enums/success.enum";

export const Signup: React.FC = () => {
  const { mutate: signup, isPending } = useSignup();
  const navigate = useNavigate();

  const onSuccess = useCallback(() => {
    toast.success(SuccessEnum.SIGNUP_SUCCESS);
    navigate("/auth/login");
  }, [navigate]);

  const onError = useCallback((error: any) => toast.error(error.message), []);

  const onFinish = useCallback(
    (value: SignupInput) => signup(value, { onSuccess, onError }),
    [onSuccess, onError, signup]
  );

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Card style={{ maxWidth: 500, minWidth: 300 }} title="Signup">
        <Form name="basic" style={{ width: "100%" }} onFinish={onFinish}>
          <Form.Item<SignupInput>
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Enter you name" />
          </Form.Item>

          <Form.Item<SignupInput>
            name="email"
            rules={[{ required: true, message: "Please input your email" }]}
          >
            <Input placeholder="Enter you Email" />
          </Form.Item>

          <Form.Item<SignupInput>
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input.Password placeholder="password" />
          </Form.Item>
          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              loading={isPending}
            >
              Signup
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            already have account? <Link to="/auth/login">Log in</Link>
          </div>
        </Form>
      </Card>
    </Flex>
  );
};
