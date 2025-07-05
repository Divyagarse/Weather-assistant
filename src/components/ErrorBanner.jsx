// // src/components/ErrorBanner.jsx
// import React from 'react';

// const ErrorBanner = ({ message }) => (
//   <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-2 text-sm">
//     ❌ {message}
//   </div>
// );

// export default ErrorBanner;

import React from 'react';

const ErrorBanner = ({ message }) => (
  <div className="border-t border-gray-200 bg-red-50 px-4 py-3">
    <div className="max-w-3xl mx-auto flex items-center space-x-2">
      <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="text-sm text-red-700">{message}</span>
    </div>
  </div>
);

export default ErrorBanner;