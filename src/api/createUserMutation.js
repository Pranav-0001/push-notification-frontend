import { api } from "./axios";
import { useMutation } from "react-query";

export default function useCreateUserMutation({
  onSuccessCallback,
  onErrorCallback,
}) {
  return useMutation({
    mutationFn: async (data) => {
      const res = await api({
        url: "/user/signup",
        data,
        method: "POST",
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
