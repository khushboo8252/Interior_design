import React, { useEffect, useState, useRef } from "react";
import { Search, Send, Paperclip, Smile, MoreVertical, Phone, Video, Info, X } from "lucide-react";
import { useChat } from "../../hooks/useChat";

const Chat = () => {
  const userId = localStorage.getItem('userId') || '1'; // Mock user ID
  const {
    conversations,
    selectedConversation,
    messages,
    loading,
    error,
    onlineUsers,
    searchQuery,
    searchResults,
    isSearching,
    selectConversation,
    sendMessage,
    sendTypingIndicator,
    saveDraft,
    uploadFile,
    searchMessages,
    retryFailedMessage,
    getTypingIndicator,
    setError,
    setSearchQuery
  } = useChat(userId);

  const [input, setInput] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showConversationInfo, setShowConversationInfo] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle typing indicators
  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (isTyping) {
      sendTypingIndicator(true);
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        sendTypingIndicator(false);
      }, 1000);
    } else {
      sendTypingIndicator(false);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [isTyping, sendTypingIndicator]);

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    
    // Save draft
    saveDraft(value);
    
    // Handle typing indicator
    if (value.trim() && !isTyping) {
      setIsTyping(true);
    } else if (!value.trim() && isTyping) {
      setIsTyping(false);
    }
  };

  // Handle send message
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const messageText = input;
    setInput("");
    setIsTyping(false);
    
    await sendMessage(messageText);
  };

  // Handle file upload
  const handleFileUpload = async (files) => {
    if (!files.length) return;
    
    try {
      const uploadPromises = Array.from(files).map(file => uploadFile(file));
      const uploadResults = await Promise.all(uploadPromises);
      
      // Send message with attachments
      await sendMessage("", uploadResults);
    } catch (err) {
      setError("Failed to upload files");
    }
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      searchMessages(query);
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Format last seen
  const formatLastSeen = (lastSeen) => {
    if (!lastSeen) return "Online";
    const diff = Date.now() - new Date(lastSeen).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen font-sans bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/3 border-r bg-white flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Messages</h2>
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
          
          {/* Search */}
          {showSearch && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full border rounded-lg pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              {isSearching && (
                <div className="absolute right-3 top-2.5">
                  <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {searchQuery && searchResults.length > 0 ? (
            // Search Results
            <div className="p-2">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Search Results</h3>
              {searchResults.map((result) => (
                <div key={result.id} className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <p className="text-sm">{result.text}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {result.senderName} • {formatTime(result.timestamp)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            // Regular Conversations
            <div className="space-y-1 p-2">
              {conversations.map((conversation) => {
                const otherUser = conversation.designer.id === parseInt(userId) 
                  ? conversation.client 
                  : conversation.designer;
                const isOnline = onlineUsers.has(otherUser.id.toString());
                
                return (
                  <div
                    key={conversation.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation?.id === conversation.id 
                        ? "bg-blue-50 border border-blue-200" 
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => selectConversation(conversation)}
                  >
                    {/* Avatar */}
                    <div className="relative">
                      <img
                        src={otherUser.avatar}
                        alt={otherUser.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 truncate">
                          {otherUser.name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {formatTime(conversation.lastMessage?.timestamp)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.project.name}
                      </p>
                      
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-500 truncate">
                          {conversation.lastMessage?.text}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={selectedConversation.designer.id === parseInt(userId) 
                      ? selectedConversation.client.avatar 
                      : selectedConversation.designer.avatar}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedConversation.designer.id === parseInt(userId) 
                      ? selectedConversation.client.name 
                      : selectedConversation.designer.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedConversation.project.name}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Phone className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Video className="w-5 h-5 text-gray-600" />
                </button>
                <button 
                  onClick={() => setShowConversationInfo(!showConversationInfo)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Info className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div 
              className={`flex-1 overflow-y-auto p-6 space-y-4 ${dragOver ? 'bg-blue-50' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {messages.map((message) => {
                const isOwn = message.senderId === parseInt(userId);
                
                return (
                  <div
                    key={message.id}
                    className={`flex items-end space-x-2 ${
                      isOwn ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isOwn && (
                      <img 
                        src={message.avatar} 
                        alt={message.senderName} 
                        className="w-8 h-8 rounded-full object-cover" 
                      />
                    )}
                    
                    <div className={`max-w-md ${isOwn ? 'order-1' : 'order-2'}`}>
                      <div
                        className={`p-3 rounded-lg ${
                          isOwn
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p>{message.text}</p>
                        
                        {/* Attachments */}
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {message.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <Paperclip className="w-4 h-4" />
                                <a 
                                  href={attachment.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-sm underline"
                                >
                                  {attachment.name}
                                </a>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className={`flex items-center mt-1 space-x-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-xs text-gray-500">
                          {formatTime(message.timestamp)}
                        </span>
                        
                        {isOwn && (
                          <div className="flex items-center space-x-1">
                            {message.status === 'sending' && (
                              <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                            )}
                            {message.status === 'sent' && message.isRead && (
                              <div className="text-blue-500 text-xs">✓✓</div>
                            )}
                            {message.status === 'sent' && !message.isRead && (
                              <div className="text-gray-400 text-xs">✓</div>
                            )}
                            {message.status === 'failed' && (
                              <button
                                onClick={() => retryFailedMessage(message.id)}
                                className="text-red-500 text-xs hover:underline"
                              >
                                Retry
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Typing Indicator */}
              {getTypingIndicator() && (
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">{getTypingIndicator()}</span>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-end space-x-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  multiple
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Paperclip className="w-5 h-5 text-gray-600" />
                </button>
                
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    className="w-full border rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="absolute right-2 top-2 p-1 hover:bg-gray-100 rounded">
                    <Smile className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-1"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
              <p>Choose a conversation from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* Conversation Info Sidebar */}
      {showConversationInfo && selectedConversation && (
        <div className="w-80 border-l bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Conversation Info</h3>
            <button
              onClick={() => setShowConversationInfo(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Project Info */}
            <div>
              <h4 className="font-medium mb-2">Project</h4>
              <p className="text-gray-600">{selectedConversation.project.name}</p>
              <p className="text-sm text-gray-500 capitalize">Status: {selectedConversation.project.status}</p>
            </div>
            
            {/* Participants */}
            <div>
              <h4 className="font-medium mb-3">Participants</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedConversation.designer.avatar}
                    alt={selectedConversation.designer.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{selectedConversation.designer.name}</p>
                    <p className="text-sm text-gray-500">Designer</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedConversation.client.avatar}
                    alt={selectedConversation.client.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{selectedConversation.client.name}</p>
                    <p className="text-sm text-gray-500">Client</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-2 hover:bg-red-600 rounded p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Drag Overlay */}
      {dragOver && (
        <div className="fixed inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <Paperclip className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <p className="text-lg font-medium">Drop files to upload</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;