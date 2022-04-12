import React, { useState } from "react";

export default function Home() {
  const [isEditing, setisEditing] = useState(true);
  return (
    <div className="lg:w-2/3 mx-auto py-14 lg:py-20 xl:py-24 px-6">
      <div className="text-right">
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
      <p className="text-2xl lg:text-3xl italic text-gray-500 tracking-wide">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum
        voluptatum quisquam voluptatibus expedita excepturi autem aperiam minus
        deserunt laborum illum. Velit deserunt rerum, dolorum hic autem nobis
        odit? Accusamus, et?
      </p>
    </div>
  );
}
