

// const Message = ({ content, role }) => {
//   const isUser = role === 'user';
//   const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//   return (
//     <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} px-2`}>
//       <div
//         className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg text-sm shadow 
//         ${isUser ? 'bg-blue-500 text-white' : 'bg-white text-black border'}`}
//       >
//         <p className="whitespace-pre-wrap">{content}</p>
//         <span className="block text-xs text-gray-400 text-right mt-1">{time}</span>
//       </div>
//     </div>
//   );
// };

// export default Message;


// import React from 'react';

// const Message = ({ content, role }) => {
//   const isUser = role === 'user';
//   const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//   return (
//     <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
//       <div
//         className={`p-3 rounded-xl max-w-sm md:max-w-md shadow-sm ${
//           isUser
//             ? 'bg-blue-500 text-white rounded-br-none'
//             : 'bg-white text-gray-900 rounded-bl-none border'
//         }`}
//       >
//         <p className="whitespace-pre-wrap">{content}</p>
//         <div className="text-xs text-gray-400 mt-1 text-right">{time}</div>
//       </div>
//     </div>
//   );
// };

// export default Message;



// // src/components/Message.js
// import React from 'react';

// const Message = ({ content, role }) => {
//   const isUser = role === 'user';
//   const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//   return (
//     // <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
//     //   <div
//     //     className={`p-3 rounded-xl max-w-sm md:max-w-md shadow-sm ${
//     //       isUser
//     //         ? 'bg-blue-500 text-white rounded-br-none'
//     //         : 'bg-white text-gray-900 rounded-bl-none border'
//     //     }`}
//     //   >
//     //     <p className="whitespace-pre-wrap">{content}</p>
//     //     <div className="text-xs text-gray-400 mt-1 text-right">{time}</div>
//     //   </div>
//     // </div>
//     <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} px-4`}>
//   <div
//     className={`p-4 max-w-sm md:max-w-md rounded-2xl shadow-md transition-all duration-200 ${
//       isUser
//         ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-none'
//         : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'
//     }`}
//   >
//     <p className="whitespace-pre-wrap text-sm leading-relaxed">{content}</p>
//     <div className="text-xs text-gray-400 mt-1 text-right">{time}</div>
//   </div>
// </div>

//   );
// };

// export default Message;


// import React from 'react';

// const Message = ({ content, role }) => {
//   const isUser = role === 'user';
  
//   return (
//     <div className={`py-6 px-4 ${isUser ? 'bg-white' : 'bg-gray-50'}`}>
//       <div className="max-w-3xl mx-auto flex space-x-4">
//         {/* Avatar */}
//         <div className="flex-shrink-0">
//           <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
//             isUser ? 'bg-gray-700' : 'bg-green-600'
//           }`}>
//             {isUser ? 'U' : 'AI'}
//           </div>
//         </div>
        
//         {/* Message Content */}
//         <div className="flex-1 space-y-1">
//           <div className="text-sm font-medium text-gray-900">
//             {isUser ? 'You' : 'Weather Assistant'}
//           </div>
//           <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
//             {content}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Message;




// const Message = ({ content, role, timestamp }) => {
//   const isUser = role === 'user';
  
//   // Format timestamp function
//   const formatTime = (timestamp) => {
//     if (!timestamp) return '';
    
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diffInHours = (now - date) / (1000 * 60 * 60);
    
//     if (diffInHours < 24) {
//       // Show time if within 24 hours
//       return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     } else {
//       // Show date and time if older than 24 hours
//       return date.toLocaleDateString([], { 
//         month: 'short', 
//         day: 'numeric', 
//         hour: '2-digit', 
//         minute: '2-digit' 
//       });
//     }
//   };
  
//   return (
//     <div className={`py-6 px-4 ${isUser ? 'bg-white' : 'bg-gray-50'}`}>
//       <div className={`max-w-3xl mx-auto flex space-x-4 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
//         {/* Avatar */}
//         <div className="flex-shrink-0">
//           <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
//             isUser ? 'bg-gray-700' : 'bg-green-600'
//           }`}>
//             {isUser ? 'U' : 'AI'}
//           </div>
//         </div>
        
//         {/* Message Content */}
//         <div className={`flex-1 space-y-1 ${isUser ? 'text-right' : 'text-left'}`}>
//           <div className={`flex items-center space-x-2 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
//             <div className="text-sm font-medium text-gray-900">
//               {isUser ? 'You' : 'Weather Assistant'}
//             </div>
//             {timestamp && (
//               <div className="text-xs text-gray-500">
//                 {formatTime(timestamp)}
//               </div>
//             )}
//           </div>
//           <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
//             {content}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Message;

// Message.js - Updated with visible timestamps
const Message = ({ content, role, timestamp }) => {
  const isUser = role === 'user';
  
  // Enhanced format timestamp function
  const formatTime = (timestamp) => {
    if (!timestamp) return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const date = new Date(timestamp);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      // Show time if within 24 hours
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      // Show date and time if older than 24 hours
      return date.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  };
  
  return (
    <div className={`py-6 px-4 ${isUser ? 'bg-white' : 'bg-gray-50'}`}>
      <div className={`max-w-3xl mx-auto flex space-x-4 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
            isUser ? 'bg-gray-700' : 'bg-green-600'
          }`}>
            {isUser ? 'U' : 'AI'}
          </div>
        </div>
        
        {/* Message Content */}
        <div className={`flex-1 space-y-1 ${isUser ? 'text-right' : 'text-left'}`}>
          <div className={`flex items-center gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
            <div className="text-sm font-medium text-gray-900">
              {isUser ? 'You' : 'Weather Assistant'}
            </div>
            {/* Always show timestamp - this was the main issue */}
            <div className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">
              {formatTime(timestamp)}
            </div>
          </div>
          <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;