import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      inputRef.current.select();
      buttonRef.current.classList.add("copied");
      setTimeout(() => {
        buttonRef.current.classList.remove("copied");
      }, 300);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-md bg-gray-800 text-orange-500 shadow-md rounded-lg p-6">
        <h1 className="text-2xl text-white text-center mb-6 font-semibold">Password Generator</h1>
        
        <div className="flex mb-6">
          <input 
            ref={inputRef}
            type="text" 
            value={password}
            className="flex-1 py-2 px-4 text-center bg-gray-700 text-white rounded-l-md outline-none transition-all duration-300"
            placeholder="Your Secure Password"
            readOnly
          />
          <button 
            ref={buttonRef}
            onClick={handleCopy} 
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-all duration-300 focus:outline-none"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <label className="text-white w-24">Length:</label>
            <input 
              type="range"
              min={6}
              max={32}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="flex-1 cursor-pointer"
            />
            <span className="text-white ml-4">{length}</span>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-white">
              <input 
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed(prev => !prev)}
                className="mr-2 h-4 w-4 accent-orange-500"
              />
              Include Numbers
            </label>

            <label className="flex items-center text-white">
              <input 
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed(prev => !prev)}
                className="mr-2 h-4 w-4 accent-orange-500"
              />
              Include Symbols
            </label>
          </div>

          <button 
            onClick={passwordGenerator}
            className="w-full bg-orange-500 text-white py-2 mt-4 rounded-md hover:bg-orange-600 transition-colors duration-300 focus:outline-none"
          >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
