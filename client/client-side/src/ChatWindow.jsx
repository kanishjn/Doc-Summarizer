import Display from './Display.jsx'
import { useEffect, useRef } from 'react';

function ChatWindow({ messages }) {
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className='chatWindow' ref={chatRef}>
      {messages.map((msg, index) => (
        <Display key={index} sender={msg.sender} text={msg.text} />
      ))}
    </div>
  );
}

export default ChatWindow;
