import React from "react";
import Textfiled from "../formElements/Textfiled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/modalSlice";

export default function CreateOrUpdateModal({}) {
    const dispatch = useDispatch()
  return (
    <div className="min-h-96 w-3/5 bg-white rounded-xl shadow-lg ">
      <div className="py-3 px-6 border-b-2 flex justify-between">
        <h1 className="text-xl font-bold">Create Push Notification</h1>
        <button className="font-bold" onClick={()=>dispatch(closeModal())}>
          <FontAwesomeIcon className="text-xl font-bold" icon={faXmark} />
        </button>
      </div>
      <div className="grid grid-cols-2 mt-2 h-96 overflow-y-scroll ">
        <div className="h-10 px-8">
          <Textfiled label="Title" />
          <Textfiled label="Description" />
          <Textfiled label="icon" />
          <Textfiled label="Image" />
          <p>Button</p>
          <div className="grid grid-cols-2 gap-1 pb-6">
            <Textfiled label="Label" />
            <Textfiled label="Url" />
            <Textfiled label="Lable" />
            <Textfiled label="Url" />
          </div>
        </div>

        <div className="h-10 px-8 pt-1">
          <div className="w-full  border rounded-lg overflow-hidden">
            <div
              className="w-full h-52  bg-red-50 bg-no-repeat bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg")',
              }}
            ></div>
            <div className="flex w-full p-2 gap-3">
              <div
                className="w-16 h-14  bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    'url("https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg")',
                }}
              ></div>
              <div className="w-full ">
                <h2>Title</h2>
                <p className="text-sm">
                  Title Title adfdasfjdsflsjlfdsjflsdkj aldfkjdlsa fdsf jsadjf
                  sdakfasjmfdf fdfdf dfdf dsdsd sdsd dsd dsdt
                </p>
                <p className="text-xs">example.com</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1 px-2 py-2">
              <button className="border rounded py-1 hover:bg-slate-500 hover:text-white">One</button>
              <button className="border rounded py-1 hover:bg-slate-500 hover:text-white">TWO</button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-12 flex justify-end px-10 border-t-2 items-center">
        <button className="border px-4 h-8 rounded bg-green-300">Save</button>
      </div>
    </div>
  );
}
