import { Modal } from "antd";
import type { DeleteModal, TagDto } from "../../common/types";
import { useDeleteTag } from "../../common/hooks/useTags";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { SuccessEnum } from "../../common/enums/success.enum";

export const DeleteTagModal = (modalState: DeleteModal<TagDto>) => {
  const { mutate: deleteTag, isPending } = useDeleteTag();

  const onSuccess = useCallback(() => {
    toast.success(SuccessEnum.TAG_DELETION_SUCCESS);
    modalState.handleClose();
  }, [modalState]);

  const onError = useCallback((error: Error) => toast.error(error.message), []);

  const handleSubmit = useCallback(() => {
    deleteTag(modalState.selected!.id, { onSuccess, onError });
  }, [deleteTag, modalState, onSuccess, onError]);

  return (
    <Modal
      title="Delete Tag"
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
