import { api } from "./axios";
import { useMutation } from "react-query";

export default function usegetAllPushNotificationByUserId({
  onSuccessCallback,
  onErrorCallback,
}) {
  return useMutation({
    mutationFn: async () => {
      const res = await api({
        url: "/getAllPushNotificationByUser",
        method: "GET",
      });
      return res;
    },
    onSuccess: (data) => {
      onSuccessCallback(data);
    },
    onError: (error) => {
      onErrorCallback(error);
    },
  });
}
