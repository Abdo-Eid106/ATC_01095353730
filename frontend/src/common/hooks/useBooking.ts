import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../enums/QueryKeys";
import type { EventDto } from "../types";
import { Api } from "../api";

export const bookEvent = (eventId: EventDto["id"]) =>
  Api.post(`/events/${eventId}/book`);

export const useBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bookEvent,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QueryKeys.EVENTS] }),
  });
};
