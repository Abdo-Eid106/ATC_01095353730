import { Input, Modal, Form, Button } from "antd";
import { type AddModal, type CreateCategoryInput } from "../../common/types";
import { useAddCategory } from "../../common/hooks/useCategories";
import { SuccessEnum } from "../../common/enums/success.enum";
import { toast } from "react-toastify";
import { useCallback } from "react";

export const AddCategoryModal = (modalState: AddModal) => {
  const [form] = Form.useForm<CreateCategoryInput>();
  const { mutate: addCategory, isPending } = useAddCategory();

  const onSuccess = useCallback(() => {
    toast.success(SuccessEnum.CATEGORY_CREATION_SUCCESS);
    form.resetFields();
    modalState.handleClose();
  }, [modalState, form]);

  const onError = useCallback((error: Error) => {
    toast.error(error.message);
  }, []);

  const handleSubmit = useCallback(
    (createCategoryInput: CreateCategoryInput) => {
      addCategory(createCategoryInput, { onSuccess, onError });
    },
    [addCategory, onSuccess, onError]
  );

  return (
    <Modal
      title="Add Category"
      open={modalState.isModalOpen}
      onCancel={modalState.handleClose}
      okText="submit"
      footer={null}
      style={{ maxWidth: 400 }}
    >
      <Form onFinish={handleSubmit} form={form}>
        <Form.Item<CreateCategoryInput>
          label="name"
          name="name"
          rules={[{ required: true, message: "Please input category name" }]}
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
