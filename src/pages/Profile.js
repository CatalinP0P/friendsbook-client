import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useAsyncError, useParams } from "react-router-dom";
import { useDB } from "../context/dbContext";
import Post from "../components/Post";
import { useAuth } from "../context/authContext";
import coverImage from "../assets/cover.jpeg";
import profilePhoto from "../assets/profile.webp";
import checkSVG from "../assets/check.svg";
import personPlus from "../assets/person-plus-fill.svg";

export default function Profile() {
  const { id } = useParams();
  const db = useDB();
  const auth = useAuth();

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();
  const [friends, setFriendship] = useState(false);

  const [loaded, setLoaded] = useState(false);
  const [requestState, setRequestState] = useState("");

  const fetchPosts = async () => {
    const posts = await db.getProfilePosts(id);
    setPosts(posts);
  };

  const handleAddButton = async () => {
    const res = await db.callFriendRequest(id);
    setRequestState(res);
  };

  const fetchDetails = async () => {
    const profileDetails = await db.getProfileDetails(id);
    setUser(profileDetails);
  };

  const fetchFriendship = async () => {
    const isFriends = await db.getFriendshipStatus(id);
    setFriendship(isFriends);
    console.log(isFriends);
  };

  const fetchRequest = async () => {
    const response = await db.getRequestState(id);
    console.log(id);
    console.log(response);
    setRequestState(response);
  };

  const fetchAll = async () => {
    await fetchDetails();
    await fetchPosts();
    await fetchFriendship();
    await fetchRequest();
    setLoaded(true);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return loaded ? (
    <Layout>
      <div className="w-[95%] max-w-[1500px] mx-auto mb-4">
        <img src={coverImage} className="w-full h-[25vw] object-cover"/>
        <div className="flex flex-col w-full items-center mt-[-90px] md:mt-[-120px] lg:mt-[-175px] gap-4">
          <img
            src={user.photoURL ? user.photoURL : profilePhoto}
            className="mx-auto w-[25%] rounded-full"
          />
          <label className="text-4xl lg:text-6xl">{user.displayName}</label>
          <button
            className={
              "flex-row gap-4 bg-blue-900 text-white px-6 py-4 rounded-md items-center " +
              (auth.currentUser.uid == id ? " hidden" : "flex")
            }
            onClick={friends ? null : handleAddButton}
          >
            {auth.currentUser.uid == id
              ? null
              : requestState == "Already friends"
              ? "Friends"
              : requestState == "Request Sent"
              ? "Cancel Request"
              : requestState == "Request Received"
              ? "Accept Friend Request"
              : "Add Friend"}
            <img
              className="w-[24px] h-[24px]"
              src={friends ? checkSVG : personPlus}
            />
          </button>
        </div>
        <div className="w-full h-[2px] mt-32 mb-16 rounded-full bg-gray-200" />
      </div>
      <div className="w-[95%] max-w-[1000px] mx-auto flex flex-col gap-4 pb-24">
        <label className="text-2xl font-bold uppercase ms-2">Posts</label>
        {posts.map((post) => {
          return <Post post={post} key={post._id} />;
        })}
      </div>
    </Layout>
  ) : null;
}
