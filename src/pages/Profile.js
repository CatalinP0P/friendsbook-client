import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useAsyncError, useParams } from "react-router-dom";
import { useDB } from "../context/dbContext";
import Post from "../components/Post";
import { useAuth } from "../context/authContext";

export default function Profile() {
  const { id } = useParams();
  const db = useDB();
  const auth = useAuth();

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();

  const fetchPosts = async () => {
    const posts = await db.getProfilePosts(id);
    console.log(posts);
    setPosts(posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Layout>
      <div className="w-[95%] max-w-[1500px] mx-auto mb-4">
        <div className="bg-gray-400 w-full h-[0] pb-[35%]"></div>
        <div className="flex flex-col w-full items-center mt-[-175px] gap-4">
          <img
            src={auth.currentUser.photoURL}
            className="mx-auto w-[25%] rounded-full"
          />
          <label className="text-6xl">{auth.currentUser.displayName}</label>
        </div>
        <div className="w-full h-[2px] mt-32 mb-16 rounded-full bg-gray-200" />
      </div>
      <div className="w-[95%] max-w-[1000px] mx-auto flex flex-col gap-4">
        <label className="text-2xl font-bold uppercase ms-2">Posts</label>
        {posts.map((post) => {
          return <Post post={post} key={post._id} />;
        })}
      </div>
    </Layout>
  );
}
