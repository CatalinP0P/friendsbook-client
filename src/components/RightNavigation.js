import React from "react";
import ProfilesList from "./ProfilesList";

var friends = [
  {
    displayName: "Catalin Pop",
  },
  {
    displayName: "John Smith",
  },
  {
    displayName: "Mangoose Ray",
  },
];

export default function RightNavigation() {
  return (
    <div className="w-full h-fit bg-white hidden xl:flex flex-col p-4">
      <label className="text-4xl pb-4">Your friends</label>
      <ProfilesList profiles={friends} />
    </div>
  );
}
