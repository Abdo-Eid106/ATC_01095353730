import { useState } from "react";
import { useDebounce } from "../../common/hooks/useDebounce";
import { EventCard } from "../components/EventCard";
import { Row, Col, Input, Flex, Spin, Pagination } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useFetchUserEvents } from "../../common/hooks/useEvents";
const { Search } = Input;

export const Home = () => {
  const { search, setSearch, debouncedSearch } = useDebounce({ time: 1000 });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);

  const { data: result, isLoading } = useFetchUserEvents({
    search: debouncedSearch,
    page,
    limit,
  });

  return (
    <Flex vertical gap={20}>
      <Search
        placeholder="input search text"
        value={search}
        onChange={(e) => {
          e.preventDefault();
          setSearch(e.target.value);
        }}
        style={{ width: 300 }}
      />

      <Row gutter={[16, 24]}>
        {isLoading ? (
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />}
          />
        ) : (
          result?.data.map((event) => (
            <Col xs={24} md={12} xl={8}>
              <EventCard event={event} />
            </Col>
          ))
        )}
      </Row>
      <Pagination
        showSizeChanger
        pageSize={limit}
        current={page}
        onChange={(page, pageSize) => {
          setPage(page);
          setLimit(pageSize);
        }}
        total={result?.meta.total ?? 0}
        style={{ textAlign: "end", display: "block" }}
      />
    </Flex>
  );
};
