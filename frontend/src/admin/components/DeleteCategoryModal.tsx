import { Modal } from "antd";
import type { DeleteModal, CategoryDto } from "../../common/types";
import { useDeleteCategeory } from "../../common/hooks/useCategories";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { SuccessEnum } from "../../common/enums/success.enum";

export const DeleteCategoryModal = (modalState: DeleteModal<CategoryDto>) => {
  const { mutate: deleteCategory, isPending } = useDeleteCategeory();

  const onSuccess = useCallback(() => {
    toast.success(SuccessEnum.CATEGORY_DELETION_SUCCESS);
    modalState.handleClose();
  }, [modalState]);

  const onError = useCallback((error: Error) => toast.error(error.message), []);

  const handleSubmit = useCallback(() => {
    deleteCategory(modalState.selected!.id, { onSuccess, onError });
  }, [deleteCategory, modalState, onSuccess, onError]);

  return (
    <Modal
      title="Delete Category"
      open={modalState.isModalOpen}
      onCancel={modalState.handleClose}
      onOk={handleSubmit}
      okText="submit"
      loading={isPending}
    >
      are you sure you want to delete **{modalState.selected?.name}**
    </Modal>
  );
};
