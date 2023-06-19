import React, { useEffect, useState } from "react";

import liked from "../assets/liked.svg";
import notLiked from "../assets/notliked.svg";

import { useCallback } from "react";
import { useDB } from "../context/dbContext";
import { useAuth } from "../context/authContext";

export default function Post({ post }) {
  const auth = useAuth();
  const db = useDB();

  const [likedPost, setLikeState] = useState(false);
  const [postLikes, setPostLikes] = useState(post.likes.length);

  useEffect(() => {
    const liked = post.likes.filter((m) => m.userId == auth.currentUser.uid);
    if (liked.length <= 0) setLikeState(false);
    else setLikeState(true);
  }, []);

  const toggleLike = async () => {
    const state = await db.togglePostLike(post._id);
    setLikeState(state);
    setPostLikes(state == true ? postLikes + 1 : postLikes - 1);
  };

  return (
    <div className="bg-white p-4 px-6 w-full flex flex-col gap-8">
      <div className="flex flex-row gap-4 w-full">
        <img
          className="min-w-[64px] h-[64px] rounded-full"
          src={post.userPhoto}
        />

        <div className="flex flex-col w-full justify-around">
          <label className="font-medium text-xl">{post.userDisplayName}</label>
          <label className="font-semibold text-sm text-gray-400">
            24 Aug 2023
          </label>
        </div>
      </div>

      <label>{post.title}</label>
      <img
        className={"w-full" + (post.photoURL ? " " : " hidden")}
        src={post.photoURL}
      />
      <hr />
      <div className="flex flex-row w-full items-center gap-16">
        <div className="flex flex-row gap-2 items-center">
          <img
            onClick={() => toggleLike()}
            src={likedPost ? liked : notLiked}
            className="w-[32px] h-[32px] cursor-pointer"
          />
          <label>{postLikes}</label>
        </div>
      </div>
    </div>
  );
}
