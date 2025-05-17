import { Button, Result } from "antd";
import { Link } from "react-router-dom";

export const SuccessPage = () => (
  <Result
    status="success"
    title="Event is Booked Successfully"
    subTitle=""
    extra={[
      <Link to="/user/home">
        <Button type="primary" key="console">
          Go Home
        </Button>
      </Link>,
    ]}
  />
);
