import type { EventDto } from "./event.dto";
import type { UpdateEventInput } from "./update-event.input";
export type UpdateEventArgs = {
  id: EventDto["id"];
  data: UpdateEventInput;
};
