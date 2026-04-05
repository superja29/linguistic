import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Navbar } from '../components/Navbar';
import { Send, ArrowLeft, MoreVertical, Search, CheckCheck, MessageSquare } from 'lucide-react';

export const Messages: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { conversations, createOrGetConversation, sendMessage, tutors } = useAppContext();
  
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // If URL has ?tutor=id, open/create that conversation
  useEffect(() => {
    const tutorId = searchParams.get('tutor');
    if (tutorId) {
      const convId = createOrGetConversation(tutorId);
      if (convId) {
        setActiveConvId(convId);
      }
    } else if (conversations.length > 0 && !activeConvId) {
      setActiveConvId(conversations[0].id);
    }
  }, [searchParams, conversations, createOrGetConversation]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, activeConvId]);

  const activeConversation = conversations.find(c => c.id === activeConvId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || !activeConvId) return;
    
    // For MVP context, we assume we are the 'student' sending a message to a 'tutor', unless we are looking at TutorDashboard.
    // We'll hardcode sender as student here to simulate the student's perspective.
    sendMessage(activeConvId, inputVal.trim(), 'student');
    setInputVal('');

    // Simulate dummy reply after 2 seconds
    setTimeout(() => {
      sendMessage(activeConvId, "Thanks for messaging! I'll get back to you shortly.", 'tutor');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-16">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-8 w-full flex-1 flex flex-col md:flex-row gap-6 h-[calc(100vh-80px)]">
        
        {/* Left Pane: Conversation List */}
        <div className={`w-full md:w-1/3 bg-white border border-slate-200 rounded-3xl flex flex-col overflow-hidden shadow-sm ${activeConversation ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Messages</h2>
          </div>
          
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-shadow"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="p-8 text-center text-slate-500">No conversations yet.</div>
            ) : (
              conversations.map(conv => {
                const lastMessage = conv.messages[conv.messages.length - 1];
                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConvId(conv.id)}
                    className={`w-full p-4 flex items-center gap-3 border-b border-slate-50 transition-colors text-left ${activeConvId === conv.id ? 'bg-indigo-50 border-indigo-100' : 'hover:bg-slate-50'}`}
                  >
                    <div className="relative">
                      <img src={conv.avatar} alt="Avatar" className="w-12 h-12 rounded-full bg-indigo-100" />
                      {conv.unread > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">{conv.unread}</span>}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-slate-900 truncate">{conv.tutorName}</span>
                        {lastMessage && <span className="text-xs font-medium text-slate-400">{lastMessage.timestamp}</span>}
                      </div>
                      <div className="text-sm text-slate-500 truncate font-medium">
                        {lastMessage ? lastMessage.text : 'No messages yet'}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Pane: Active Chat */}
        <div className={`w-full md:w-2/3 bg-white border border-slate-200 rounded-3xl flex-col overflow-hidden shadow-sm ${activeConversation ? 'flex' : 'hidden md:flex'}`}>
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-100 flex items-center gap-4 bg-white sticky top-0 z-10">
                <button onClick={() => setActiveConvId(null)} className="md:hidden text-slate-400 hover:text-slate-600">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div 
                  className="flex items-center gap-3 cursor-pointer flex-1"
                  onClick={() => navigate(`/tutor/${activeConversation.tutorId}`)}
                >
                  <img src={activeConversation.avatar} alt="Avatar" className="w-10 h-10 rounded-full bg-indigo-50" />
                  <div>
                    <h3 className="font-bold text-slate-900 hover:text-indigo-600 transition-colors">{activeConversation.tutorName}</h3>
                    <div className="text-xs font-medium text-green-500 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span> Online
                    </div>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600 p-2"><MoreVertical className="w-5 h-5" /></button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 bg-slate-50 flex flex-col gap-4">
                {activeConversation.messages.map((msg, i) => {
                  const isMe = msg.senderId === 'student';
                  return (
                    <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-fade-in-up`}>
                      <div className={`max-w-[75%] px-5 py-3 rounded-2xl ${isMe ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'}`}>
                        {msg.text}
                      </div>
                      <div className="flex items-center gap-1 mt-1 px-1">
                        <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">{msg.timestamp}</span>
                        {isMe && <CheckCheck className="w-3 h-3 text-indigo-400 ml-1" />}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-white border-t border-slate-100">
                <form onSubmit={handleSend} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="flex-1 border-2 border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-600 bg-slate-50 focus:bg-white transition-colors"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                  />
                  <button 
                    type="submit"
                    disabled={!inputVal.trim()}
                    className="bg-indigo-600 text-white px-5 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all shadow-md active:scale-95"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 text-center">
              <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">Your Messages</h3>
              <p className="text-slate-500 max-w-sm">Select a conversation from the sidebar or start a new one from a tutor's profile.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
