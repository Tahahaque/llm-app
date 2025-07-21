import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface MobileFrameProps {
  children: React.ReactNode;
  backgroundColor: string;
  showBackButton?: boolean;
  showForwardButton?: boolean;
  onBackClick?: () => void;
  onForwardClick?: () => void;
}

const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  backgroundColor,
  showBackButton = false,
  showForwardButton = false,
  onBackClick,
  onForwardClick,
}) => {
  return (
    <div className={`mobile-frame ${backgroundColor}`}>
      {/* Navigation Bar */}
      <div className="mobile-nav-bar">
        <button
          className={`p-2 rounded-full ${showBackButton ? "text-black" : "text-transparent"}`}
          onClick={onBackClick}
          disabled={!showBackButton}
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="mobile-content">{children}</div>
    </div>
  );
};

export default MobileFrame;
