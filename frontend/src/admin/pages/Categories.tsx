import React, { useState } from "react";
import { List, Input, Button, Flex } from "antd";
import { useAddModal, useDebounce, useDeleteModal } from "../../common/hooks";
import { AddCategoryModal } from "../components/AddCategoryModal";
import { DeleteCategoryModal } from "../components/DeleteCategoryModal";
import { DeleteOutlined } from "@ant-design/icons";
import { useFetchCategories } from "../../common/hooks/useCategories";
import { type CategoryDto } from "../../common/types";
const { Search } = Input;

export const Categories: React.FC = () => {
  const { search, setSearch, debouncedSearch } = useDebounce({ time: 1000 });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: result, isPending } = useFetchCategories({
    page,
    limit,
    search: debouncedSearch,
  });

  const addModal = useAddModal();
  const deleteModal = useDeleteModal<CategoryDto>();

  return (
    <Flex vertical gap={20}>
      <Search
        placeholder="input search categories"
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
        loading={isPending}
        dataSource={result?.data}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta title={item.name} key={item.id} />
            <Button
              onClick={(e) => {
                e.preventDefault(), deleteModal.showModal(item);
              }}
            >
              <DeleteOutlined />
            </Button>
          </List.Item>
        )}
      />
      <Button type="primary" onClick={addModal.showModal}>
        Add New Category
      </Button>
      <AddCategoryModal {...addModal} />
      <DeleteCategoryModal {...deleteModal} />
    </Flex>
  );
};
