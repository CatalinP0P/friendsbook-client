import React, { useEffect, useState } from "react";
import LeftNavigation from "../components/LeftNavigation";
import RightNavigation from "../components/RightNavigation";
import Feed from "../components/Feed";
import { useAuth } from "../context/authContext";
import { useDB } from "../context/dbContext";
import { indexedDBLocalPersistence } from "firebase/auth";
import NewPost from "../components/NewPost";

export default function LandingPage() {
  const auth = useAuth();
  const db = useDB();

  return (
    <div className="max-w-[2200px] mx-auto p-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <LeftNavigation />
      <div className="col-span-2">
        <Feed />
      </div>
      <RightNavigation />
    </div>
  );
}
