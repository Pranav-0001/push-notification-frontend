import React from "react";

export default function Navbar({ user }) {
  return (
    <div className="h-14 bg-black flex justify-between px-4 absolute w-full">
      <div className="h-full flex items-center">
        <h1 className="text-white font-bold text-2xl">Push </h1>
      </div>
      {/* <div className="flex items-center gap-2">
        <h1 className="text-white cursor-pointer">Pranav</h1>
        <h1 className="text-white cursor-pointer">Log out</h1>
      </div> */}
    </div>
  );
}
