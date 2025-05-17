import { Modal } from "antd";
import type { DeleteModal, EventDto } from "../../common/types";
import { useDeleteEvent } from "../../common/hooks/useEvents";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { SuccessEnum } from "../../common/enums/success.enum";

export const DeleteEventModal = (modalState: DeleteModal<EventDto>) => {
  const { mutate: deleteEvent, isPending } = useDeleteEvent();

  const onSuccess = useCallback(() => {
    toast.success(SuccessEnum.EVENT_DELETION_SUCCESS);
    modalState.handleClose();
  }, [modalState]);

  const onError = useCallback((error: Error) => {
    toast.error(error.message);
  }, []);

  const handleSubmit = useCallback(() => {
    deleteEvent(modalState.selected!.id, { onSuccess, onError });
  }, [onSuccess, onError, deleteEvent, modalState]);

  return (
    <Modal
      title="Delete Event"
      open={modalState.isModalOpen}
      onCancel={modalState.handleClose}
      okText="submit"
      loading={isPending}
      onOk={handleSubmit}
    >
      are you sure you want to delete **{modalState.selected?.name}**
    </Modal>
  );
};
