import React from "react";
import ReactDom from "react-dom";
import x from "../assets/x.svg";

export default function Modal({ children, open, onClose, title }) {
  if (!open) return;

  return ReactDom.createPortal(
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,.7)] z-[1000]">
      <div
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-4 z-[1000]"
        style={{ pointerEvents: "all" }}
      >
        <div className="flex flex-row justify-between w-full gap-32 items-center">
          <label className="text-4xl font-semibold text-blue-800">
            {title}
          </label>
          <img
            onClick={onClose}
            className="w-[56px] h-[56px] rounded-full bg-gray-400 p-4 m-1 cursor-pointer"
            src={x}
          />
        </div>
        <hr className="my-4" />
        {children}
      </div>
    </div>,
    document.getElementById("portal")
  );
}
