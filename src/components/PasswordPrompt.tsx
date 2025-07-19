import React, { useState, useEffect, useRef } from "react";
import { usePassword } from "../contexts/PasswordContext";
import "./PasswordPrompt.css";

export default function PasswordPrompt() {
  const { login } = usePassword();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Autofocus the input when modal appears
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle click outside modal content
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      window.history.back();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(input)) {
      setError("Incorrect password. Try again.");
      setInput("");
      inputRef.current?.focus();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.4)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={handleOverlayClick}
    >
      <div
        className="password-modal-content"
        onClick={e => e.stopPropagation()}
      >
        <p>This is a password protected page.<br />
        Please enter password to access this page's content. If you don't have the password, <a href="/#contact">contact me</a>.</p>
        <form className="password-modal-form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Password"
            className="password-modal-input"
          />
          <button type="submit" className="password-modal-button">Enter</button>
        </form>
        {error && <div style={{ color: "red", marginTop: "1rem" }}>{error}</div>}
      </div>
    </div>
  );
} 