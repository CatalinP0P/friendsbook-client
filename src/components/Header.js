import React, { useEffect, useState } from "react";
import searchSVG from "../assets/search.svg";
import firebase from "../lib/firebase";
import { Link, useAsyncError } from "react-router-dom";
import personPlusFill from "../assets/person-plus-fill.svg";
import { useDB } from "../context/dbContext";
import ProfilesList from "../components/ProfilesList";
import profilePhoto from "../assets/profile.webp";

const auth = firebase.auth();

export default function Header() {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [friendRequestVisibility, setFriendsVisibility] = useState(false);

  const [friendsRequest, setRequests] = useState([]);
  const [searchedProfiles, setSearchedProfiles] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const searchProfiles = async (q) => {
    if (q.length < 1) return setSearchedProfiles([]);

    const profiles = await db.searchProfiles(q);
    console.log(profiles);
    setSearchedProfiles(profiles);
  };

  const db = useDB();

  const fetchRequests = async () => {
    const requests = await db.getMyFriendsRequest();
    console.log(requests);
    setRequests(requests);
    setLoaded(true);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="bg-blue-900">
      <div className="mx-auto max-w-[2200px] grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-[95%] p-4 gap-8 items-center">
        <Link to={"/"} className="cursor-pointer">
          <label className="text-2xl lg:text-4xl pointer-events-none">
            FriendsBook
          </label>
        </Link>
        <div className="w-full md:flex flex-row justify-start hidden col-span-2">
          <div className="relative flex flex-row gap-2 items-center justify-start bg-white rounded-full px-2">
            <img className="w-[32px] p-[2px]" src={searchSVG} />
            <input
              className="text-black outline-none py-2 me-2 min-w-[320px] m-[1pxs]"
              onChange={(e) => {
                searchProfiles(e.target.value);
              }}
              placeholder="Search your friend...."
            />
            <div
              className={
                "absolute flex-col gap-4 top-[50px] left-0 right-0 bg-white shadow-md rounded-sm p-4" +
                (searchedProfiles.length ? " flex" : " hidden")
              }
            >
              {searchedProfiles.map((profile) => {
                return (
                  <Link
                    to={"/profile/" + profile.uid}
                    key={profile.uid}
                    className="flex flex-row gap-4 items-center text-black cursor-pointer"
                  >
                    <img
                      src={profile.photoURL.length > 10 ? profile.photoURL : profilePhoto}
                      className="w-[64px] h-[64px] rounded-full pointer-events-none"
                    />
                    <label className="pointer-events-none">
                      {profile.displayName}
                    </label>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div className="hidden xl:flex relative w-full justify-end flex-row items-center gap-8">
          <div className="relative">
            <img
              src={personPlusFill}
              onClick={() => {
                setFriendsVisibility(!friendRequestVisibility);
                setMenuVisibility(false);
              }}
              className="w-[32px] h-[32px] cursor-pointer"
            />
            <div
              className={
                "text-black text-end absolute bg-gray-100 p-4 right-0 top-20 transition-all rounded-xl shadow-xl flex-col text-lg min-w-[400px]" +
                (friendRequestVisibility ? "" : " hidden")
              }
            >
              <h1 className="text-center w-full text-2xl">Friends Request</h1>
              <hr className="my-4" />
              <label>{friendsRequest.length}</label>
              {loaded ? <ProfilesList idsList={friendsRequest} /> : null}
            </div>
          </div>

          <div className="relative">
            <img
              src={auth.currentUser.photoURL ? auth.currentUser.phoneNumber : profilePhoto}
              className="rounded-full w-[64px] cursor-pointer"
              onClick={() => {
                setMenuVisibility(!menuVisibility);
                setFriendsVisibility(false);
              }}
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
    </div>
  );
}
