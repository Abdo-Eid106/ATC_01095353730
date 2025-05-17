import { useEffect, useState } from "react";

type Props = {
  time: number;
};

export const useDebounce = (props: Props) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, props.time);

    return () => clearTimeout(timer);
  }, [search, props.time]);

  return { search, setSearch, debouncedSearch };
};
