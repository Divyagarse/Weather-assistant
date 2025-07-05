


// // src/App.js
// import React, { useState } from 'react';
// import ChatWindow from './components/ChatWindow';
// import { fetchWeatherResponseStream } from './utils/api';

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const threadId = 'TU4S2223005'; // Your roll number

//   const handleSend = async (text) => {
//     if (!text.trim()) return;

//     const userMsg = { role: 'user', content: text };
//     setMessages((prev) => [...prev, userMsg]);
//     setLoading(true);
//     setError('');

//     let botMsg = { role: 'agent', content: '' };
//     setMessages((prev) => [...prev, botMsg]);

//     try {
//       // await fetchWeatherResponseStream(text, threadId, (chunk) => {
//       //   setMessages((prev) => {
//       //     const updated = [...prev];
//       //     updated[updated.length - 1].content += chunk;
//       //     return updated;
//       //   });
//       // });
//       await fetchWeatherResponseStream(text, threadId, (chunk) => {
//   setMessages((prev) => {
//     const updated = [...prev];
//     const last = updated[updated.length - 1];

//     // Deduplication logic
//     if (!last.content.endsWith(chunk)) {
//       const overlapIndex = last.content.lastIndexOf(chunk.trim());
//       if (overlapIndex === -1) {
//         last.content += chunk;
//       } else {
//         last.content += chunk.slice(chunk.trim().length);
//       }
//     }

//     return updated;
//   });
// });

//     } catch (err) {
//       console.error('API error:', err);
//       setMessages((prev) => {
//         const updated = prev.slice(0, -1);
//         return [...updated, { role: 'agent', content: '⚠️ Failed to fetch response.' }];
//       });
//       setError(`⚠️ API error: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ChatWindow messages={messages} onSend={handleSend} loading={loading} error={error} />
//   );
// }

// export default App;
















// import React, { useState, useEffect } from 'react';
// import ChatWindow from './components/ChatWindow';
// import { fetchWeatherResponseStream } from './utils/api';

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [isSidebarOpen, setSidebarOpen] = useState(true);
//   const threadId = 'TU4S2223005';

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem('chat-history') || '[]');
//     setHistory(saved);
//   }, []);

//   const saveToHistory = (newSession) => {
//     const updated = [newSession, ...history];
//     setHistory(updated);
//     localStorage.setItem('chat-history', JSON.stringify(updated));
//   };

//   const handleSend = async (text) => {
//     if (!text.trim()) return;
//     const userMsg = { role: 'user', content: text };
//     setMessages((prev) => [...prev, userMsg]);
//     setLoading(true);
//     setError('');
    
//     let agentContent = '';
//     try {
//       await fetchWeatherResponseStream(text, threadId, (chunk) => {
//         agentContent += chunk;
//         setMessages((prev) => {
//           const updated = [...prev];
//           const last = updated[updated.length - 1];
//           if (last?.role === 'agent') {
//             last.content = agentContent;
//           } else {
//             updated.push({ role: 'agent', content: agentContent });
//           }
//           return [...updated];
//         });
//       });
      
//       saveToHistory({
//         id: Date.now(),
//         title: text,
//         messages: [...messages, userMsg, { role: 'agent', content: agentContent }],
//       });
//     } catch (err) {
//       console.error('API error:', err);
//       setMessages((prev) => [
//         ...prev,
//         { role: 'agent', content: 'I apologize, but I encountered an error while processing your request.' },
//       ]);
//       setError('Connection error: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadConversation = (session) => {
//     setMessages(session.messages);
//   };

//   const startNewChat = () => {
//     setMessages([]);
//   };

//   return (
//     <div className="flex h-screen bg-white text-gray-900 font-sans">
//       {/* Sidebar */}
//       {isSidebarOpen && (
//         <aside className="w-64 bg-gray-900 text-white flex flex-col">
//           <div className="p-4 border-b border-gray-700">
//             <button
//               onClick={startNewChat}
//               className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm font-medium transition-colors"
//             >
//               New Chat
//             </button>
//           </div>
//           <div className="flex-1 overflow-y-auto p-4">
//             <h2 className="text-sm font-medium text-gray-400 mb-3">Recent Conversations</h2>
//             {history.length === 0 ? (
//               <p className="text-sm text-gray-500">No conversations yet</p>
//             ) : (
//               history.map((session) => (
//                 <button
//                   key={session.id}
//                   onClick={() => loadConversation(session)}
//                   className="w-full text-left p-3 rounded-md hover:bg-gray-800 text-sm text-gray-300 mb-1 transition-colors"
//                 >
//                   {session.title.length > 30 ? session.title.slice(0, 30) + '...' : session.title}
//                 </button>
//               ))
//             )}
//           </div>
//         </aside>
//       )}
      
//       {/* Main Chat Area */}
//       <main className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="border-b border-gray-200 p-4 flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <button
//               onClick={() => setSidebarOpen(!isSidebarOpen)}
//               className="p-2 hover:bg-gray-100 rounded-md transition-colors"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//             <h1 className="text-lg font-medium">Weather Assistant</h1>
//           </div>
//         </header>
        
//         <ChatWindow
//           messages={messages}
//           onSend={handleSend}
//           loading={loading}
//           error={error}
//         />
//       </main>
//     </div>
//   );
// }

// export default App;










import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import { fetchWeatherResponseStream } from './utils/api';

function App() {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const threadId = 'TU4S2223005';

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('chat-history') || '[]');
    setHistory(saved);
  }, []);

  const saveToHistory = (newSession) => {
    const updated = [newSession, ...history];
    setHistory(updated);
    localStorage.setItem('chat-history', JSON.stringify(updated));
  };

  // const handleSend = async (text) => {
  //   if (!text.trim()) return;
  //   const userMsg = { role: 'user', content: text };
  //   const currentMessages = [...messages, userMsg];
  //   setMessages(currentMessages);
  //   setLoading(true);
  //   setError('');
    
  //   let agentContent = '';
  //   try {
  //     await fetchWeatherResponseStream(text, threadId, (chunk) => {
  //       agentContent += chunk;
  //       setMessages((prev) => {
  //         const updated = [...prev];
  //         const last = updated[updated.length - 1];
  //         if (last?.role === 'agent') {
  //           last.content = agentContent;
  //         } else {
  //           updated.push({ role: 'agent', content: agentContent });
  //         }
  //         return [...updated];
  //       });
  //     });
      
  //     const finalMessages = [...currentMessages, { role: 'agent', content: agentContent }];
  //     saveToHistory({
  //       id: Date.now(),
  //       title: text,
  //       messages: finalMessages,
  //     });
  //   } catch (err) {
  //     console.error('API error:', err);
  //     setMessages((prev) => [
  //       ...prev,
  //       { role: 'agent', content: 'I apologize, but I encountered an error while processing your request.' },
  //     ]);
  //     setError('Connection error: ' + err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
// App.js - Updated handleSend function with proper timestamp handling
const handleSend = async (text) => {
  if (!text.trim()) return;
  
  const currentTimestamp = new Date().toISOString();
  
  const userMsg = { 
    role: 'user', 
    content: text,
    timestamp: currentTimestamp // Ensure timestamp is always added
  };
  
  const currentMessages = [...messages, userMsg];
  setMessages(currentMessages);
  setLoading(true);
  setError('');
  
  let agentContent = '';
  let agentTimestamp = null;
  
  try {
    await fetchWeatherResponseStream(text, threadId, (chunk) => {
      agentContent += chunk;
      
      // Set agent timestamp only once when first chunk arrives
      if (!agentTimestamp) {
        agentTimestamp = new Date().toISOString();
      }
      
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last?.role === 'agent') {
          last.content = agentContent;
          last.timestamp = agentTimestamp; // Keep same timestamp for streaming
        } else {
          updated.push({ 
            role: 'agent', 
            content: agentContent,
            timestamp: agentTimestamp
          });
        }
        return [...updated];
      });
    });
    
    const finalMessages = [...currentMessages, { 
      role: 'agent', 
      content: agentContent,
      timestamp: agentTimestamp // Use the same timestamp from streaming
    }];
    
    saveToHistory({
      id: Date.now(),
      title: text,
      messages: finalMessages,
    });
  } catch (err) {
    console.error('API error:', err);
    setMessages((prev) => [
      ...prev,
      { 
        role: 'agent', 
        content: 'I apologize, but I encountered an error while processing your request.',
        timestamp: new Date().toISOString() // Add timestamp to error messages too
      },
    ]);
    setError('Connection error: ' + err.message);
  } finally {
    setLoading(false);
  }
};

  const loadConversation = (session) => {
    setMessages([...session.messages]);
  };

  const deleteConversation = (sessionId, e) => {
    e.stopPropagation(); // Prevent loading the conversation when clicking delete
    const updated = history.filter(session => session.id !== sessionId);
    setHistory(updated);
    localStorage.setItem('chat-history', JSON.stringify(updated));
  };

const clearChat = () => {
  setMessages([]);
};
  
  const startNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex h-screen bg-white text-gray-900 font-sans">
      {/* Sidebar */}
      {isSidebarOpen && (
        <aside className="w-64 bg-gray-900 text-white flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <button
              onClick={startNewChat}
              className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm font-medium transition-colors"
            >
              New Chat
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <h2 className="text-sm font-medium text-gray-400 mb-3">Recent Conversations</h2>
            {history.length === 0 ? (
              <p className="text-sm text-gray-500">No conversations yet</p>
            ) : (
              history.map((session) => (
                <div
                  key={session.id}
                  className="group relative mb-1"
                >
                  <button
                    onClick={() => loadConversation(session)}
                    className="w-full text-left p-3 rounded-md hover:bg-gray-800 text-sm text-gray-300 transition-colors pr-10"
                  >
                    {session.title.length > 30 ? session.title.slice(0, 30) + '...' : session.title}
                  </button>
                  <button
                    onClick={(e) => deleteConversation(session.id, e)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-gray-700 transition-all"
                    title="Delete conversation"
                  >
                    <svg className="w-4 h-4 text-gray-400 hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </aside>
      )}
      
      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        {/* <header className="border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg font-medium">Weather Assistant</h1>
          </div>
        </header> */}
        <header className="border-b border-gray-200 p-4 flex items-center justify-between">
  <div className="flex items-center space-x-3">
    <button
      onClick={() => setSidebarOpen(!isSidebarOpen)}
      className="p-2 hover:bg-gray-100 rounded-md transition-colors"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
    <h1 className="text-lg font-medium">Weather Assistant</h1>
  </div>
  {/* ADD THIS CLEAR CHAT BUTTON */}
  <button
    onClick={clearChat}
    className="px-3 py-2 bg-black-500 text-white rounded-lg hover:bg-gray-400 transition-colors text-sm"
  >
    Clear Chat
  </button>
</header>
        <ChatWindow
          messages={messages}
          onSend={handleSend}
          loading={loading}
          error={error}
        />
      </main>
    </div>
  );
}

export default App;