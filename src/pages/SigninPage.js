import React, { useEffect } from "react";
import firebase from "../lib/firebase";
import socialize from "../assets/socialize.png";
import googleSvg from "../assets/google.svg";
import { GoogleAuthProvider } from "firebase/auth";
import { useAuth } from "../context/authContext";

const auth = firebase.auth();

export default function SigninPage() {
  const authContext = useAuth();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();  
    auth.signInWithPopup(provider).then((user) => {
      console.log(user);
    });
  };

  return (
    <div className="h-screen bg-blue-900 text-white flex flex-row items-center justify-center gap-32">
      <img src={socialize} className="w-[768px] xl:block hidden" />
      <div className="bg-white py-16 rounded-3xl max-w-[800px] w-[95%] flex flex-col items-center text-center text-black text-2xl gap-8">
        <label className="text-6xl text-blue-900 font-bold uppercase">
          FriendsBook
        </label>
        <div className="relative w-[75%] max-w-[500px] mt-16">
          <input
            type="email"
            placeholder=" "
            className="w-full px-6 py-4 bg-white outline-none border-4 rounded-xl border-blue-900 custom-input"
          />
          <label className="absolute left-[1em] top-[.80em] text-gray-400 transition-all">
            Email
          </label>
        </div>
        <div className="relative w-[75%] max-w-[500px]">
          <input
            type="password"
            placeholder=" "
            className="w-full px-6 py-4 bg-white outline-none border-4 rounded-xl border-blue-900 custom-input"
          />
          <label className="absolute left-[1em] top-[.80em] text-gray-400 transition-all">
            Password
          </label>
        </div>

        <button className="w-[75%] max-w-[500px] bg-blue-900 text-white p-4 rounded-xl hover:bg-blue-600 transition-all">
          Login
        </button>

        <div className="flex flex-row items-center w-[75%] max-w-[500px] gap-4 my-8">
          <div className="w-full h-[2px] bg-black"></div>
          <label>or</label>
          <div className="w-full h-[2px] bg-black"></div>
        </div>

        <div className="w-[75%] max-w-[500px]">
          <button
            onClick={() => signInWithGoogle()}
            className="p-4 flex flex-row gap-4 justify-between border-2 border-gray-200 rounded-full text-black w-full font-medium"
          >
            <img className="w-[32px] pointer-events-none" src={googleSvg} />
            <label className="pointer-events-none"> Sign in with Google </label>
            <div className="w-[32px] pointer-events-none"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
