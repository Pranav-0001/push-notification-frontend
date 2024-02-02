import { api } from "./axios";
import { useQuery } from "react-query";

export default function useGetPushNotificationById(notificationId) {
    async function getPushNotificationById() {
      const res = await api({
        method: "get",
        url: `/getPushNotificationById/${notificationId}`,
      });
      return res.data.data;
    }
    return useQuery([`getPushNotificationById`], getPushNotificationById);
  }