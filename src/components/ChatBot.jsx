import { useState, useEffect, useRef } from "react";

function ChatBot({ onSendMessage = () => {} }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm your trading assistant. Ask me about stocks, portfolio, or tutorials!",
    },
  ]);
  const [input, setInput] = useState("");
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userInput) => {
    const lower = userInput.toLowerCase();

    if (lower.includes("what is stock trading") || lower.includes("explain stock trading")) {
      return "Stock trading means buying and selling shares of companies through a stock exchange, aiming to make a profit.";
    } else if (lower.includes("what is trading")) {
      return "Trading is the act of buying and selling financial assets like stocks, bonds, or cryptocurrencies to make profits.";
    } else if (
      lower.includes("how can we buy") ||
      lower.includes("how to buy") ||
      lower.includes("how do i buy") ||
      lower.includes("buy or sell stocks")
    ) {
      return "You can buy or sell stocks in this app by going to the 'Stocks' page, selecting a stock, and choosing the quantity.";
    } else if (
      lower.includes("explain stock") ||
      lower.includes("what is a stock") ||
      lower.includes("what are stocks") ||
      lower.includes("what is stocks")
    ) {
      return "A stock represents ownership in a company. When you own a stock, you're a partial owner of that company.";
    } else if (lower.includes("portfolio")) {
      return "Your portfolio shows all the stocks you currently own. Go to the 'Portfolio' page to view or manage them.";
    } else if (lower.includes("tutorial")) {
      return "Check out the 'Tutorial' page in the app. It guides you through how to trade, invest, and use this platform.";
    } else if (lower.includes("hi") || lower.includes("hello")) {
      return "Hello! Ask me about trading, portfolios, or how to use this app.";
    } else {
      return "I'm not sure how to help with that. Try asking about trading, stocks, portfolios, or tutorials!";
    }
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = { sender: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);

    onSendMessage(trimmed); // callback for parent (optional)

    const botReply = generateBotResponse(trimmed);
    const botMessage = { sender: "bot", text: botReply };

    // Simulate response delay
    setTimeout(() => {
      setMessages((prev) => [...prev, botMessage]);
    }, 400);

    setInput("");
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "80px",
        right: "20px",
        width: "320px",
        height: "420px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        zIndex: 1001,
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          marginBottom: "10px",
          paddingRight: "5px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                maxWidth: "75%",
                padding: "10px 14px",
                borderRadius: "16px",
                backgroundColor: msg.sender === "user" ? "#007bff" : "#f1f1f1",
                color: msg.sender === "user" ? "#fff" : "#333",
                fontSize: "14px",
                lineHeight: "1.4",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Ask something..."
          style={{
            flex: 1,
            padding: "8px 10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: "8px 12px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
