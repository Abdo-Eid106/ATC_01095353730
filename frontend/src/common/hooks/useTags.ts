import { Api } from "../api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { GetTagsInput, TagDto } from "../types";
import { QueryKeys } from "../enums/QueryKeys";
import type { CreateTagInput } from "../types/tag/create-tag.input";
import type { PaginatedOutput } from "../types/common/paginated-output";
import { useDebounce } from "./useDebounce";
import { useMemo } from "react";

const fetchTags = async (getTagsInput: GetTagsInput) => {
  const { data } = await Api.get<PaginatedOutput<TagDto>>("/tags", {
    params: getTagsInput,
  });
  return data;
};

const addTag = async (createTagInput: CreateTagInput) =>
  Api.post("/tags", createTagInput);

const deleteTag = async (id: TagDto["id"]) => Api.delete(`/tags/${id}`);

export const useFetchTags = (getTagsInput: GetTagsInput) =>
  useQuery({
    queryKey: [QueryKeys.TAGS, getTagsInput],
    queryFn: () => fetchTags(getTagsInput),
  });

export const useAddTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTag,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TAGS] }),
  });
};

export const useDeleteTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: TagDto["id"]) => deleteTag(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TAGS] }),
  });
};

export const useTagOptions = () => {
  const { search, setSearch, debouncedSearch } = useDebounce({ time: 500 });
  const { data: result, isLoading } = useFetchTags({ search: debouncedSearch });

  const options = useMemo(
    () =>
      (result?.data ?? []).map((tag) => ({ label: tag.name, value: tag.id })),
    [result]
  );

  return { options, isLoading, search, setSearch, debouncedSearch };
};
