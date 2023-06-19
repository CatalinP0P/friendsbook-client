import React, { useEffect, useState } from "react";
import searchSVG from "../assets/search.svg";
import firebase from "../lib/firebase";
import { Link } from "react-router-dom";

const auth = firebase.auth();

export default function Header() {
  const [menuVisibility, setMenuVisibility] = useState(false);

  return (
    <div className="bg-blue-900">
      <div className="mx-auto max-w-[2200px] grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-[95%] p-4 gap-4 items-center">
        <Link to={"/"} className="cursor-pointer">
          <label className="text-2xl lg:text-4xl pointer-events-none">
            FriendsBook
          </label>
        </Link>
        <div className="w-full md:flex flex-row justify-start hidden col-span-2">
          <div className="flex flex-row gap-2 items-center justify-start bg-white rounded-full px-2 overflow-hidden">
            <img className="w-[32px] p-[2px]" src={searchSVG} />
            <input
              className="text-black outline-none py-2 me-2 min-w-[320px]"
              placeholder="Search your friend...."
            />
          </div>
        </div>
        <div className="hidden xl:flex relative w-full justify-end flex-row">
          <img
            className="min-w-[64px] h-[64px] rounded-full border-none bg-transparent"
            src={auth.currentUser?.photoURL}
            onClick={() => setMenuVisibility(!menuVisibility)}
          />
          <div
            className={
              "text-black text-end absolute bg-gray-100 right-0 top-20 transition-all rounded-xl shadow-xl flex-col text-lg min-w-[400px]" +
              (menuVisibility ? " flex" : " hidden")
            }
          >
            <label className="w-full hover:bg-white p-4">
              Signed in as {auth.currentUser?.displayName}
            </label>
            <label
              className="w-full hover:bg-white p-4 cursor-pointer"
              onClick={() => {
                firebase.auth().signOut();
                setMenuVisibility(false);
              }}
            >
              Log out
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
