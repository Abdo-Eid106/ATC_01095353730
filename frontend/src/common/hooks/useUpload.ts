import { useMutation } from "@tanstack/react-query";
import { Api } from "../api";

export const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append("image", image);

  const { data } = await Api.post<string>("/upload/image", formData);
  return data;
};

export const useUploadImage = () => {
  return useMutation({ mutationFn: uploadImage });
};
