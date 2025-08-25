import { useState, useEffect, useCallback, useRef } from 'react';
import chatService from '../services/chatService';

export const useChat = (userId) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [typingUsers, setTypingUsers] = useState({});
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const socketRef = useRef(null);
  const typingTimeoutRef = useRef({});
  const draftTimeoutRef = useRef(null);

  // Initialize chat service
  useEffect(() => {
    if (userId) {
      initializeChat();
    }
    
    return () => {
      chatService.disconnect();
      // Clear all timeouts
      Object.values(typingTimeoutRef.current).forEach(clearTimeout);
      if (draftTimeoutRef.current) clearTimeout(draftTimeoutRef.current);
    };
  }, [userId]);

  const initializeChat = async () => {
    try {
      setLoading(true);
      
      // Get auth token
      const token = localStorage.getItem('token') || 'mock-token';
      
      // Initialize WebSocket
      socketRef.current = chatService.initializeSocket(userId, token);
      
      // Setup WebSocket event listeners
      setupSocketListeners();
      
      // Load conversations
      const conversationsData = await chatService.getConversations(userId);
      setConversations(conversationsData);
      
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const setupSocketListeners = () => {
    // Listen for new messages
    chatService.on('new_message', (data) => {
      handleNewMessage(data);
    });

    // Listen for typing indicators
    chatService.on('user_typing', (data) => {
      handleTypingIndicator(data);
    });

    // Listen for read receipts
    chatService.on('message_read', (data) => {
      handleReadReceipt(data);
    });

    // Listen for user online/offline status
    chatService.on('user_status', (data) => {
      handleUserStatusChange(data);
    });

    // Listen for conversation updates
    chatService.on('conversation_updated', (data) => {
      handleConversationUpdate(data);
    });
  };

  const handleNewMessage = (data) => {
    const newMessage = {
      id: data.id,
      senderId: data.senderId,
      senderName: data.senderName,
      avatar: data.avatar,
      text: data.text,
      timestamp: data.timestamp,
      isRead: data.senderId === parseInt(userId),
      readBy: data.readBy || [],
      attachments: data.attachments || []
    };

    // Add to messages if it's for the current conversation
    if (selectedConversation && data.conversationId === selectedConversation.id) {
      setMessages(prev => [...prev, newMessage]);
      
      // Mark as read if conversation is active and message is not from current user
      if (data.senderId !== parseInt(userId)) {
        chatService.markAsRead(data.conversationId, [data.id]);
      }
    }

    // Update conversation list
    updateConversationLastMessage(data.conversationId, newMessage);
  };

  const handleTypingIndicator = (data) => {
    if (data.conversationId === selectedConversation?.id && data.userId !== userId.toString()) {
      setTypingUsers(prev => ({
        ...prev,
        [data.userId]: data.isTyping
      }));

      // Clear typing indicator after timeout
      if (data.isTyping) {
        if (typingTimeoutRef.current[data.userId]) {
          clearTimeout(typingTimeoutRef.current[data.userId]);
        }
        
        typingTimeoutRef.current[data.userId] = setTimeout(() => {
          setTypingUsers(prev => ({
            ...prev,
            [data.userId]: false
          }));
        }, 3000);
      }
    }
  };

  const handleReadReceipt = (data) => {
    if (selectedConversation && data.conversationId === selectedConversation.id) {
      setMessages(prev => prev.map(msg => {
        if (data.messageIds.includes(msg.id)) {
          return {
            ...msg,
            isRead: true,
            readBy: [...new Set([...msg.readBy, data.userId])]
          };
        }
        return msg;
      }));
    }
  };

  const handleUserStatusChange = (data) => {
    setOnlineUsers(prev => {
      const newSet = new Set(prev);
      if (data.isOnline) {
        newSet.add(data.userId);
      } else {
        newSet.delete(data.userId);
      }
      return newSet;
    });

    // Update conversation list with user status
    setConversations(prev => prev.map(conv => ({
      ...conv,
      designer: conv.designer.id === data.userId 
        ? { ...conv.designer, isOnline: data.isOnline, lastSeen: data.lastSeen }
        : conv.designer,
      client: conv.client.id === data.userId 
        ? { ...conv.client, isOnline: data.isOnline, lastSeen: data.lastSeen }
        : conv.client
    })));
  };

  const handleConversationUpdate = (data) => {
    setConversations(prev => prev.map(conv => 
      conv.id === data.conversationId 
        ? { ...conv, ...data.updates }
        : conv
    ));
  };

  const updateConversationLastMessage = (conversationId, message) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        const isCurrentConversation = selectedConversation?.id === conv.id;
        const isFromCurrentUser = message.senderId === parseInt(userId);
        
        return {
          ...conv,
          lastMessage: {
            id: message.id,
            text: message.text,
            timestamp: message.timestamp,
            senderId: message.senderId,
            isRead: message.isRead
          },
          unreadCount: isCurrentConversation || isFromCurrentUser 
            ? 0 
            : (conv.unreadCount || 0) + 1,
          updatedAt: message.timestamp
        };
      }
      return conv;
    }));
  };

  const selectConversation = async (conversation) => {
    try {
      setSelectedConversation(conversation);
      setMessages([]); // Clear previous messages
      
      // Load messages for this conversation
      const { messages: messagesData } = await chatService.getMessages(conversation.id);
      setMessages(messagesData);
      
      // Load draft if exists
      const draft = await chatService.getDraft(conversation.id);
      
      // Mark conversation as read
      const unreadMessages = messagesData
        .filter(msg => !msg.isRead && msg.senderId !== parseInt(userId))
        .map(msg => msg.id);
      
      if (unreadMessages.length > 0) {
        await chatService.markAsRead(conversation.id, unreadMessages);
      }
      
      // Update conversation unread count
      setConversations(prev => prev.map(conv => 
        conv.id === conversation.id 
          ? { ...conv, unreadCount: 0 }
          : conv
      ));
      
      return draft;
      
    } catch (err) {
      setError(err.message);
    }
  };

  const sendMessage = async (text, attachments = [], replyTo = null) => {
    if (!selectedConversation || !text.trim()) return;

    const tempId = `temp_${Date.now()}`;
    const tempMessage = {
      id: tempId,
      senderId: parseInt(userId),
      senderName: "You",
      avatar: "", // Add user avatar from context
      text: text.trim(),
      timestamp: new Date().toISOString(),
      isRead: true,
      readBy: [parseInt(userId)],
      attachments,
      replyTo,
      status: 'sending'
    };

    // Optimistically add message to UI
    setMessages(prev => [...prev, tempMessage]);

    try {
      // Send via API
      const sentMessage = await chatService.sendMessage(selectedConversation.id, {
        text: text.trim(),
        attachments,
        replyTo
      });

      // Update message with server response
      setMessages(prev => prev.map(msg => 
        msg.id === tempId 
          ? { ...sentMessage, status: 'sent' }
          : msg
      ));

      // Update conversation last message
      updateConversationLastMessage(selectedConversation.id, sentMessage);

      // Clear any saved draft
      await chatService.saveDraft(selectedConversation.id, '');

    } catch (err) {
      // Mark message as failed
      setMessages(prev => prev.map(msg => 
        msg.id === tempId 
          ? { ...msg, status: 'failed' }
          : msg
      ));
      setError('Failed to send message');
    }
  };

  const sendTypingIndicator = useCallback((isTyping) => {
    if (selectedConversation) {
      chatService.sendTypingIndicator(selectedConversation.id, isTyping);
    }
  }, [selectedConversation]);

  const saveDraft = useCallback((content) => {
    if (selectedConversation) {
      // Debounce draft saving
      if (draftTimeoutRef.current) {
        clearTimeout(draftTimeoutRef.current);
      }
      
      draftTimeoutRef.current = setTimeout(async () => {
        await chatService.saveDraft(selectedConversation.id, content);
      }, 1000);
    }
  }, [selectedConversation]);

  const uploadFile = async (file) => {
    if (!selectedConversation) return null;
    
    try {
      const uploadResult = await chatService.uploadFile(file, selectedConversation.id);
      return uploadResult;
    } catch (err) {
      setError('Failed to upload file');
      throw err;
    }
  };

  const searchMessages = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const { results } = await chatService.searchMessages(query, selectedConversation?.id);
      setSearchResults(results);
    } catch (err) {
      setError('Search failed');
    } finally {
      setIsSearching(false);
    }
  };

  const getTypingIndicator = () => {
    const typingUserIds = Object.keys(typingUsers).filter(id => 
      typingUsers[id] && id !== userId.toString()
    );
    
    if (typingUserIds.length === 0) return null;
    
    if (typingUserIds.length === 1) {
      const user = selectedConversation?.designer?.id.toString() === typingUserIds[0] 
        ? selectedConversation.designer 
        : selectedConversation?.client;
      return `${user?.name} is typing...`;
    }
    
    return 'Multiple people are typing...';
  };

  const retryFailedMessage = async (messageId) => {
    const failedMessage = messages.find(msg => msg.id === messageId && msg.status === 'failed');
    if (!failedMessage) return;

    // Update status to sending
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, status: 'sending' }
        : msg
    ));

    try {
      const sentMessage = await chatService.sendMessage(selectedConversation.id, {
        text: failedMessage.text,
        attachments: failedMessage.attachments || [],
        replyTo: failedMessage.replyTo
      });

      // Replace failed message with sent message
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...sentMessage, status: 'sent' }
          : msg
      ));

    } catch (err) {
      // Mark as failed again
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, status: 'failed' }
          : msg
      ));
      setError('Failed to resend message');
    }
  };

  return {
    // State
    conversations,
    selectedConversation,
    messages,
    loading,
    error,
    onlineUsers,
    typingUsers,
    searchQuery,
    searchResults,
    isSearching,
    
    // Actions
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
  };
};