import { useState } from "react";
import { type AddModal } from "../types";

export const useAddModal = (): AddModal => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return { isModalOpen, showModal, handleOk, handleClose };
};
