import React from "react";

export default function ProfilesList({ profiles }) {
  return (
    <div className="flex flex-col gap-2">
      {profiles.map((profile) => {
        return (
          <div className="flex flex-row gap-4 w-full items-center" key={Math.random() * 1000}>
            <div className="min-w-[64px] h-[64px] rounded-full bg-gray-400" />
            <label>{profile.displayName}</label>
          </div>
        );
      })}
    </div>
  );
}
