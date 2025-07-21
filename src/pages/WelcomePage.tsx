import React from "react";
import { useNavigate } from "react-router-dom";
import MobileFrame from "../components/MobileFrame";
import { motion } from "framer-motion";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MobileFrame
      backgroundColor="bg-gradient-to-b from-blue-500 to-blue-300"
      showForwardButton={false} // Hide forward button for a custom button
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-300 -z-10"></div>

      {/* Animated Header */}
      <motion.h1
        className="text-4xl font-extrabold text-white mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to PatientStory
      </motion.h1>

      {/* Animated Subheading */}
      <motion.p
        className="text-lg text-white text-center px-8 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        A quick and effective way to explain your symptoms to healthcare providers.
      </motion.p>

      {/* Animated Button */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white text-blue-500 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-blue-100"
          onClick={() => navigate("/privacy")}
        >
          Get Started!
        </motion.button>
      </motion.div>
    </MobileFrame>
  );
};

export default WelcomePage;