import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useAuth } from "../context/authContext";
import { useDB } from "../context/dbContext";

import gallery from "../assets/gallery.svg";
import NewPost from "./NewPost";
import Modal from "./Modal";
import ProfilesList from "./ProfilesList";

export default function Feed() {
  const auth = useAuth();
  const db = useDB();

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const posts = await db.getPosts();
    console.log(posts);
    setPosts(posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="w-full flex flex-col gap-8 px-4">
      <NewPost />
      {posts.map((post) => {
        return <Post post={post} key={Math.random() * 1000} />;
      })}
    </div>
  );
}
