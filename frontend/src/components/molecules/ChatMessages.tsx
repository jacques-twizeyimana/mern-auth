import { useState, useEffect, FormEvent, useContext } from "react";
import toast from "react-hot-toast";
import { chatService } from "../../services/message.service";
import UserContext from "../../store/usercontext";
import { IChatMessages } from "../../types/services/message.types";
import { formatAMPM } from "../../utils/date";
import Input from "../atoms/Input";

interface IProps {
  receiver?: string;
}

export default function ChatMessages({ receiver }: IProps) {
  const [isLoading, setisLoading] = useState(false);
  const [messages, setmessages] = useState<IChatMessages[]>([]);
  const [draftMessage, setdraftMessage] = useState("");

  const { user } = useContext(UserContext);
  useEffect(() => {
    if (receiver) {
      setisLoading(true);
      chatService
        .getChatMessages(receiver)
        .then((resp) => setmessages(resp.data.data))
        .catch((err) => toast.error(err.message || "Failed to load messages"))
        .finally(() => setisLoading(false));
    }
  }, [receiver]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const resp = await chatService.sendMessage({
        receiverId: receiver || "",
        message: draftMessage,
      });
      if (resp.data.success) {
        toast.success("Message sent successfully.");
        setmessages([...messages, resp.data.data]);
        setdraftMessage("");
      } else toast.error(resp.data.message);
    } catch (error) {
      // @ts-ignore
      toast.error(error.message || "Failed to send message");
    }

    setmessages([...messages]);
  };

  return (
    <div className="h-full">
      {!receiver ? (
        <div className="flex justify-center items-center h-full">
          <p>No contact selected</p>
        </div>
      ) : (
        <div className="px-4 h-full flex flex-col justify-between">
          {/* chat messages */}
          <div className="h-full">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <img src="/gif/rolling-white.svg" className="w-20 my-6" />
              </div>
            ) : (
              <div className="messages py-2">
                <p className="text-sm py-2 text-center text-gray-500">
                  This is the very beginning of your direct messages history.
                  <br /> Messages you sent will appear below.
                </p>
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`my-2 ${
                      msg.senderId._id === user?._id
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    <p
                      className={`py-1 px-3 text-left ${
                        msg.senderId._id === user?._id
                          ? "bg-cyan-900 text-white"
                          : "bg-gray-300"
                      }  text-base inline-block max-w-3/4 rounded-lg`}
                    >
                      {msg.message}
                      <div className="span text-right pt-1 text-xs uppercase">
                        {formatAMPM(new Date(msg.createdAt))}
                      </div>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* New message form */}
          <form onSubmit={handleSubmit} className="flex w-full items-center">
            <div className="w-full">
              <Input
                handleChange={(e) => setdraftMessage(e.value.toString())}
                name={"message"}
                className="rounded-r-none placeholder:text-gray-400"
                placeholder="Type message. Press enter to sent"
              />
            </div>
            <div className="pt-3 pb-2">
              <button
                type="submit"
                className="bg-gray-800 text-base font-medium text-white rounded-r w-28 text-center py-3"
              >
                send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
