import { Api } from "../api";
import { QueryKeys } from "../enums/QueryKeys";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  EventDto,
  PaginatedOutput,
  GetEventsInput,
  CreateEventInput,
  UpdateEventArgs,
} from "../types";

const fetchAdminEvents = async (getEventsInput: GetEventsInput) => {
  const { data } = await Api.get<PaginatedOutput<EventDto>>("/admin/events", {
    params: getEventsInput,
  });
  return data;
};

const fetchUserEvents = async (getEventsInput: GetEventsInput) => {
  const { data } = await Api.get<PaginatedOutput<EventDto>>("/user/events", {
    params: getEventsInput,
  });
  return data;
};

const fetchEvent = async (id: EventDto["id"]) => {
  const { data } = await Api.get<EventDto>(`/events/${id}`);
  return data;
};

const addEvent = (createEventInput: CreateEventInput) =>
  Api.post("/events", createEventInput);

const updateEvent = ({ id, data }: UpdateEventArgs) =>
  Api.put(`/events/${id}`, data);

const deleteEvent = (id: EventDto["id"]) => Api.delete(`/events/${id}`);

export const useFetchAdminEvents = (getEventsInput: GetEventsInput) =>
  useQuery({
    queryKey: [QueryKeys.EVENTS, getEventsInput],
    queryFn: () => fetchAdminEvents(getEventsInput),
  });

export const useFetchUserEvents = (getEventsInput: GetEventsInput) =>
  useQuery({
    queryKey: [QueryKeys.EVENTS, getEventsInput],
    queryFn: () => fetchUserEvents(getEventsInput),
  });

export const useFetchEvent = (id: string) => {
  const parsedId = parseInt(id);
  return useQuery({
    queryKey: [QueryKeys.EVENTS, id],
    queryFn: () => fetchEvent(parsedId),
  });
};

export const useAddEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.EVENTS] });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.EVENTS] });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.EVENTS] });
    },
  });
};
