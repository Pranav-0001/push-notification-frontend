import { api } from "./axios";
import { useMutation } from "react-query";

export default function useTriggerPushNotificationMutation({
  onSuccessCallback,
  onErrorCallback,
}) {
  return useMutation({
    mutationFn: async (data) => {
      const res = await api({
        url: "/trigger",
        data,
        method: "POST",
      });
    },
    onSuccess: (data) => {
      onSuccessCallback(data);
    },
    onError: (error) => {
      onErrorCallback(error);
    },
  });
}
