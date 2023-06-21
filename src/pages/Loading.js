import React, { useEffect, useState } from "react";

export default function Loading() {
  const titles = ["Loading.", "Loading..", "Loading..."];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    loop();
  }, []);

  const loop = async () => {
    setInterval(() => {
      setIndex((oldIndex) => (oldIndex + 1 < titles.length ? oldIndex + 1 : 0));
    }, 500);
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center text-white bg-blue-900 text-6xl">
      <label>{titles[index]}</label>
    </div>
  );
}
