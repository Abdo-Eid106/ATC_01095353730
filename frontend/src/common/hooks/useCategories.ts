import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  CategoryDto,
  GetCategoriesInput,
  PaginatedOutput,
  CreateCategoryInput,
} from "../types";
import { Api } from "../api";
import { QueryKeys } from "../enums/QueryKeys";
import { useDebounce } from "./useDebounce";
import { useMemo } from "react";

const fetchCategories = async (getCategoriesInput: GetCategoriesInput) => {
  const { data } = await Api.get<PaginatedOutput<CategoryDto>>(`/categories`, {
    params: getCategoriesInput,
  });

  return data;
};

const addCategory = async (createCategoryInput: CreateCategoryInput) =>
  Api.post("/categories", createCategoryInput);

const deleteCategory = async (id: CategoryDto["id"]) =>
  Api.delete(`/categories/${id}`);

export const useFetchCategories = (getCategoriesInput: GetCategoriesInput) =>
  useQuery({
    queryKey: [QueryKeys.CATEGORIES, getCategoriesInput],
    queryFn: () => fetchCategories(getCategoriesInput),
  });

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CATEGORIES] });
    },
  });
};

export const useDeleteCategeory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CATEGORIES] });
    },
  });
};

export const useCategoryOptions = () => {
  const { search, setSearch, debouncedSearch } = useDebounce({ time: 500 });
  const { data: result, isLoading } = useFetchCategories({
    search: debouncedSearch,
  });

  const options = useMemo(
    () =>
      (result?.data ?? []).map((category) => ({
        label: category.name,
        value: category.id,
      })),
    [result]
  );

  return { options, isLoading, search, setSearch, debouncedSearch };
};
