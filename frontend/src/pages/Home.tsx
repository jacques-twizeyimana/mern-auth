import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { textService } from "../services/text.service";
import UserContext from "../store/usercontext";
import { ITextInfo } from "../types/services/text.types";

export default function Home() {
  const [isLoading, setisLoading] = useState(true);
  const [draftText, setDraftText] = useState<string>("");
  const [publicText, setPublicText] = useState<ITextInfo | undefined>();
  const [isEditing, setisEditing] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    setDraftText(publicText?.content || "");
  }, [publicText]);

  useEffect(() => {
    textService
      .getText()
      .then((resp) => setPublicText(resp.data.data))
      .finally(() => setisLoading(false));
  }, []);

  const handleSave = () => {
    textService
      .updateText({ content: draftText })
      .then((resp) => {
        if (resp.data.success) {
          setisEditing(false);
          toast.success("Successfully saved");
          setPublicText(resp.data.data);
        } else toast.error(resp.data.message);
      })
      .catch((err) => toast.error(err.message || "Failed to save"));
  };

  return (
    <div className="lg:w-2/3 mx-auto py-14 lg:py-20 xl:py-24 px-6">
      <div
        className={isEditing || isLoading || !user ? "hidden" : "text-right"}
      >
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
        {isLoading ? (
          <img src="/gif/rolling-white.svg" className="w-32 my-8 mx-auto" />
        ) : (
          publicText?.content
        )}
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
