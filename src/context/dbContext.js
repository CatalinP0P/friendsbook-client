import React, { useContext, createContext, useState } from "react";
import axios from "axios";

const DbContext = createContext(null);

export const useDB = () => {
  return useContext(DbContext);
};

export const DbProvider = ({ children }) => {
  var req;

  const setIdToken = (token) => {
    req = axios.create({
      headers: {
        authorization: "Bearer " + token,
      },
      baseURL: process.env.REACT_APP_SERVER_URL,
    });
  };

  const getPosts = async () => {
    if (!req) throw "You need to add TokenID";

    try {
      const posts = await req.get("/posts");
      return posts.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getProfilePosts = async (profileId) => {
    if (!req) throw "You need to add TokenID";

    const posts = await req.get("/posts/profile/" + profileId);
    console.log(posts.data)
    return posts.data;
  };

  const togglePostLike = async (postId) => {
    const response = await req.post("/likes/" + postId);
    return response.data == "liked" ? true : false;
  };

  const sendPost = async (title, photo64) => {
    if (!req) throw "You need to add TokenID";

    try {
      const response = await req.post("/posts", {
        title: title,
        photoURL: photo64,
      });

      return response;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DbContext.Provider
      value={{
        setIdToken: setIdToken,
        getPosts: getPosts,
        sendPost: sendPost,
        togglePostLike: togglePostLike,
        getProfilePosts: getProfilePosts,
      }}
    >
      {children}
    </DbContext.Provider>
  );
};
