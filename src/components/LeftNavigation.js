import React from "react";
import { useAuth } from "../context/authContext";
import peopleFill from "../assets/people-fill.svg";
import peopleGroup from "../assets/people-group.svg";
import profilePhoto from "../assets/profile.webp";
import feed from "../assets/newspaper.svg";
import { Link } from "react-router-dom";

export default function LeftNavigation() {
  const authContext = useAuth();

  return (
    <div className="w-full h-fit bg-white shadow-md rounded-md p-4 hidden md:flex flex-col items-center gap-4 px-8 lg:px-12">
      <Link
        className="w-full h-full flex flex-col items-center gap-4"
        to={"/profile/" + authContext.currentUser.uid}
      >
        <img
          className="w-[50%] rounded-full"
          src={
            authContext.currentUser.photoURL
              ? authContext.currentUser.photoURL
              : profilePhoto
          }
        />
        <label className="text-3xl lg:text-5xl font-bold text-gray-800">
          {authContext.currentUser.displayName}
        </label>
      </Link>

      <div className="h-[2px] w-full bg-gray-500 my-8" />

      <div className="w-full flex flex-col gap-4">
        <a
          className="flex flex-row gap-4 items-center w-full text-blue-900 font-semibold"
          href=""
        >
          <img src={feed} className="w-[32px] h-[32px] pointer-events-none" />
          <label className="pointer-events-none">Feed</label>
        </a>

        <a
          className="flex flex-row gap-4 items-center w-full text-blue-900 font-semibold"
          href=""
        >
          <img
            src={peopleFill}
            className="w-[32px] h-[32px] pointer-events-none"
          />
          <label className="pointer-events-none">Friends</label>
        </a>

        <a
          className="flex flex-row gap-4 items-center w-full text-blue-900 font-semibold"
          href=""
        >
          <img
            src={peopleGroup}
            className="w-[32px] h-[32px] pointer-events-none"
          />
          <label className="pointer-events-none">Groups</label>
        </a>
      </div>
    </div>
  );
}
