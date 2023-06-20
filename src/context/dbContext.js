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
    console.log(posts.data);
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

  const getFriendsIds = async () => {
    if (!req) throw "You need to add TokenID";

    try {
      const friends = await req.get("/friends");
      return friends.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getProfileDetails = async (profileId) => {
    if (!req) throw "You need to add TokenID";

    try {
      const details = await req.get("/profile/" + profileId);
      return details.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getMyFriendsRequest = async () => {
    if (!req) throw "You need to add TokenID";

    try {
      const requests = await req.get("/friends/requests");
      return requests.data;
    } catch (err) {
      console.log(err);
    }
  };

  const searchProfiles = async (q) => {
    if (!req) throw "You need to add TokenID";
    
    const profiles = await req.get("/profile/q/" + q);
    return profiles.data;
  };

  return (
    <DbContext.Provider
      value={{
        setIdToken: setIdToken,
        getPosts: getPosts,
        sendPost: sendPost,
        togglePostLike: togglePostLike,
        getProfilePosts: getProfilePosts,
        getFriendsIds: getFriendsIds,
        getProfileDetails: getProfileDetails,
        getMyFriendsRequest: getMyFriendsRequest,
        searchProfiles: searchProfiles,
      }}
    >
      {children}
    </DbContext.Provider>
  );
};
