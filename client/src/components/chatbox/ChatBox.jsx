import React, { useState, useRef, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
// import { BsFillSendFill, BsFillChatDotsFill } from "react-icons/bs";
import "./ChatBox.scss";
import chat from "../../assets/image/logoicon/chat.webp";

const ChatBox = ({ onClose }) => {
  const bottomRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?",
    },
  ]);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(false);

  //   const handleSend = async () => {
  //     if (!input.trim()) return;

  //     const userMessage = input;
  //     setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
  //     setInput("");

  //     const botReply = await fetchGeminiResponse(userMessage);
  //     setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
  //   };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");

    setIsTyping(true);

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }],
        }),
      });

      const result = await response.json();
      const reply =
        result?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Xin lỗi, tôi chưa hiểu yêu cầu của bạn.";

      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch (err) {
      console.error("Lỗi API:", err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Đã xảy ra lỗi. Vui lòng thử lại sau." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <div className="chatbox-wrapper shadow">
        <div className="chatbox-header">
          <div className="chat-title">
            <img src={chat} alt="bot" />
            <div>
              <div>Hỗ trợ người dùng</div>
            </div>
          </div>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Close chat"
          >
            &times;
          </button>
        </div>

        <div className="chatbox-body">
          {messages.map((msg, idx) => (
            <div key={idx} className={`msg ${msg.from}`}>
              <div className="bubble">{msg.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="msg bot">
              <div className="bubble typing">Đang nhập ...</div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="chatbox-footer">
          <div className="input-wrapper">
            <Form.Control
              placeholder="Nhập tin nhắn..."
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
