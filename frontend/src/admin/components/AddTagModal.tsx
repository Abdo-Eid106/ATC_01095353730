import { Input, Modal, Form, Button } from "antd";
import type { CreateTagInput } from "../../common/types/tag/create-tag.input";
import type { AddModal } from "../../common/types";
import { useCallback } from "react";
import { useAddTag } from "../../common/hooks/useTags";
import { toast } from "react-toastify";
import { SuccessEnum } from "../../common/enums/success.enum";

export const AddTagModal = (modalState: AddModal) => {
  const [form] = Form.useForm();
  const { mutate: addTag, isPending } = useAddTag();

  const onSuccess = useCallback(() => {
    toast.success(SuccessEnum.TAG_CREATION_SUCCESS);
    modalState.handleClose();
    form.resetFields();
  }, [modalState]);

  const onError = useCallback((error: Error) => {
    toast.error(error.message);
  }, []);

  const handleSubmit = useCallback(
    (values: CreateTagInput) => addTag(values, { onSuccess, onError }),
    [addTag, onSuccess, onError]
  );

  return (
    <Modal
      title="Add Tag"
      open={modalState.isModalOpen}
      onCancel={modalState.handleClose}
      okText="submit"
      footer={null}
      style={{ maxWidth: 400 }}
    >
      <Form onFinish={handleSubmit} form={form}>
        <Form.Item<CreateTagInput>
          label="name"
          name="name"
          rules={[{ required: true, message: "Please input tag name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
