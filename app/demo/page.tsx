"use client";
import React, { useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";

const Page = () => {
  const [name, setName] = useState("Monali");   // alternate: "Karan"
  const [msg, setMsg] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { name: string; msg: string }[]
  >([]);

  const socket = useMemo(() => io("http://localhost:4000"), []);

  useEffect(() => {
    socket.on("chat message", ({ name, msg }) => {
      setChatHistory(prev => [...prev, { name, msg }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = () => {
    if (!msg.trim()) return;
    // Add to local chat history
    setChatHistory(prev => [...prev, { name, msg }]);
    // Emit to server
    socket.emit("chat message", { name, msg });
    setMsg("");
  };
useEffect(() => {
  socket.on("chat message", ({ name, msg }) => {
    setChatHistory(prev => [...prev, { name, msg }]);
  });

  return () => {
    socket.disconnect();
  };
}, [socket]);
  return (
    <div style={{ margin: 20, fontFamily: "sans-serif" }}>
      <h2>Chat App – You are {name}</h2>

      <div style={{
          border: "1px solid #ccc",
          padding: 10,
          height: 200,
          overflowY: "auto",
          marginBottom: 10
        }}>
        {chatHistory.map((c, i) => (
          <div key={i}>
            <strong>{c.name}: </strong>{c.msg}
          </div>
        ))}
      </div>

      <input
        value={msg}
        onChange={e => setMsg(e.target.value)}
        placeholder="Type a message..."
        style={{ width: "70%", marginRight: 8 }}
      />
      <button onClick={sendMessage}>Send</button>

      <div style={{ marginTop: 10 }}>
        <button onClick={() => setName("Monali")}>Use as Monali</button>
        <button onClick={() => setName("Karan")}>Use as Karan</button>
      </div>
    </div>
  );
};

export default Page;
