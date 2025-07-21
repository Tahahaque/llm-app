import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MobileFrame from "../components/MobileFrame";
import { motion } from "framer-motion";

const ReportPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state: {
    pdf_path: string;
  } = location.state;

  const handleViewReport = () => {
    window.open("/api/generate_report", "_blank");
  };

  return (
    <MobileFrame
      backgroundColor="bg-gradient-to-b from-green-500 to-green-300"
      showBackButton={true}
      onBackClick={() => navigate("/clarify")}
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
        Here you go,
      </motion.h1>

      {/* Animated Subheading */}
      <motion.h2
        className="text-2xl font-semibold text-white mb-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Your report is ready!
      </motion.h2>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white text-blue-500 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-blue-100"
          onClick={handleViewReport}
        >
          View now!
        </motion.button>
      </motion.div>
    </MobileFrame>
  );
};

export default ReportPage;
