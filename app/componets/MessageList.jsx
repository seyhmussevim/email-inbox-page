import React, { useState, useEffect } from 'react';
import messagesData from '../public/messages.json';
import Notifications from './Notifications';
import Profile from '../svg/Profile';
import Mail from '../svg/Mail';

const MessageListItem = ({ id, subject, sent, isRead, setSelectedMessageId, markMessageAsRead }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleShowMessage = () => {
    setSelectedMessageId(id);
    markMessageAsRead(id); 
  };

  return (
    <div
      style={{
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '20px',
        backgroundColor: isRead ? 'white' : 'lightgrey',
        padding: '10px',
        cursor: 'pointer'
      }}
      onClick={handleShowMessage}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Profile />
      <h3 style={{ marginLeft: '10px', marginRight: '10px' }}>{sent}</h3> 
      <Mail /> 
      <h3 style={{ marginLeft: '10px', marginRight: '10px' }}>{subject}</h3> 
      {isRead && <p style={{ marginLeft: '10px' }}>(Read)</p>} 
    </div>
  );
};

const MessageList = ({ updateUnreadCount, markMessageAsReadAndNotifyInbox }) => {
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [messages, setMessages] = useState(messagesData);

  useEffect(() => {
    updateUnreadCount();
  }, [selectedMessageId]);

  const markMessageAsRead = (messageId) => {
    const updatedMessages = messages.map((message) => {
      if (message.id === messageId && !message.isRead) {
        return { ...message, isRead: true };
      }
      return message;
    });

    setMessages(updatedMessages);
    if (updatedMessages.every((message) => message.isRead)) {
      updateUnreadCount(); 
      markMessageAsReadAndNotifyInbox(); 
    }
  };

  return (
    <div className="flex">
      <div className="w-3/4 p-4 bg-white rounded-md" style={{ width: selectedMessageId ? '75%' : '100%', transition: 'width 0.5s' }}>
        {messages.map((message) => (
          <MessageListItem 
            key={message.id}
            {...message}
            setSelectedMessageId={setSelectedMessageId}
            isActive={selectedMessageId === message.id}
            markMessageAsRead={markMessageAsRead}
          />
        ))}
      </div>
      <div className="w-1/4 p-4 rounded-md" style={{ transition: 'width 0.5s', backgroundColor: 'whitesmoke', minWidth: '300px', maxWidth: '500px' }}>
        {selectedMessageId && <Notifications id={selectedMessageId} />}
        
      </div>
    </div>
  );
};

export default MessageList;
