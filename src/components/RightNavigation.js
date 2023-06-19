import React, { useEffect, useState } from "react";
import ProfilesList from "./ProfilesList";
import { useAuth } from "../context/authContext";
import { useDB } from "../context/dbContext";

export default function RightNavigation() {
  const auth = useAuth();
  const db = useDB();

  const [friendsIds, setFriends] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const fetchFriends = async () => {
    const list = await db.getFriendsIds();
    setFriends(list);
    setLoaded(true)
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return loaded ? (
    <div className="w-full h-fit bg-white hidden xl:flex flex-col p-4">
      <label className="text-4xl pb-4">Your friends</label>
      <hr className="mb-4"/>
      <ProfilesList idsList={friendsIds} />
    </div>
  ) : null;
}
