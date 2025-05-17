import { Api } from "../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LoginOutput, LoginInput, SignupInput, UserDto } from "../types";

const signup = (signupInput: SignupInput) => {
  return Api.post("/auth/signup", signupInput);
};

const login = async (loginInput: LoginInput) => {
  const { data } = await Api.post<LoginOutput>("/auth/login", loginInput);
  return data;
};

const fetchMe = async () => {
  const { data } = await Api.get<UserDto>("/auth/me");
  return data;
};

export const useLogin = () => useMutation({ mutationFn: login });
export const useSignup = () => useMutation({ mutationFn: signup });
export const useFetchMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    gcTime: 0,
  });

export const useLogout = () => {
  localStorage.clear();

  const queryClient = useQueryClient();
  queryClient.clear();
};
