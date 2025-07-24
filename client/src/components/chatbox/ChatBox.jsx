import React, { useState, useRef, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
// import { BsFillSendFill, BsFillChatDotsFill } from "react-icons/bs";
import "./ChatBox.scss";

const ChatBox = ({ onClose }) => {
  const bottomRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "I can recommend you a model based on your son’s age.",
    },
    { from: "user", text: "He’s 5 years old" },
    {
      from: "bot",
      text: "The 80 pcs model is ideal for kids aged 4 - 6. Is there anything else I can help you with?",
    },
  ]);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Thanks! Our team will get back to you shortly.",
        },
      ]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      <div className="chatbox-wrapper shadow">
        <div className="chatbox-header">
          <div className="chat-title">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
              alt="bot"
            />
            <div>
              <div>
                Chat with <strong>Lyro</strong>
              </div>
              <small className="text-white">● AI Support Agent</small>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="chatbox-body">
          {messages.map((msg, idx) => (
            <div key={idx} className={`msg ${msg.from}`}>
              <div className="bubble">{msg.text}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="chatbox-footer">
          <div className="input-wrapper">
            <Form.Control
              placeholder="Enter your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="send-btn" onClick={handleSend}>
              <i className="bi bi-send-fill fs-5" style={{ color: "#fff" }}></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
