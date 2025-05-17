import { Button, Flex, Image, Space, Spin, Tag, theme, Typography } from "antd";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { BookingModal } from "../components/BookingModal";
import { useAddModal } from "../../common/hooks";
import { useParams } from "react-router-dom";
import { useFetchEvent } from "../../common/hooks/useEvents";
import { LoadingOutlined } from "@ant-design/icons";

export const Event = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const { id } = useParams();
  const { data: event, isLoading } = useFetchEvent(id!);
  const bookingModal = useAddModal();

  return isLoading || !event ? (
    <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />
  ) : (
    <Flex>
      <Image alt="avatar" src={event?.image} />
      <Flex style={{ padding: 32 }} vertical gap={20}>
        <Typography.Title level={2}>{event.name}</Typography.Title>
        <Space size="large">
          <span>
            <IoLocationOutline
              style={{ fontSize: 20, verticalAlign: "middle" }}
            />{" "}
            {event.venue}
          </span>
          <span>
            <MdOutlineCalendarMonth
              style={{ fontSize: 20, verticalAlign: "middle" }}
            />{" "}
            {new Date(event!.date).toDateString()}
          </span>
          <span>
            <FaRegMoneyBill1
              style={{ fontSize: 20, verticalAlign: "middle" }}
            />{" "}
            {event.price}
          </span>
          <span>
            <BiCategory style={{ fontSize: 20, verticalAlign: "middle" }} />{" "}
            {event.category.name}
          </span>
        </Space>
        <div>{event.description}</div>
        <Flex>
          {event.tags.map((tag) => (
            <Tag>{tag.name}</Tag>
          ))}
        </Flex>
        {event.booked ? (
          <Typography.Title
            level={4}
            style={{ color: colorPrimary, textAlign: "center" }}
          >
            Already Booked
          </Typography.Title>
        ) : (
          <Button
            type="primary"
            onClick={(e) => {
              e.preventDefault();
              bookingModal.showModal();
            }}
          >
            Book Now
          </Button>
        )}
      </Flex>
      <BookingModal {...bookingModal} />
    </Flex>
  );
};
