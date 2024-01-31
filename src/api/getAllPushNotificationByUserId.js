import { api } from "./axios";
import { useQuery } from "react-query";

export default function useGetAllPushNotificationByIdQuery() {
  async function getAllPushNotifications() {
    const res = await api({
      method: "get",
      url: `/getAllPushNotificationByUser`,
    });
    return res.data;
  }
  return useQuery([`getAllPushNotifications`], getAllPushNotifications);
}
