

import React from "react";
import Mail from "../svg/Mail.jsx"


const Inbox = ({ unreadCount }) => {
  return (
  <div className="relative justify-center items-center px-2 ">
    <h2 className="flex px-2  py-10 text-xl font-semibold mb-4">
    <Mail className="px-3"/> Inbox
    </h2>
    <button
        className="bg-blue-500  text-white px-2 py-1 rounded-full absolute right-1 top-9">
        <span className="text-sm border-md">{unreadCount}</span>
    </button>
</div>
  );
};

export default Inbox;
