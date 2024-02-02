import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { openModal } from "../redux/modalSlice";
import useGetAllPushNotificationByIdQuery from "../api/getAllPushNotificationByUserId";
import useTriggerPushNotificationMutation from "../api/triggerPushNotificationMutation";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function Homepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const getAllPushNotificationByUser = useGetAllPushNotificationByIdQuery();
  const triggerPushNotificationMutation = useTriggerPushNotificationMutation({
    onSuccessCallback: (data) => {
      toast.success("Push notification Triggered successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    },
    onErrorCallback: (data) => {},
  });


  if (currentUser.user) {
    dispatch(
      setUser({
        userId: currentUser.user?._id,
        name: currentUser.user?.name,
        email: currentUser.user?.email,
      })
    );
  } else {
    navigate("/signin");
  }
  const TriggerPushNotification = (notificationId) => {
    triggerPushNotificationMutation.mutate({ notificationId });
  };

  return (
    <div className="pt-16 px-8">
      <div className="flex w-full justify-end px-8">
        <button
          className="border px-3 py-1 rounded bg-green-300 "
          onClick={() =>
            dispatch(openModal({ modalName: "createOrUpdateModal" }))
          }
        >
          Create Push
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-4 gap-3 mt-8">
        {getAllPushNotificationByUser.data?.pushNotifications?.map((push) => (
          <div
            key={push?._id}
            className=" bg-gray-700  rounded-xl hover:bg-gray-900 hover:scale-105 duration-300 p-5"
          >
            <div className="flex justify-between">
              <img
                className="h-20 rounded-xl"
                src={
                  push.data?.options?.icon
                    ? push.data?.options?.icon
                    : "https://cdn1.iconfinder.com/data/icons/google_jfk_icons_by_carlosjj/512/chrome.png"
                }
                alt=""
              />
              <button
                className="h-8"
                onClick={() => {
                  dispatch(
                    openModal({
                      modalName: "createOrUpdateModal",
                      modalProps: {edit:true,notification:push},
                    })
                  );
                }}
              >
                <FontAwesomeIcon className="text-white" icon={faEdit} />
              </button>
            </div>
            <h4 className="py-2 text-white font-bold">{push.data?.title}</h4>
            <p className="text-base leading-7 text-white font-semibold space-y-4">
              {push.data?.options?.body}
            </p>
            <div className="pt-5 pb-2 flex justify-center">
              <button
                onClick={() => TriggerPushNotification(push._id)}
                className="w-36 h-10 font-semibold rounded-md bg-indigo-100 hover:scale-90 duration-500"
              >
                Trigger
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
