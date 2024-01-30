import React from "react";
import Textfiled from "../formElements/Textfiled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/modalSlice";
import FileUpload from "../formElements/FileUpload";
import { Formik } from "formik";
import useCreatePushNotificationMutation from "../../api/createPushNotificationMutation";
import { Bounce, toast } from "react-toastify";

export default function CreateOrUpdateModal({}) {
  const dispatch = useDispatch();
  const createPushNotificationMutation = useCreatePushNotificationMutation({
    onSuccessCallback: (data) => {
      toast.success('Push notification created successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
        });
        dispatch(closeModal())
    },
    onErrorCallback: (data) => {},
  });
  return (
    <div className="min-h-96 w-3/5 bg-white rounded-xl shadow-lg ">
      <div className="py-3 px-6 border-b-2 flex justify-between">
        <h1 className="text-xl font-bold">Create Push Notification</h1>
        <button className="font-bold" onClick={() => dispatch(closeModal())}>
          <FontAwesomeIcon className="text-xl font-bold" icon={faXmark} />
        </button>
      </div>
      <Formik
        initialValues={{
          title: "",
          description: "",
          icon: "",
          image: "",
          button1: "",
          action1: "",
          button2: "",
          action2: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log({ values });
          const payload = {
            title: values?.title,
            options: {
              body: values?.description,
              image: values?.image,
              icon: values?.icon,
              actions: [
                {
                  title: values?.button1,
                  action: values?.action1,
                  type: values?.button1?"button":"",
                },
                {
                  title: values?.button2,
                  action: values?.action2,
                  type: values?.button2?"button":"",
                },
              ],
            },
          };
          console.log({ payload });
          createPushNotificationMutation.mutate({...payload})
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <>
              <div className="grid grid-cols-2 mt-2 h-96 overflow-y-scroll ">
                <div className="h-10 px-8">
                  <Textfiled
                    label="Title"
                    name="title"
                    value={values?.title}
                    onChange={handleChange}
                  />
                  <Textfiled
                    label="Description"
                    name="description"
                    value={values?.description}
                    onChange={handleChange}
                  />
                  <div className="grid grid-cols-2 gap-1 ">
                    <FileUpload
                      label="icon"
                      name="icon"
                      value={values?.icon}
                      onChange={(value) => {
                        setFieldValue("icon", value);
                      }}
                    />
                    <FileUpload
                      label="Image"
                      name="image"
                      value={values?.image}
                      onChange={(value) => {
                        setFieldValue("image", value);
                      }}
                    />
                  </div>
                  <p>Button</p>
                  <div className="grid grid-cols-2 gap-1 pb-6">
                    <Textfiled
                      label="Label"
                      value={values?.button1}
                      name="button1"
                      onChange={handleChange}
                    />
                    <Textfiled
                      label="Url"
                      value={values?.action1}
                      name="action1"
                      onChange={handleChange}
                    />
                    <Textfiled
                      label="Lable"
                      value={values?.button2}
                      name="button2"
                      onChange={handleChange}
                    />
                    <Textfiled
                      label="Url"
                      value={values?.action2}
                      name="action2"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="h-10 px-8 pt-1">
                  <div className="w-full  border rounded-lg overflow-hidden">
                    {values?.image && (
                      <div
                        className="w-full h-52  bg-red-50 bg-no-repeat bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${values?.image})`,
                        }}
                      ></div>
                    )}
                    <div className="flex w-full p-2 gap-3 bg-gray-50">
                      {values?.icon && (
                        <div
                          className="w-16 h-14  bg-cover bg-center bg-no-repeat"
                          style={{
                            backgroundImage: `url(${values?.icon})`,
                          }}
                        ></div>
                      )}
                      <div className="w-full ">
                        <h2>{values?.title ? values?.title : "Title"}</h2>
                        <p className="text-sm">
                          {values?.description
                            ? values?.description
                            : "Description"}
                        </p>
                        <p className="text-xs">example.com</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1 px-2 py-2 bg-gray-50 h-12">
                      <button
                        className="border rounded py-1 hover:bg-slate-500 hover:text-white"
                        disabled
                      >
                        {values?.button1}
                      </button>
                      <button
                        className="border rounded py-1 hover:bg-slate-500 hover:text-white"
                        disabled
                      >
                        {values?.button2}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-12 flex justify-end px-10 border-t-2 items-center">
                <button
                  className="border px-4 h-8 rounded bg-green-300"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </>
          </form>
        )}
      </Formik>
    </div>
  );
}
