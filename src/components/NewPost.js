import React, { useRef, useState } from "react";
import { useAuth } from "../context/authContext";
import gallery from "../assets/gallery.svg";
import { useDB } from "../context/dbContext";

import profilePhoto from "../assets/profile.webp"

export default function NewPost() {
  const auth = useAuth();
  const db = useDB();

  const [postTitle, setPostTitle] = useState("");
  const [postImage, setPostImage] = useState("");

  const imageInputRef = useRef();

  const sendPost = async () => {
    const response = await db.sendPost(postTitle, postImage);
    setPostImage(null);
    setPostTitle("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const base64 = fileReader.result;
      console.log(base64);
      setPostImage(base64);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-md p-4 flex flex-col gap-4">
      <label className="text-2xl">Post something</label>
      <hr></hr>
      <div className="flex flex-row w-full gap-4 items-center">
        <img
          className="w-[64px] h-[64px] rounded-full "
          src={auth.currentUser.photoURL ? auth.currentUser.photoURL : profilePhoto}
        />
        <input
          className="w-full text-medium outline-none"
          placeholder="What's on your mind"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <input
          type="file"
          accept="image"
          className="hidden"
          id="image"
          ref={imageInputRef}
          onChange={handleFileChange}
        />

        <img
          src={gallery}
          className="w-[40px] h-[40px]"
          onClick={() => {
            imageInputRef.current.click();
          }}
        />
      </div>
      <img
        className={
          "w-full max-h-[800px] object-cover overflow-hidden " +
          (postImage ? " " : " hidden")
        }
        src={postImage}
      />

      <div className="flex flex-row justify-between w-full">
        <button
          className={
            "py-2 px-4 bg-blue-900 text-white font-semibold text-2xl rounded-md w-fit" +
            (postImage ? " " : " hidden")
          }
          onClick={() => setPostImage(null)}
        >
          Remove Image
        </button>
        <button
          onClick={() => sendPost()}
          className={
            "py-2 px-4 bg-blue-900 text-white font-semibold text-2xl rounded-md w-fit ms-auto" +
            (postTitle.trim().length ? " " : " hidden")
          }
        >
          Post
        </button>
      </div>
    </div>
  );
}
