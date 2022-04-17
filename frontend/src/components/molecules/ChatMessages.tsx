import { useState, useEffect, FormEvent, useContext } from "react";
import UserContext from "../../store/usercontext";
import { IChatMessages } from "../../types/services/message.types";
import { UserInfo } from "../../types/services/users.types";
import Input from "../atoms/Input";

interface IProps {
  receiver?: string;
}

function getSender(_id: string): UserInfo {
  return {
    _id,
    firstName: "Jacques",
    lastName: "Me",
    role: "ADMIN",
    profileImage: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 1,
    email: "sandbergjacques500@gmail.com",
  };
}

const staticMessages: IChatMessages[] = [
  {
    _id: "1",
    createdAt: new Date(),
    message: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
    dicta veritatis qui similique. Mollitia fugiat nisi
    molestias amet in suscipit quod esse, obcaecati id deserunt
    repellat, alias, quaerat nostrum fuga!`,
    sender: getSender("2"),
    status: "SENT",
    updatedAt: new Date(),
    __v: 1,
  },
  {
    _id: "1",
    createdAt: new Date(),
    message: "Good afternoon",
    sender: getSender("2"),
    status: "SENT",
    updatedAt: new Date(),
    __v: 1,
  },

  {
    _id: "1",
    createdAt: new Date(),
    message: "Hello",
    sender: getSender("625c8973e0cb2ffb728ba7f4"),
    status: "SENT",
    updatedAt: new Date(),
    __v: 1,
  },

  {
    _id: "1",
    createdAt: new Date(),
    message: "Hey",
    sender: getSender("2"),
    status: "SENT",
    updatedAt: new Date(),
    __v: 1,
  },

  {
    _id: "1",
    createdAt: new Date(),
    message: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
    dicta veritatis qui similique. Mollitia fugiat nisi
    molestias amet in suscipit quod esse, obcaecati id deserunt
    repellat, alias, quaerat nostrum fuga!`,
    sender: getSender("625c8973e0cb2ffb728ba7f4"),
    status: "SENT",
    updatedAt: new Date(),
    __v: 1,
  },
];

export default function ChatMessages({ receiver }: IProps) {
  const [isLoading, setisLoading] = useState(false);
  const [messages, setmessages] = useState<IChatMessages[]>([]);

  const { user } = useContext(UserContext);
  useEffect(() => {
    if (receiver) {
      setisLoading(true);
      setTimeout(() => {
        setisLoading(false);
        setmessages(staticMessages);
      }, 2000);
    }
  }, [receiver]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`my-2 ${
                      msg.sender._id === user?._id ? "text-right" : "text-left"
                    }`}
                  >
                    <p
                      className={`py-1 px-3 text-left ${
                        msg.sender._id === user?._id
                          ? "bg-cyan-900 text-white"
                          : "bg-gray-300"
                      }  text-base inline-block max-w-3/4 rounded-lg`}
                    >
                      {msg.message}
                      <div className="span text-right pt-1 text-xs">
                        12:00 PM
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
                handleChange={(e) => {}}
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
