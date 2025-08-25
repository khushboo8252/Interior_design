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
  
  const socketRef = useRef(null);
  const typingTimeoutRef = useRef({});

  // Initialize chat service
  useEffect(() => {
    if (userId) {
      initializeChat();
    }
    
    return () => {
      chatService.disconnect();
    };
  }, [userId]);

  const initializeChat = async () => {
    try {
      setLoading(true);
      
      // Initialize WebSocket
      socketRef.current = chatService.initializeSocket(userId);
      
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
    chatService.onMessage((data) => {
      switch (data.type) {
        case 'message':
          handleNewMessage(data);
          break;
        case 'typing':
          handleTypingIndicator(data);
          break;
        case 'user_online':
          setOnlineUsers(prev => new Set([...prev, data.userId]));
          break;
        case 'user_offline':
          setOnlineUsers(prev => {
            const newSet = new Set(prev);
            newSet.delete(data.userId);
            return newSet;
          });
          break;
        default:
          break;
      }
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
      isRead: false
    };

    // Add to messages if it's for the current conversation
    if (selectedConversation && data.conversationId === selectedConversation.id) {
      setMessages(prev => [...prev, newMessage]);
      
      // Mark as read if conversation is active
      chatService.markAsRead(data.conversationId, data.id);
    }

    // Update conversation list
    setConversations(prev => prev.map(conv => {
      if (conv.id === data.conversationId) {
        return {
          ...conv,
          lastMessage: {
            text: data.text,
            timestamp: data.timestamp,
            sender: data.senderId === userId ? 'me' : 'other'
          },
          unreadCount: selectedConversation?.id === conv.id ? 0 : (conv.unreadCount || 0) + 1
        };
      }
      return conv;
    }));
  };

  const handleTypingIndicator = (data) => {
    if (data.conversationId === selectedConversation?.id) {
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

  const selectConversation = async (conversation) => {
    try {
      setSelectedConversation(conversation);
      
      // Load messages for this conversation
      const messagesData = await chatService.getMessages(conversation.id);
      setMessages(messagesData.length > 0 ? messagesData : conversation.messages || []);
      
      // Load draft if exists
      const draft = await chatService.getDraft(conversation.id);
      if (draft) {
        // You can use this draft to populate the input field
        return draft;
      }
      
      // Mark conversation as read
      setConversations(prev => prev.map(conv => 
        conv.id === conversation.id 
          ? { ...conv, unreadCount: 0 }
          : conv
      ));
      
    } catch (err) {
      setError(err.message);
    }
  };

  const sendMessage = async (text, attachments = []) => {
    if (!selectedConversation || !text.trim()) return;

    const tempMessage = {
      id: Date.now(), // Temporary ID
      senderId: userId,
      senderName: "You",
      avatar: "", // Add user avatar
      text: text.trim(),
      timestamp: new Date().toISOString(),
      isRead: false,
      status: 'sending'
    };

    // Optimistically add message to UI
    setMessages(prev => [...prev, tempMessage]);

    try {
      // Send via API
      const sentMessage = await chatService.sendMessage(selectedConversation.id, {
        text: text.trim(),
        attachments
      });

      // Update message with server response
      setMessages(prev => prev.map(msg => 
        msg.id === tempMessage.id 
          ? { ...sentMessage, status: 'sent' }
          : msg
      ));

      // Clear any saved draft
      await chatService.saveDraft(selectedConversation.id, '');

    } catch (err) {
      // Mark message as failed
      setMessages(prev => prev.map(msg => 
        msg.id === tempMessage.id 
          ? { ...msg, status: 'failed' }
          : msg
      ));
      setError('Failed to send message');
    }
  };

  const sendTypingIndicator = useCallback((isTyping) => {
    if (selectedConversation) {
      chatService.sendTyping(selectedConversation.id, isTyping);
    }
  }, [selectedConversation]);

  const saveDraft = useCallback(async (content) => {
    if (selectedConversation) {
      await chatService.saveDraft(selectedConversation.id, content);
    }
  }, [selectedConversation]);

  const getTypingIndicator = () => {
    const typingUserIds = Object.keys(typingUsers).filter(id => typingUsers[id] && id !== userId.toString());
    
    if (typingUserIds.length === 0) return null;
    
    if (typingUserIds.length === 1) {
      const user = selectedConversation?.designer?.id.toString() === typingUserIds[0] 
        ? selectedConversation.designer 
        : selectedConversation?.client;
      return `${user?.name} is typing...`;
    }
    
    return 'Multiple people are typing...';
  };

  return {
    conversations,
    selectedConversation,
    messages,
    loading,
    error,
    onlineUsers,
    selectConversation,
    sendMessage,
    sendTypingIndicator,
    saveDraft,
    getTypingIndicator,
    setError
  };
};