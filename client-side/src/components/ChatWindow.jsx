import Display from './Display.jsx'
import { useEffect, useRef } from 'react';

function ChatWindow({ messages }) {
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
      //scrollTop is a property representing how far the content inside the element is scrolled vertically — basically, how far the scrollbar is from the top.
      //scrollHeight is the total height of the content inside the element — including the part you can't see without scrolling.
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
