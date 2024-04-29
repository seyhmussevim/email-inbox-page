import React from 'react';
import messages from '../public/messages.json';

const Message = ({ id }) => {
  const selectedMessage = messages.find(message => message.id  === parseInt(id))
  ;

  if (!selectedMessage) {
    return <div>Mesaj bulunamadı.</div>;
  }

  return (
    <div style={{ marginBottom: '20px' }}>
    <h3 className="border-b border-black mb-1">From: {selectedMessage.sent}</h3>
    <h3 className="border-b border-black mb-1">Subject: {selectedMessage.subject}</h3>
    <p> {selectedMessage.content}</p>
  </div>
  
  );
};

export default Message;
