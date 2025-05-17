import { useState } from "react";
import { Space, Table, Tag, Input, Button, Flex } from "antd";
import type { TableProps } from "antd";
import type { EventDto } from "../../common/types";
import { useDebounce } from "../../common/hooks/useDebounce";
import { useAddModal, useDeleteModal } from "../../common/hooks";
import { AddEventModal } from "../components/AddEventModal";
import { DeleteEventModal } from "../components/DeleteEventModal";
import { UpdateEventModal } from "../components/UpdateEventModal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useFetchAdminEvents } from "../../common/hooks/useEvents";
import dayjs from "dayjs";
const { Search } = Input;

const columns: TableProps<EventDto>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (_, { date }) => dayjs(date).format("DD MMMM YYYY"),
  },
  {
    title: "Venue",
    dataIndex: "venue",
    key: "venue",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (_, { category }) => category.name,
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => (
          <Tag key={tag.id}>{tag.name.toUpperCase()}</Tag>
        ))}
      </>
    ),
  },
];

export const Events = () => {
  const { search, setSearch, debouncedSearch } = useDebounce({ time: 1000 });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: result, isLoading } = useFetchAdminEvents({
    search: debouncedSearch,
    page,
    limit,
  });

  const addModal = useAddModal();
  const deleteModal = useDeleteModal<EventDto>();
  const updateModal = useDeleteModal<EventDto>();

  const tableColumns: TableProps<EventDto>["columns"] = [
    ...columns,
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <DeleteOutlined
            onClick={(e) => {
              e.preventDefault();
              deleteModal.showModal(record);
            }}
          />
          <EditOutlined
            onClick={(e) => {
              e.preventDefault();
              updateModal.showModal(record);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <Flex vertical gap={20}>
      <Search
        placeholder="input search text"
        style={{ width: 200 }}
        value={search}
        onChange={(e) => {
          e.preventDefault(), setSearch(e.target.value);
        }}
      />
      <Table<EventDto>
        rowKey="id"
        columns={tableColumns}
        dataSource={result?.data}
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: limit,
          total: result?.meta.total,
          onChange: (page, pageSize) => {
            setPage(page), setLimit(pageSize);
          },
          showSizeChanger: true,
        }}
      />
      <Button
        type="primary"
        onClick={(e) => {
          e.preventDefault();
          addModal.showModal();
        }}
      >
        Add New Event
      </Button>
      <AddEventModal {...addModal} />
      <DeleteEventModal {...deleteModal} />
      <UpdateEventModal {...updateModal} />
    </Flex>
  );
};
