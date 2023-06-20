import React, { useRef, useState } from "react";
import firebase from "../lib/firebase";
const auth = firebase.auth();

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [confirmedPass, setConfirmedPass] = useState("");
  const [imageURL, setImage] = useState("");
  const [error, setError] = useState("");

  const inputFile = useRef(null);

  const createAccount = async () => {
    if (password != confirmedPass) return setError("Passwords do not match");

    try {
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await response.user.updateProfile({
        displayName: displayName,
      });

      window.location.href = window.origin + "/";
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFileChange = (e) => {
    try {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const base64 = fileReader.result;
        setImage(base64);
      };
      fileReader.readAsDataURL(file);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen w-full bg-blue-900 flex flex-col justify-center text-center items-center">
      <form className="w-full" autoComplete="off">
        <div className="bg-white shadow-md rounded-3xl p-4 w-[95%] max-w-[1200px] mx-auto flex flex-col gap-4">
          <label className="text-4xl lg:text-6xl text-black font-semibold text-center w-full pointer-events-none">
            Register
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-8 text-2xl mt-16">
            <div className="relative w-full">
              <input
                type="email"
                placeholder=" "
                value={email}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 bg-white outline-none border-4 rounded-xl border-blue-900 custom-input"
              />
              <label className="absolute left-[1em] top-[.8em] text-gray-400 transition-all pointer-events-none">
                Email
              </label>
            </div>

            <div className="relative w-full">
              <input
                placeholder=" "
                value={displayName}
                type="name"
                autoComplete="off"
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-6 py-4 bg-white outline-none border-4 rounded-xl border-blue-900 custom-input"
              />
              <label className="absolute left-[1em] top-[.80em] text-gray-400 transition-all pointer-events-none">
                Display Name
              </label>
            </div>

            <div className="relative w-full">
              <input
                type="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-white outline-none border-4 rounded-xl border-blue-900 custom-input"
              />
              <label className="absolute left-[1em] top-[.80em] text-gray-400 transition-all pointer-events-none">
                Password
              </label>
            </div>

            <div className="relative w-full ">
              <input
                type="password"
                placeholder=" "
                value={confirmedPass}
                onChange={(e) => setConfirmedPass(e.target.value)}
                className="w-full px-6 py-4 bg-white outline-none border-4 rounded-xl border-blue-900 custom-input"
              />
              <label className="absolute left-[1em] top-[.80em] text-gray-400 transition-all pointer-events-none">
                Confirm Password
              </label>
            </div>
          </div>

          <button
            className="bg-blue-900 rounded-md text-white font-semibold text-xl px-6 py-4 mt-16"
            onClick={() => createAccount()}
          >
            Create Account
          </button>
          <p
            className={
              "w-full text-red-600 font-semibold text-lg" +
              (error ? " " : " hidden")
            }
          >
            {error}
          </p>
        </div>
      </form>
    </div>
  );
}
