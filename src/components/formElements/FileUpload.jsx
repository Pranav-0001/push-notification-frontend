import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import useImageUploadMutaion from "../../api/imageUploadMutation";
import UploadLoader from "../loaders/UploadLoader";

export default function FileUpload({
  placeholder,
  label,
  required,
  error,
  touched,
  onChange,
  value,
  ...rest
}) {
  const [url, setURl] = useState("");
  const imageUploadMutaion = useImageUploadMutaion({
    onSuccessCallback: ({ data }) => {
      if (data.url) {
        setURl(data.url);
      }
    },
    onErrorCallback: (data) => {},
  });

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    imageUploadMutaion.mutate(formData);
  };
  useEffect(() => {
    onChange(url);
  }, [url]);
  useEffect(() => {
    if (value !== "") setURl(value);
  }, []);

  return (
    <div>
      <p>
        {label} {required && <span className="text-red-600">*</span>}
      </p>
      {imageUploadMutaion?.isLoading ? (
        <div className=" h-32 flex justify-center  relative overflow-hidden">
          <UploadLoader />
        </div>
      ) : (
        <div
          style={{
            backgroundImage: `url(${
              url
                ? url
                : "https://img.freepik.com/premium-vector/gallery-icon-picture-landscape-vector-sign-symbol_660702-224.jpg"
            })`,
            position: "relative",
          }}
          className={`outline-none border w-full h-32 rounded shadow px-2 bg-no-repeat bg-cover bg-center   ${
            touched && error && "border-red-500 "
          }`}
        >
          <button className="float-end">
            <FontAwesomeIcon icon={faTrash} className="text-red-600" />
          </button>

          <div className="absolute top-0 left-0 w-full h-full justify-center flex items-center px-8">
            <div className="bg-black text-wh rounded  text-white w-full px-3 py-1 opacity-80 h-8  relative overflow-hidden ">
              <h1 className="absolute left-0 flex w-full justify-center">
                Choose Image
              </h1>
              <input
                type="file"
                className="opacity-0 h-full"
                placeholder={placeholder}
                onChange={(e) => handleFileUpload(e.target.files[0])}
                {...rest}
              />
            </div>
          </div>
        </div>
      )}
      {touched && error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
