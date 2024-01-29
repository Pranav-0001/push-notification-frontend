import { api } from "./axios";
import { useMutation } from "react-query";

export default function useImageUploadMutaion({
  onSuccessCallback,
  onErrorCallback,
}) {
  return useMutation({
    mutationFn: async (data) => {
      const res = await api({
        url: "/file/imageUpload",
        data,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
