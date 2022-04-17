import { useState } from "react";

interface IProps {
  receiver?: string;
}

export default function ChatMessages({ receiver }: IProps) {
  const [isLoading, setisLoading] = useState(true);

  return (
    <div className="h-full">
      {!receiver && (
        <div className="flex justify-center items-center h-full">
          <p>No contact selected</p>
        </div>
      )}
    </div>
  );
}
