import React, { useState } from "react";
import axios from "axios";
import styles from "./App.module.css";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/encrypt", {
        data: inputValue,
      });
      setResponseMessage(response.data);
    } catch (error) {
      console.error("Error sending data", error);
      setResponseMessage("Failed to send data");
    }
  };

  return (
    <>
    <img src={"https://alnahiya.com/wp-content/uploads/2020/10/Honeywell-logo-large-scaled.jpg"} alt="Logo" className={styles.logo} />
      
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Send a String</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={styles.input}
            placeholder="Enter a string"
            required
          />
          <button
            type="submit"
            className={styles.button}
          >
            Send
          </button>
        </form>
        {responseMessage && (
          <pre className={styles.message}>{JSON.stringify(responseMessage, null, 2)}</pre>
        )}
      </div>
      </div>
      </>
  );
};

export default App;
