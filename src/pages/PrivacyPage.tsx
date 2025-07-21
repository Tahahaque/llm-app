import React from "react";
import { useNavigate } from "react-router-dom";
import MobileFrame from "../components/MobileFrame";
import { motion } from "framer-motion";

const PrivacyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MobileFrame
      backgroundColor="bg-gradient-to-b from-green-500 to-green-300"
      showBackButton={true}
      showForwardButton={true}
      onBackClick={() => navigate("/")}
      onForwardClick={() => navigate("/story")}
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-500 to-green-300 -z-10"></div>

      {/* Animated Header */}
      <motion.h1
        className="text-4xl font-extrabold text-white mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Privacy Matters
      </motion.h1>

      {/* Animated Subheading */}
      <motion.p
        className="text-lg text-white text-center px-8 pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        We value your trust.
      </motion.p>

      {/* Animated Paragraph */}
      <motion.p
        className="text-lg text-white text-center px-8 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        This is why we don’t take or store any data—<br />
        not even your name.
      </motion.p>

      {/* Animated Instructions */}
      <motion.p
        className="text-sm text-white text-center px-8 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        Follow the instructions to create a PDF<br />
        that you can share with your healthcare providers.
      </motion.p>

      {/* Animated Button */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white text-green-500 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-green-100"
          onClick={() => navigate("/story")}
        >
          Continue
        </motion.button>
      </motion.div>
    </MobileFrame>
  );
};

export default PrivacyPage;