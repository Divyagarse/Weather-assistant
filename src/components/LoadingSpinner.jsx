// // src/components/LoadingSpinner.jsx
// import React from 'react';  

// const LoadingSpinner = () => (
//   <div className="flex justify-center items-center my-2">
//     <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
//     <span className="ml-2 text-sm text-gray-500">Agent is typing...</span>
//   </div>
// );

// export default LoadingSpinner;
import React from 'react';

const LoadingSpinner = () => (
  <div className="py-6 px-4 bg-gray-50">
    <div className="max-w-3xl mx-auto flex space-x-4">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-medium">
          AI
        </div>
      </div>
      
      {/* Loading Content */}
      <div className="flex-1 space-y-1">
        <div className="text-sm font-medium text-gray-900">
          Weather Assistant
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-sm text-gray-500">Thinking...</span>
        </div>
      </div>
    </div>
  </div>
);

export default LoadingSpinner;