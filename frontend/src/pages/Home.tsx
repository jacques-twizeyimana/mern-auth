import React, { useState, useEffect } from "react";

export default function Home() {
  const [draftText, setDraftText] = useState("");
  const [publicText, setPublicText] = useState("");
  const [isEditing, setisEditing] = useState(false);

  useEffect(() => {
    setDraftText(publicText);
  }, [publicText]);

  useEffect(() => {
    setPublicText(`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum
      voluptatum quisquam voluptatibus expedita excepturi autem aperiam minus
      deserunt laborum illum. Velit deserunt rerum, dolorum hic autem nobis
      odit? Accusamus, et?`);
  }, []);

  const handleSave = () => {
    setisEditing(false);
    setPublicText(draftText);
  };

  return (
    <div className="lg:w-2/3 mx-auto py-14 lg:py-20 xl:py-24 px-6">
      <div className={isEditing ? "hidden" : "text-right"}>
        <button
          className="px-2 py-2 bg-gray-50 rounded-full"
          onClick={() => setisEditing(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="32"
            height="32"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"
              fill="rgba(52,72,94,1)"
            />
          </svg>
        </button>
      </div>
      <p
        className={`${
          isEditing ? "hidden" : "block"
        } text-2xl lg:text-3xl italic text-gray-500 tracking-wide`}
      >
        {publicText}
      </p>
      <div className={`${isEditing ? "block" : "hidden"}`}>
        <textarea
          name="text"
          className="border-2 border-gray-800 focus:outline-none rounded w-full h-64 p-4 mb-4 resize-none"
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
        />
        <div className="my-2 flex gap-4">
          <button
            className="border-2  border-gray-800 px-8 rounded py-2 text-center"
            onClick={() => setisEditing(false)}
          >
            Discard
          </button>

          <button
            className="border-2 rounded bg-gray-800 px-10 text-white py-2 text-center"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
