import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { openModal } from "../redux/modalSlice";
import useGetAllPushNotificationByIdQuery from "../api/getAllPushNotificationByUserId";
import useTriggerPushNotificationMutation from "../api/triggerPushNotificationMutation";
import { Bounce, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import createFileAndDownload from "../helpers/createFileAndDownload";

export default function Homepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const user = useSelector((state) => state.user);
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
        <div className="flex justify-center items-center gap-2">
          <button
            className="border px-3 py-1 rounded bg-green-300"
            onClick={() =>
              createFileAndDownload({
                content: `if (!this.document) {
  self.addEventListener("push", (event) => {
    let notification = event.data.json();
    self.registration.showNotification(
      notification.title,
      notification.options
    );
  });
  self.addEventListener(
    "notificationclick",
    function (event) {
      if (clients && event.action?.split("redirect_")[1]) {
        clients.openWindow(event.action.split("redirect_")[1]);
      }
      event.notification.close();
    },
    false
  );
} else {
  var VAPID_PUBLIC_KEY =
    "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";

  async function registerServiceWorker() {
    await navigator.serviceWorker.register("main.js");
  }
  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.getRegistration();
    const isAlreadySubscribed =
      await registration.pushManager.getSubscription();
    if (!isAlreadySubscribed) {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(VAPID_PUBLIC_KEY),
      });
      var scriptElement = document.querySelector("script[data-owner]");
      var owner = "${user?.userId}"
      console.log({ subscription });
      const res = await fetch("http://localhost:3000/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscription,owner }),
      });
    }
  }

  const urlB64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  async function postToServer(url, data) {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  (function init() {
    registerServiceWorker();
    subscribeToPush();
  })();
}
`,
                fileType: "application/javascript",
                fileName: "push.js",
              })
            }
          >
            Generate Script
          </button>
          <button
            className="border px-3 py-1 rounded bg-green-300 "
            onClick={() =>
              dispatch(openModal({ modalName: "createOrUpdateModal" }))
            }
          >
            Create Push
          </button>
        </div>
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
                      modalProps: { edit: true, notification: push },
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
