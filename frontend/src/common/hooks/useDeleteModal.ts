import { useState } from "react";
import { type BaseEntity } from "../types";

export const useDeleteModal = <T extends BaseEntity>() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<null | T>(null);

  const showModal = (entity: T) => {
    setIsModalOpen(true);
    setSelected(entity);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelected(null);
  };

  return {
    isModalOpen,
    showModal,
    selected,
    handleClose,
  };
};
