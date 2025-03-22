'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Send, MoreVertical, Phone, Video, MessageSquare } from 'lucide-react';
import Image from 'next/image';

interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: string;
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
}

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      name: 'Alice Smith',
      avatar: '/avatars/avatar1.jpg',
      lastMessage: 'Looking forward to our meeting',
      time: '2m ago',
      unread: 2,
      messages: [
        { id: 1, senderId: 1, text: "Hi! How are you?", timestamp: "10:00 AM" },
        { id: 2, senderId: 0, text: "I'm good, thanks! How about you?", timestamp: "10:02 AM" },
        { id: 3, senderId: 1, text: "Looking forward to our meeting", timestamp: "10:05 AM" },
      ]
    },
    {
      id: 2,
      name: 'Bob Johnson',
      avatar: '/avatars/avatar2.jpg',
      lastMessage: 'See you tomorrow!',
      time: '1h ago',
      unread: 0,
      messages: [
        { id: 1, senderId: 1, text: "Hey, are we still on for tomorrow?", timestamp: "09:30 AM" },
        { id: 2, senderId: 0, text: "Yes, absolutely!", timestamp: "09:35 AM" },
        { id: 3, senderId: 1, text: "See you tomorrow!", timestamp: "09:36 AM" },
      ]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat, chats]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    const newMsg: Message = {
      id: Date.now(),
      senderId: 0,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === selectedChat) {
        return {
          ...chat,
          messages: [...chat.messages, newMsg],
          lastMessage: newMessage,
          time: 'Just now'
        };
      }
      return chat;
    }));

    setNewMessage('');
  };

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentChat = chats.find(chat => chat.id === selectedChat);

  return (
    <div className="h-[calc(100vh-2rem)] p-4">
      <div className="grid grid-cols-12 gap-6 h-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Left sidebar - Chat list */}
        <div className="col-span-4 border-r border-gray-200">
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-12rem)]">
            {filteredChats.map(chat => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat === chat.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image
                      src={chat.avatar}
                      alt={chat.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    {chat.unread > 0 && (
                      <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{chat.name}</h3>
                    <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{chat.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Chat messages */}
        <div className="col-span-8">
          {selectedChat ? (
            <>
              {/* Chat header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                <div className="flex items-center space-x-4">
                  <Image
                    src={currentChat?.avatar || ''}
                    alt={currentChat?.name || ''}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <h2 className="font-semibold text-lg">{currentChat?.name}</h2>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="h-5 w-5 text-gray-500 cursor-pointer hover:text-blue-500 transition-colors" />
                  <Video className="h-5 w-5 text-gray-500 cursor-pointer hover:text-blue-500 transition-colors" />
                  <MoreVertical className="h-5 w-5 text-gray-500 cursor-pointer hover:text-blue-500 transition-colors" />
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 overflow-y-auto h-[calc(100vh-16rem)] bg-gray-50">
                {currentChat?.messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === 0 ? 'justify-end' : 'justify-start'} mb-4`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.senderId === 0
                          ? 'bg-blue-500 text-white rounded-br-none'
                          : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <p>{message.text}</p>
                      <span className={`text-xs ${message.senderId === 0 ? 'text-blue-100' : 'text-gray-500'} block mt-1`}>
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700">Select a conversation</h3>
                <p className="text-gray-500">Choose from your existing conversations</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;