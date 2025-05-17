import { Button, Card, theme, Typography } from "antd";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import type { EventDto } from "../../common/types";
import { Link } from "react-router-dom";
const { Meta } = Card;

type Props = {
  event: EventDto;
};

export const EventCard: React.FC<Props> = ({ event }) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <Card
      cover={<img alt="image" src={event.image} />}
      actions={[
        event.booked ? (
          <Typography.Title level={5} style={{ color: colorPrimary }}>
            Already Booked
          </Typography.Title>
        ) : (
          <Link to={`/user/events/${event.id}`}>
            <Button type="primary">Book Now</Button>
          </Link>
        ),
      ]}
    >
      <Meta
        title={event.name}
        description={
          <span>
            <FaRegMoneyBill1
              style={{ fontSize: 20, verticalAlign: "middle" }}
            />{" "}
            {event.price}
          </span>
        }
      />
    </Card>
  );
};
