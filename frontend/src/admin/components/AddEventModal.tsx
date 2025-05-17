import {
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Row,
  Col,
  Upload,
} from "antd";
import type { CreateEventInput, AddModal } from "../../common/types";
import { useAddEvent } from "../../common/hooks/useEvents";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useTagOptions } from "../../common/hooks/useTags";
import { useCategoryOptions } from "../../common/hooks/useCategories";
import { useUploadImage } from "../../common/hooks/useUpload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";
import { SuccessEnum } from "../../common/enums/success.enum";
const { TextArea } = Input;

export const AddEventModal = (modalState: AddModal) => {
  const [form] = Form.useForm<CreateEventInput>();
  const { mutate: addEvent, isPending } = useAddEvent();
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();
  const imageUrl = Form.useWatch("image", form);

  const tagOptions = useTagOptions();
  const categoryOptions = useCategoryOptions();

  const onUploadSuccess = useCallback(
    (imageUrl: string) => {
      form.setFieldValue("image", imageUrl);
    },
    [form]
  );

  const onSuccess = useCallback(() => {
    toast.success(SuccessEnum.EVENT_CREATION_SUCCESS);
    form.resetFields();
    modalState.handleClose();
  }, [modalState, form]);

  const onError = (error: Error) => {
    toast.success(error.message);
  };

  const beforeUpload = useCallback(
    async (file: File) => {
      uploadImage(file, { onSuccess: onUploadSuccess, onError });
    },
    [uploadImage, onUploadSuccess, onError]
  );

  const handleSubmit = useCallback(
    (createEventInput: CreateEventInput) => {
      addEvent(createEventInput, { onSuccess, onError });
    },
    [addEvent, onSuccess, onError]
  );

  return (
    <Modal
      title="Add Event"
      open={modalState.isModalOpen}
      onCancel={modalState.handleClose}
      okText="submit"
      footer={null}
      style={{ maxWidth: 1000 }}
    >
      <ToastContainer />
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        initialValues={{ tagIds: [] }}
      >
        <Form.Item<CreateEventInput>
          label="name"
          name="name"
          rules={[{ required: true, message: "Please input event name" }]}
        >
          <Input />
        </Form.Item>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item<CreateEventInput>
              label="date"
              name="date"
              rules={[{ required: true, message: "Please input event Date!" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<CreateEventInput>
              label="venue"
              name="venue"
              rules={[{ required: true, message: "Please input event venue!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={10}>
          <Col span={12}>
            <Form.Item<CreateEventInput>
              label="price"
              name="price"
              rules={[{ required: true, message: "Please input event price" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<CreateEventInput>
              label="category"
              name="categoryId"
              rules={[
                { required: true, message: "Please input event category" },
              ]}
            >
              <Select
                searchValue={categoryOptions.search}
                options={categoryOptions.options}
                onSearch={(value) => categoryOptions.setSearch(value)}
                loading={categoryOptions.isLoading}
                showSearch
                filterOption={false}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<CreateEventInput> label="tags" name="tagIds">
          <Select
            mode="multiple"
            placeholder="Please select"
            searchValue={tagOptions.search}
            onSearch={(value) => tagOptions.setSearch(value)}
            options={tagOptions.options}
            loading={tagOptions.isLoading}
            showSearch
            filterOption={false}
          />
        </Form.Item>

        <Form.Item<CreateEventInput> label="image" name="image" hidden>
          <Input />
        </Form.Item>

        <Form.Item<CreateEventInput>
          label="description"
          name="description"
          rules={[
            { required: true, message: "Please input event description" },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Upload
            listType="picture-card"
            showUploadList={false}
            beforeUpload={beforeUpload}
          >
            {!isUploading && imageUrl ? (
              <img src={imageUrl} style={{ width: "100%" }} />
            ) : (
              <button style={{ border: 0, background: "none" }} type="button">
                {isUploading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            )}
          </Upload>
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
