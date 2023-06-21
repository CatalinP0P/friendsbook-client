import React, { useEffect, useState } from "react";
import searchSVG from "../assets/search.svg";
import searchSVG2 from "../assets/search2.svg";
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
  const [profileQ, setProfileQ] = useState("");

  const [searchModal, setSearchModal] = useState(false);

  const searchProfiles = async (q) => {
    if (q.length < 2) {
      setSearchedProfiles([]);
      return;
    }

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

  const closeAllModals = () => {
    setMenuVisibility(false);
    setFriendsVisibility(false);
    setSearchModal(false);
  };

  return (
    <div
      className="bg-blue-900"
      onClick={() => {
        closeAllModals();
      }}
    >
      <div className="mx-auto max-w-[2200px] grid grid-cols-2 md:grid-cols-4 w-[95%] p-4 gap-8 items-center">
        <div className="flex flex-row gap-4 items-center">
          <Link to={"/"} className="cursor-pointer">
            <label className="text-lg md:text-2xl lg:text-4xl pointer-events-none">
              FriendsBook
            </label>
          </Link>
          <div className="md:hidden h-full cursor-pointer">
            <img
              onClick={(e) => {
                e.stopPropagation();
                closeAllModals();
                setSearchModal(!searchModal);
              }}
              src={searchSVG2}
              className="h-[24px] w-[24px] md:w-[32px] md:h-[32px]"
            />
            <div
              onClick={(e) => e.stopPropagation()}
              className={
                "absolute top-[80px] text-black bg-white shadow-md left-2 right-2 p-4 flex-col items-center gap-2" +
                (searchModal ? " flex" : " hidden")
              }
            >
              <input
                value={profileQ}
                className="outline-none w-full bg-gray-100 p-4 rounded-3xl"
                placeholder="Search friends"
                onChange={(e) => {
                  setProfileQ(e.target.value);
                  searchProfiles(e.target.value);
                }}
              />
              <div
                className={
                  "w-full flex-row justify-between gap-4 items-center" +
                  (searchedProfiles.length <= 0 ? " hidden" : " flex")
                }
              >
                <div className="w-full h-[2px] bg-gray-200" />
                <label className={"text-gray-400 text-2xl my-4 "}>
                  Profiles
                </label>
                <div className="w-full h-[2px] bg-gray-200" />
              </div>
              {searchedProfiles.map((profile) => {
                return (
                  <Link
                    to={"/profile/" + profile.uid}
                    key={profile.uid}
                    className="flex flex-row gap-4 items-center text-black cursor-pointer w-full"
                  >
                    <img
                      src={profile.photoURL ? profile.photoURL : profilePhoto}
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

        <div className="w-full md:flex flex-row justify-start hidden col-span-2">
          <div className="relative flex flex-row gap-2 items-center justify-start bg-white rounded-full px-2">
            <img className="w-[32px] p-[2px]" src={searchSVG} />
            <input
              className="text-black outline-none py-2 min-w-[320px] m-[1px] me-[25px] w-full"
              value={profileQ}
              onChange={(e) => {
                setProfileQ(e.target.value);
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
                      src={profile.photoURL ? profile.photoURL : profilePhoto}
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
        <div className="flex w-full justify-end flex-row items-center gap-8">
          <div className="md:relative">
            <img
              src={personPlusFill}
              onClick={(e) => {
                e.stopPropagation();
                closeAllModals()
                setFriendsVisibility(!friendRequestVisibility);
              }}
              className="h-[24px] w-[24px] md:w-[32px] md:h-[32px] cursor-pointer"
            />
            <div
              className={
                "text-black text-end absolute bg-gray-100 p-4 right-5 md:right-0 left-5 md:left-auto top-[75px] md:top-20 transition-all rounded-xl shadow-xl flex-col text-lg  md:min-w-[400px]" +
                (friendRequestVisibility ? "" : " hidden")
              }
            >
              <h1 className="text-center w-full text-2xl">Friends Request</h1>
              <hr className="my-4" />
              {loaded ? <ProfilesList idsList={friendsRequest} /> : null}
            </div>
          </div>

          <div className="md:relative">
            <img
              src={
                auth.currentUser.photoURL
                  ? auth.currentUser.photoURL
                  : profilePhoto
              }
              className="rounded-full w-[40px] md:w-[64px] cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                closeAllModals();
                setMenuVisibility(!menuVisibility);
              }}
            />
            <div
              className={
                "text-black text-end absolute bg-gray-100 left-2 md:left-auto right-2 md:right-0 top-[80px] md:top-20 transition-all rounded-xl shadow-xl flex-col text-lg md:min-w-[400px]" +
                (menuVisibility ? " flex" : " hidden")
              }
            >
              <label className="w-full hover:bg-white p-4">
                Signed in as {auth.currentUser?.displayName}
              </label>
              <label
                className="w-full hover:bg-white p-4 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
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
