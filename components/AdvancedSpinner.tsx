import React from "react";

interface AdvancedSpinnerProps {
  size?: number;
  text?: string;
  fullScreen?: boolean;
}

const AdvancedSpinner: React.FC<AdvancedSpinnerProps> = ({ 
  size = 40, 
  text = "در حال پردازش...", 
  fullScreen = false 
}) => {
  const spinnerContent = (
    <div className="flex flex-col items-center justify-center gap-3">
      {/* اسپینر مدرن با چند دایره */}
      <div className="relative" style={{ width: size, height: size }}>
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div 
          className="absolute inset-0 rounded-full border-4 border-t-indigo-500 border-r-indigo-500 border-b-transparent border-l-transparent animate-spin"
          style={{ borderWidth: size / 10 }}
        ></div>
        <div 
          className="absolute inset-2 rounded-full border-2 border-t-pink-300 border-r-transparent border-b-pink-300 border-l-transparent animate-spin animation-delay-300"
          style={{ borderWidth: size / 15, animationDuration: "0.8s" }}
        ></div>
      </div>
      {text && (
        <p className="text-white text-sm font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/25 backdrop-blur-2xl flex items-center justify-center z-50">
        <div className="bg-zinc-800 font-bold rounded-2xl p-8 shadow-2xl">
          {spinnerContent}
        </div>
      </div>
    );
  }

  return spinnerContent;
};

export default AdvancedSpinner;