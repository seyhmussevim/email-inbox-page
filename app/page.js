'use client'
// Home.jsx

import React, { useState, useEffect } from 'react';
import RootLayout from './layout';
import Inbox from './componets/Inbox';
import MessageList from './componets/MessageList';
import messagesData from './public/messages.json';

export default function Home() {
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [messages, setMessages] = useState(messagesData);

  const updateUnreadCount = () => {
    const unreadMessages = messages.filter(message => !message.isRead);
    setUnreadCount(unreadMessages.length);
  };

  const markMessageAsReadAndNotifyInbox = () => {
    updateUnreadCount();
  };

  useEffect(() => {
    updateUnreadCount();
  }, [messages]);

  const markMessageAsRead = (messageId) => {
    const updatedMessages = messages.map(message => {
      if (message.id === messageId && !message.isRead) {
        return { ...message, isRead: true };
      }
      return message;
    });

    setMessages(updatedMessages);

    const unreadMessages = updatedMessages.filter(message => !message.isRead);
    setUnreadCount(unreadMessages.length);
  };

  return (
    <RootLayout>
      <div className="flex bg-gray-200">
        <div className="w-40 p-4">
          <Inbox unreadCount={unreadCount} />
        </div>
        <div className="w-2/3 p-4">
          <MessageList
            setSelectedMessageId={setSelectedMessageId}
            markMessageAsRead={markMessageAsRead}
            updateUnreadCount={updateUnreadCount}
            markMessageAsReadAndNotifyInbox={markMessageAsReadAndNotifyInbox}
          />
        </div>
      </div>
    </RootLayout>
  );
}
