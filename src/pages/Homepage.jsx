import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { openModal } from "../redux/modalSlice";

export default function Homepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

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

  return (
    <div className="pt-16 px-8">
      <div className="flex w-full justify-end px-8">
        <button className="border px-3 py-1 rounded bg-green-300 " onClick={()=>dispatch(openModal({modalName:"createOrUpdateModal"}))}>
          Create Push
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3">
               
      </div>
    </div>
  );
}
