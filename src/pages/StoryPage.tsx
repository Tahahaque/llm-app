import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileFrame from "../components/MobileFrame";
import { submitStory } from "../lib/api";
import { motion } from "framer-motion";

const StoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!story.trim()) return;

    setLoading(true);
    try {
      const res = await submitStory(story.trim());
      console.log("✅ Backend response:", res);

      if (res.status === "followup_question" && res.question) {
        navigate("/clarify", {
          state: {
            question: res.question,
            question_count: 1,
          },
        });
      } else if (res.status === "complete" && res.pdf_path) {
        navigate("/report");
      } else {
        console.warn("⚠️ Unexpected backend response:", res);
      }
    } catch (err) {
      console.error("❌ Error submitting:", err);
      alert("Something went wrong submitting your story.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileFrame
      backgroundColor="bg-gradient-to-b from-pink-500 to-pink-300"
      showBackButton={true}
      showForwardButton={!!story.trim()}
      onBackClick={() => navigate("/privacy")}
      onForwardClick={handleSubmit}
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-500 to-pink-300 -z-10"></div>

      {/* Animated Header */}
      <motion.h1
        className="text-4xl font-extrabold text-white mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Let's get started!
      </motion.h1>

      {/* Animated Subheading */}
      <motion.h2
        className="text-lg text-white text-center px-8 pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Tell me your story.
      </motion.h2>

      {/* Story Input */}
      <motion.div
        className="w-full max-w-xs mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Type your story here!"
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
          className="bg-white text-pink-500 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-pink-100"
          onClick={handleSubmit}
          disabled={!story.trim() || loading}
        >
          {loading ? "Submitting..." : "Confirm"}
        </motion.button>
      </motion.div>
    </MobileFrame>
  );
};

export default StoryPage;
