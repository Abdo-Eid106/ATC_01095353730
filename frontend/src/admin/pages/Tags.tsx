import React, { useState } from "react";
import { List, Input, Button, Flex } from "antd";
import { AddTagModal } from "../components/AddTagModal";
import { useAddModal, useDebounce, useDeleteModal } from "../../common/hooks";
import { DeleteOutlined } from "@ant-design/icons";
import { useFetchTags } from "../../common/hooks/useTags";
import type { TagDto } from "../../common/types";
import { DeleteTagModal } from "../components/DeleteTagModal";
const { Search } = Input;

export const Tags: React.FC = () => {
  const { search, setSearch, debouncedSearch } = useDebounce({ time: 1000 });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: result, isLoading } = useFetchTags({
    search: debouncedSearch,
    page,
    limit,
  });

  const addModal = useAddModal();
  const deleteModal = useDeleteModal<TagDto>();

  return (
    <Flex vertical gap={20}>
      <Search
        placeholder="input search text"
        value={search}
        onChange={(e) => {
          e.preventDefault();
          setSearch(e.target.value);
        }}
        style={{ maxWidth: 200 }}
      />
      <List
        pagination={{
          position: "bottom",
          align: "end",
          showSizeChanger: true,
          pageSize: limit,
          current: page,
          total: result?.meta.total,
          onChange: (page, pageSize) => {
            setPage(page);
            setLimit(pageSize);
          },
        }}
        loading={isLoading}
        dataSource={result?.data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={<p>{item.name}</p>} />
            <Button
              onClick={(e) => {
                e.preventDefault();
                deleteModal.showModal(item);
              }}
            >
              <DeleteOutlined />
            </Button>
          </List.Item>
        )}
      />
      <Button
        type="primary"
        onClick={(e) => {
          e.preventDefault(), addModal.showModal();
        }}
      >
        Add New Tag
      </Button>
      <AddTagModal {...addModal} />
      <DeleteTagModal {...deleteModal} />
    </Flex>
  );
};
