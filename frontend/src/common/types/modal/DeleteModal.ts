import { type BaseEntity } from "../common/BaseEntity";

export type DeleteModal<T extends BaseEntity> = {
  isModalOpen: boolean;
  showModal: (entity: T) => void;
  handleClose: () => void;
  selected: T | null;
};
