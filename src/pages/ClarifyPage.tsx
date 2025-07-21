// src/pages/ClarifyPage.tsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MobileFrame from "../components/MobileFrame";
import { generateReport, submitAnswer } from "../lib/api";
import { motion } from "framer-motion";

const ClarifyPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state: {
    question: string;
    question_count: number;
  } = location.state;
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await submitAnswer(answer.trim());
      if (state.question_count < 7 && res.status === "followup_question") {
        navigate("/clarify", {
          state: {
            question: res.question,
            question_count: state.question_count + 1,
          },
        });
      } else {
        navigate("/report");
      }
    } catch (err) {
      console.error("❌ Error submitting answer:", err);
      alert("Something went wrong while generating the report.");
    } finally {
      setLoading(false);
      setAnswer("");
    }
  };

  return (
    <MobileFrame
      backgroundColor="bg-gradient-to-b from-purple-500 to-purple-300"
      showBackButton={true}
      showForwardButton={!!answer.trim()}
      onBackClick={() => navigate("/story")}
      onForwardClick={handleSubmit}
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500 to-purple-300 -z-10"></div>

      {/* Animated Header */}
      <motion.h1
        className="text-4xl font-extrabold text-white mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Can you please clarify:
      </motion.h1>

      {/* Animated Question */}
      <motion.h2
        className="text-2xl font-semibold text-white mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {state.question}
      </motion.h2>

      {/* Answer Input */}
      <motion.div
        className="w-full max-w-xs mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here!"
          className="w-full p-4 rounded-lg shadow-lg text-gray-700"
        />
      </motion.div>

      {/* Submit Button */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white text-purple-500 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-purple-100"
          onClick={handleSubmit}
          disabled={!answer.trim() || loading}
        >
          {loading ? "Submitting..." : "Confirm"}
        </motion.button>
      </motion.div>
    </MobileFrame>
  );
};

export default ClarifyPage;
