import React, { useState, useEffect } from 'react';
import messagesData from '../public/messages.json';
import Notifications from './Notifications';
import Profile from '../svg/Profile';
import Mail from '../svg/Mail';

const MessageListItem = ({ id, subject,sent, isRead, setSelectedMessageId, isActive, markMessageAsRead }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleShowMessage = () => {
    setSelectedMessageId(id);
    markMessageAsRead(id); // Mesajı okundu olarak işaretle
  };

  return (
    <div
    style={{
      display: 'flex', // Yan yana düzenlemek için flex kullan
      alignItems: 'center', // İçeriği dikey olarak hizala
      marginBottom: '20px',
      backgroundColor: isActive ? 'lightgrey' : isHovered || !isRead ? 'lightgrey' : 'white',
      padding: '10px',
      cursor: 'pointer'
    }}
    onClick={handleShowMessage}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <Profile /> {/* Profile bileşeni */}
    <h3 style={{ marginLeft: '10px', marginRight: '10px' }}>{sent}</h3> {/* Sent bilgisi */}
    <Mail /> {/* Mail bileşeni */}
    <h3 style={{ marginLeft: '10px', marginRight: '10px' }}>{subject}</h3> {/* Subject bilgisi */}
    {isRead && <p style={{ marginLeft: '10px' }}>(Read)</p>} {/* Okundu ise bilgi */}
  </div>
  
  ) 
};

const MessageList = ({ updateUnreadCount, markMessageAsReadAndNotifyInbox }) => {
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [messages, setMessages] = useState(messagesData);

  useEffect(() => {
    updateUnreadCount();
  }, [selectedMessageId]);

  const markMessageAsRead = (messageId) => {
    const updatedMessages = messages.map(message => {
      if (message.id === messageId && !message.isRead) {
        return { ...message, isRead: true };
      }
      return message;
    });

    setMessages(updatedMessages);
    if (updatedMessages.every(message => message.isRead)) {
      updateUnreadCount(); // Okunmamış mesaj sayısını güncelle
      markMessageAsReadAndNotifyInbox(); // Inbox bileşenini güncelle
    }
  };

  return (
    <div className="flex">
      <div className="w-3/4 p-4 bg-white rounded-md" style={{ width: selectedMessageId ? '75%' : '100%', transition: 'width 0.5s' }}>
        {messages.map(message => (
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
