
// import React, { useState } from 'react';

// const MessageInput = ({ onSend, disabled }) => {
//   const [text, setText] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!text.trim()) return;
//     onSend(text);
//     setText('');
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex gap-2">
//       <input
//         type="text"
//         placeholder="Type your message..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         className="flex-1 p-2 rounded border focus:outline-none"
//         disabled={disabled}
//       />
//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-4 rounded disabled:opacity-50"
//         disabled={disabled}
//       >
//         Send
//       </button>
//     </form>
//   );
// };

// export default MessageInput;


// import React, { useState } from 'react';

// const MessageInput = ({ onSend, disabled }) => {
//   const [text, setText] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!text.trim()) return;
//     onSend(text);
//     setText('');
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex gap-2">
//       <input
//         type="text"
//         placeholder="Type your message..."
//         className="flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         disabled={disabled}
//       />
//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
//         disabled={disabled}
//       >
//         Send
//       </button>
//     </form>
//   );
// };

// export default MessageInput;



// import React, { useState } from 'react';

// const MessageInput = ({ onSend, disabled }) => {
//   const [text, setText] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!text.trim()) return;
//     onSend(text);
//     setText('');
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex gap-2">
//       <input
//         type="text"
//         placeholder="Type your message..."
//         className="flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         disabled={disabled}
//       />
//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
//         disabled={disabled}
//       >
//         Send
//       </button>
//     </form>
//   );
// };

// export default MessageInput;


// // src/components/MessageInput.js
// import React, { useState } from 'react';

// const MessageInput = ({ onSend, disabled }) => {
//   const [text, setText] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!text.trim()) return;
//     onSend(text);
//     setText('');
//   };

//   return (
//     // <form onSubmit={handleSubmit} className="flex gap-2">
//     //   <input
//     //     type="text"
//     //     placeholder="Type your message..."
//     //     className="flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//     //     value={text}
//     //     onChange={(e) => setText(e.target.value)}
//     //     disabled={disabled}
//     //   />
//     //   <button
//     //     type="submit"
//     //     className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
//     //     disabled={disabled}
//     //   >
//     //     Send
//     //   </button>
//     // </form>
//     <form
//   onSubmit={handleSubmit}
//   className="flex items-center gap-3 px-4 py-3 bg-white shadow-md rounded-full"
// >
//   <input
//     type="text"
//     placeholder="Type your message..."
//     className="flex-1 px-4 py-2 text-sm border-none rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
//     value={text}
//     onChange={(e) => setText(e.target.value)}
//     disabled={disabled}
//   />


//   <button
//     type="submit"
//     className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-sm font-medium rounded-full transition disabled:opacity-50"
//     disabled={disabled}
//   >
//     Send
//   </button>
// </form>

//   );
// };

// export default MessageInput;
import React, { useState } from 'react';

const MessageInput = ({ onSend, disabled }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Send a message..."
          className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-500 resize-none border-none outline-none bg-transparent min-h-[24px] max-h-32"
          style={{ fontFamily: 'inherit' }}
          disabled={disabled}
          rows="1"
        />
        <button
          type="submit"
          disabled={disabled || !text.trim()}
          className="p-2 mr-2 text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default MessageInput;