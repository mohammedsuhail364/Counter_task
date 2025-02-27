import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Confetti from "react-confetti";


export default function CounterApp() {
  const [counter, setCounter] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [prizes, setPrizes] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial data from the API
    const fetchData = async () => {
      try {
        const res = await axios.get("https://counter-task-d14r.onrender.com/api/user");
        setCounter(res.data.counter);
        setBonus(res.data.bonus);
        setPrizes(res.data.prizes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Ensure loading is set to false even if there's an error
      }
    };

    fetchData();
  }, []);

  const handleClick = async () => {
    try {
      const res = await axios.post("https://counter-task-d14r.onrender.com/api/update");
      setCounter(res.data.counter);
      setBonus(res.data.bonus);
      setPrizes(res.data.prizes);
      setMessage(res.data.message);
      if (res.data.prizes > prizes) {
        // Trigger confetti or other effects
      }
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error updating counter:", error);
    }
  };

  const handleReset = async () => {
    try {
      const res = await axios.post("https://counter-task-d14r.onrender.com/api/reset");
      setCounter(0);
      setBonus(0);
      setPrizes(0);
      setMessage(res.data.message);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error resetting counter:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 sm:p-6 font-sans">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-black animate-gradient-x"></div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-5xl sm:text-7xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-lg"
      >
        Reward Counter
      </motion.h1>

      {/* Click Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        className="px-10 sm:px-12 py-4 sm:py-5 bg-opacity-20 backdrop-blur-md bg-gray-700 border border-gray-500 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-400/50 rounded-full text-2xl sm:text-3xl font-bold text-white transition-all duration-300"
        onClick={handleClick}
      >
        Click Me!
      </motion.button>

      {/* Reset Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        className="mt-4 px-8 sm:px-10 py-3 sm:py-4 bg-opacity-20 backdrop-blur-md bg-red-700 border border-red-500 hover:border-red-400 hover:shadow-lg hover:shadow-red-400/50 rounded-full text-xl sm:text-2xl font-bold text-white transition-all duration-300"
        onClick={handleReset}
      >
        Reset
      </motion.button>

      {/* Stats Card */}
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8 text-lg text-gray-400"
        >
          Loading...
        </motion.div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="mt-8 bg-gray-800 bg-opacity-40 p-8 sm:p-10 rounded-2xl shadow-xl text-center w-full sm:w-96 border border-gray-600 hover:border-blue-400 transition-all duration-300"
        >
          <p className="text-4xl sm:text-5xl font-bold text-green-300 animate-pulse">
            {counter}
          </p>
          <p className="text-lg sm:text-xl mt-4 text-yellow-400">
            Bonus Points: <span className="font-semibold">{bonus}</span>
          </p>
          <p className="text-lg sm:text-xl mt-4 text-pink-400">
            Prizes Won: <span className="font-semibold">{prizes}</span>
          </p>
        </motion.div>
      )}

      {/* Message Popup */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="mt-6 text-lg sm:text-xl bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-md border border-green-300"
        >
          {message}
        </motion.div>
      )}

      {/* Confetti */}
      {prizes > 0 && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={300}
          recycle={false}
          colors={["#3B82F6", "#8B5CF6", "#EC4899", "#10B981"]}
        />
      )}
    </div>
  );
}