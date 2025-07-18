import { useEffect } from "react";

const ScreenBlocker = ({ visible, message }) => {
  // Disable scroll when visible
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center cursor-not-allowed"
      style={{ pointerEvents: "auto" }}
    >
      <div className="bg-white p-6 rounded-lg shadow-xl pointer-events-auto">
        <div className="flex flex-col items-center space-y-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <p className="text-gray-800">{message}</p>
          <div className="mt-2 text-sm text-gray-500">
            Do not refresh, close, or navigate away
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenBlocker;
