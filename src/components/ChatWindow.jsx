
// import React, { useEffect, useRef } from 'react';
// import Message from './Message';
// import MessageInput from './MessageInput';
// import LoadingSpinner from './LoadingSpinner';
// import ErrorBanner from './ErrorBanner';

// const ChatWindow = ({ messages, onSend, loading, error }) => {
//   const scrollRef = useRef(null);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   return (
//     <div className="flex flex-col h-screen w-full bg-gradient-to-br from-blue-50 to-blue-100">
//       <header className="bg-grey-600 text-black text-xl font-semibold px-6 py-4 shadow-md">
//         🌤️ Weather Chat Agent
//       </header>

//       <main className="flex-1 overflow-y-auto px-4 py-3 space-y-3 max-w-2xl mx-auto w-full">
//         {messages.map((msg, index) => (
//           <Message key={index} content={msg.content} role={msg.role} />
//         ))}
//         <div ref={scrollRef} />
//       </main>

//       {loading && <LoadingSpinner />}
//       {error && <ErrorBanner message={error} />}

//       <footer className="bg-white p-3 shadow-inner max-w-2xl mx-auto w-full">
//         <MessageInput onSend={onSend} disabled={loading} />
//       </footer>
//     </div>
//   );
// };

// export default ChatWindow;



import React, { useEffect, useRef } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import LoadingSpinner from './LoadingSpinner';
import ErrorBanner from './ErrorBanner';

const ChatWindow = ({ messages, onSend, loading, error }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  {messages.map((msg, index) => (
  <Message 
    key={index} 
    content={msg.content} 
    role={msg.role} 
    timestamp={msg.timestamp} // ADD THIS
  />
))}

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-lg font-medium mb-2">How can I help you today?</p>
              <p className="text-sm">Ask me about weather conditions, forecasts, or any weather-related questions.</p>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {messages.map((msg, index) => (
              <Message key={index} content={msg.content} role={msg.role} />
            ))}
            {loading && <LoadingSpinner />}
            <div ref={scrollRef} />
          </div>
        )}
      </div>

      {/* Error Banner */}
      {error && <ErrorBanner message={error} />}

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <div className="max-w-3xl mx-auto">
          <MessageInput onSend={onSend} disabled={loading} />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;