import { api } from "./axios";
import { useMutation } from "react-query";

export default function useUpdatePushNotificationMutation({
  onSuccessCallback,
  onErrorCallback,
}) {
  return useMutation({
    mutationFn: async (data) => {
      const res = await api({
        url: `/updatePushNotificationById`,
        data,
        method: "PATCH",
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
