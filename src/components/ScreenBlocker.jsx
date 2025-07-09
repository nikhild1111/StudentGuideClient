  const ScreenBlocker = ({ visible, message }) => {
    if (!visible) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <div className="flex flex-col items-center space-x-3">
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



