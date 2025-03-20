import React, { useState } from "react";
import axios from "axios";
import styles from "./App.module.css";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const [decryptValue, setDecryptValue] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");

  // Handle encryption
  const handleEncrypt = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/encrypt", {
         data: inputValue,
      });
      setResponseMessage(response.data);
    } catch (error) {
      console.error("Error sending data", error);
      setResponseMessage("Failed to encrypt data");
    }
  };

  // Handle decryption
  const handleDecrypt = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/decrypt", {
         data:decryptValue,      
        
      });
    
      setDecryptedMessage(response.data);

    } catch (error) {
      console.error("Error decrypting data", error);
      setDecryptedMessage("Failed to decrypt data");
    }
    
  };

  return (
    <>
      {/* Logo */}
      <img
        src="https://alnahiya.com/wp-content/uploads/2020/10/Honeywell-logo-large-scaled.jpg"
        alt="Logo"
        className={styles.logo}
      />

      {/* Main Container */}
      <div className={styles.container}>

        {/* Encryption Section */}
        <div className={styles.card}>
          <h2 className={styles.title}>Encrypt Data</h2>
          <form onSubmit={handleEncrypt}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={styles.input}
              placeholder="Enter text to encrypt"
              required
            />
            <button type="submit" className={styles.button}>Encrypt</button>
          </form>
          {responseMessage && (
            <pre className={styles.message}>{JSON.stringify(responseMessage, null, 2)}</pre>
          )}
        </div>

        {/* Decryption Section */}
        <div className={styles.card}>
          <h2 className={styles.title}>Decrypt Data</h2>
          <form onSubmit={handleDecrypt}>
            <input
              type="text"
              value={decryptValue}
              onChange={(e) => setDecryptValue(e.target.value)}
              className={styles.input}
              placeholder="Enter encrypted text"
              required
            />
            <button type="submit" className={styles.button}>Decrypt</button>
          </form>
          {decryptedMessage && (
            <pre className={styles.message}>{JSON.stringify(decryptedMessage, null, 2)}</pre>
          )}
        </div>

      </div>
    </>
  );
};

export default App;
