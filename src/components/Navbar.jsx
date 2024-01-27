import React from "react";
import { useSelector } from "react-redux";

export default function Navbar() {
  
  const user= useSelector(state=>state.user)
  console.log({user});
  return (
    <div className="h-14 bg-black flex justify-between px-4 absolute w-full">
      <div className="h-full flex items-center">
        <h1 className="text-white font-bold text-2xl">Push </h1>
      </div>
      {user&&<div className="flex items-center gap-2">
        <h1 className="text-white cursor-pointer">{user.name}</h1>
        <h1 className="text-white cursor-pointer">Log out</h1>
      </div>}
    </div>
  );
}
