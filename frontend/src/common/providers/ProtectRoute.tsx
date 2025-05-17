import React from "react";
import { Navigate } from "react-router-dom";
import type { RoleEnum } from "../enums/role.enum";
import { useFetchMe } from "../hooks/useAuth";
import { Loading } from "../pages/Loading";
import { toast } from "react-toastify";
import { ErrorEnum } from "../enums/error.enum";

type Props = {
  children: React.ReactNode;
  allowedRoles?: RoleEnum[];
};

export const ProtectRoute: React.FC<Props> = ({ children, allowedRoles }) => {
  const { data: user, isLoading, isError, error } = useFetchMe();

  if (isLoading) return <Loading />;

  if (isError) {
    toast.error(error.message);
    return <Navigate to="/auth/login" replace />;
  }

  if (!user) {
    toast.error(ErrorEnum.UNAUTHENTICATED);
    return <Navigate to="/auth/login" replace />;
  }

  if (!allowedRoles) return children;

  if (!allowedRoles.some((role) => role == user.role.name)) {
    toast.error(ErrorEnum.DO_NOT_HAVE_PERMISSIONS);
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};
