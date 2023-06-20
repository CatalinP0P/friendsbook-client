import React, { useEffect, useState } from "react";
import { useDB } from "../context/dbContext";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";

import profilePhoto from "../assets/profile.webp"

export default function ProfilesList({ idsList }) {
  const db = useDB();
  const auth = useAuth();

  const [profiles, setProfiles] = useState([]);

  const fetchDetails = async () => {
    idsList.forEach(async (id) => {
      const det = await db.getProfileDetails(id);
      setProfiles((oldProfiles) => [...oldProfiles, det]);
    });
  };
  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {profiles.map((profile) => {
        return (
          <Link
            to={"/profile/" + profile.uid}
            className="cursor-pointer"
            key={profile.uid}
          >
            <div className="flex flex-row gap-4 w-full items-center pointer-events-none">
              <img
                className="w-[64px] h-[64px] rounded-full "
                src={profile.photoURL ? profile.photoURL : profilePhoto}
              />
              <label className="pointer-events-none">
                {profile.displayName}
              </label>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
