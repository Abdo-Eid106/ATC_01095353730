import { Modal } from "antd";
import type { AddModal } from "../../common/types";
import { useBooking } from "../../common/hooks/useBooking";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
import { SuccessEnum } from "../../common/enums/success.enum";

export const BookingModal = (modalState: AddModal) => {
  const { id } = useParams();
  const { mutate: bookEvent, isPending } = useBooking();
  const navigate = useNavigate();

  const onSuccess = useCallback(() => {
    toast.success(SuccessEnum.BOOKING_SUCCESS);
    navigate("/user/success", { replace: true });
  }, [navigate]);

  const onError = useCallback((error: any) => toast.error(error.message), []);

  const handleBooking = useCallback(() => {
    bookEvent(parseInt(id!), { onSuccess, onError });
  }, [bookEvent, modalState, onSuccess, onError]);

  return (
    <>
      <Modal
        title="Booking"
        closable={{ "aria-label": "Custom Close Button" }}
        open={modalState.isModalOpen}
        onOk={handleBooking}
        onCancel={modalState.handleClose}
        loading={isPending}
        okText="Yes"
      >
        <p>Are you sure you want to book this Event</p>
      </Modal>
    </>
  );
};
