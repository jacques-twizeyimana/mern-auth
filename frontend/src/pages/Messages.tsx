import { useEffect, useState } from "react";
import ChatMessages from "../components/molecules/ChatMessages";
import { BASE_URL } from "../services/axios";
import { userService } from "../services/user.service";
import { UserInfo } from "../types/services/users.types";

export default function Messages() {
  const [isLoading, setisLoading] = useState(true);
  const [selectedContact, setselectedContact] = useState<string | undefined>(
    undefined
  );
  const [contacts, setcontacts] = useState<UserInfo[]>([]);
  useEffect(() => {
    userService
      .getAllAdmins()
      .then((resp) => setcontacts(resp.data.data))
      .catch((err) => console.error(err))
      .finally(() => setisLoading(false));
  }, []);

  return (
    <div className="bg-gray-200">
      <div className="h-90vh grid  lg:w-4/5 mx-auto grid-cols-6">
        <div className="contacts shadow-lg shadow-gray-300 bg-white col-span-2 h-full border-2-r py-2 overflow-y-auto">
          <h2 className="text-xl font-semibold px-8 py-8 text-gray-800">
            Message admins
          </h2>
          {isLoading
            ? [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="py-2 my-2 flex items-center gap-2 px-6 "
                >
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="block w-full">
                    <div className="h-4 bg-gray-200 mb-2" />
                    <div className="h-4 bg-gray-200" />
                  </div>
                </div>
              ))
            : contacts.map((contact) => (
                <div
                  onClick={() => setselectedContact(contact._id)}
                  key={contact._id}
                  className={`${
                    selectedContact === contact._id
                      ? "bg-gray-300"
                      : "bg-transparent"
                  } py-2 flex items-center gap-2 px-6 cursor-pointer`}
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={BASE_URL + contact.profileImage}
                  />
                  <div>
                    <p className="text-base">{`${contact.firstName} ${contact.lastName}`}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
        </div>
        <div className="messages col-span-4 bg-gray-100 h-full">
          <ChatMessages receiver={selectedContact} />
        </div>
      </div>
    </div>
  );
}
