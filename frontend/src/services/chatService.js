// Enhanced Chat Service for API integration
class ChatService {
  constructor() {
    this.socket = null;
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    this.wsURL = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
  }

  // Initialize WebSocket connection with Socket.IO compatibility
  initializeSocket(userId, token) {
    try {
      // For Socket.IO integration when backend is ready
      const socketUrl = `${this.wsURL}?userId=${userId}&token=${token}`;
      
      // Mock WebSocket for now - will be replaced with Socket.IO client
      this.socket = new WebSocket(socketUrl);
      
      this.socket.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        this.emit('user_online', { userId });
      };

      this.socket.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code);
        this.handleReconnection(userId, token);
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      return this.socket;
    } catch (error) {
      console.error('WebSocket connection failed:', error);
      return null;
    }
  }

  // Handle automatic reconnection
  handleReconnection(userId, token) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.initializeSocket(userId, token);
      }, delay);
    }
  }

  // Emit events (Socket.IO style)
  emit(event, data) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ event, data }));
    }
  }

  // Listen for events (Socket.IO style)
  on(event, callback) {
    if (this.socket) {
      this.socket.addEventListener('message', (wsEvent) => {
        try {
          const { event: eventType, data } = JSON.parse(wsEvent.data);
          if (eventType === event) {
            callback(data);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      });
    }
  }

  // API Methods for backend integration
  async getConversations(userId, filters = {}) {
    try {
      const queryParams = new URLSearchParams({
        userId,
        ...filters
      });

      const response = await fetch(`${this.baseURL}/api/conversations?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch conversations');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      // Return mock data for development
      return this.getMockConversations();
    }
  }

  async getMessages(conversationId, page = 1, limit = 50) {
    try {
      const response = await fetch(`${this.baseURL}/api/conversations/${conversationId}/messages?page=${page}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch messages');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      return { messages: [], hasMore: false };
    }
  }

  async sendMessage(conversationId, message) {
    try {
      const response = await fetch(`${this.baseURL}/api/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: message.text,
          attachments: message.attachments || [],
          replyTo: message.replyTo || null
        })
      });
      
      if (!response.ok) throw new Error('Failed to send message');
      const sentMessage = await response.json();
      
      // Emit via WebSocket for real-time delivery
      this.emit('send_message', {
        conversationId,
        message: sentMessage
      });
      
      return sentMessage;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Draft management
  async saveDraft(conversationId, content) {
    try {
      const response = await fetch(`${this.baseURL}/api/conversations/${conversationId}/draft`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
      });
      
      if (!response.ok) throw new Error('Failed to save draft');
      return await response.json();
    } catch (error) {
      console.error('Draft save failed:', error);
    }
  }

  async getDraft(conversationId) {
    try {
      const response = await fetch(`${this.baseURL}/api/conversations/${conversationId}/draft`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) return null;
      const data = await response.json();
      return data.content;
    } catch (error) {
      console.error('Draft fetch failed:', error);
      return null;
    }
  }

  // Read receipts
  async markAsRead(conversationId, messageIds) {
    try {
      await fetch(`${this.baseURL}/api/conversations/${conversationId}/read`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messageIds })
      });

      // Emit read receipt via WebSocket
      this.emit('message_read', {
        conversationId,
        messageIds,
        userId: localStorage.getItem('userId')
      });
    } catch (error) {
      console.error('Mark as read failed:', error);
    }
  }

  // Typing indicators
  sendTypingIndicator(conversationId, isTyping) {
    this.emit('typing', {
      conversationId,
      isTyping,
      userId: localStorage.getItem('userId')
    });
  }

  // File upload
  async uploadFile(file, conversationId) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('conversationId', conversationId);

      const response = await fetch(`${this.baseURL}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Failed to upload file');
      return await response.json();
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  }

  // Search messages
  async searchMessages(query, conversationId = null) {
    try {
      const params = new URLSearchParams({ query });
      if (conversationId) params.append('conversationId', conversationId);

      const response = await fetch(`${this.baseURL}/api/messages/search?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Search failed');
      return await response.json();
    } catch (error) {
      console.error('Search failed:', error);
      return { results: [] };
    }
  }

  disconnect() {
    if (this.socket) {
      this.emit('user_offline', { userId: localStorage.getItem('userId') });
      this.socket.close();
      this.socket = null;
    }
  }

  // Mock data for development
  getMockConversations() {
    return [
      {
        id: 1,
        designer: { 
          id: 1,
          name: "Sophia Carter", 
          avatar: "https://i.pravatar.cc/150?img=1",
          isOnline: true,
          lastSeen: null
        },
        client: { 
          id: 2,
          name: "Sarah Miller", 
          avatar: "https://i.pravatar.cc/150?img=2",
          isOnline: false,
          lastSeen: new Date(Date.now() - 1800000).toISOString()
        },
        project: {
          id: 1,
          name: "Modern Living Room",
          status: "active"
        },
        lastMessage: {
          id: 2,
          text: "I'll start working on some initial concepts",
          timestamp: new Date().toISOString(),
          senderId: 1,
          isRead: false
        },
        unreadCount: 2,
        updatedAt: new Date().toISOString()
      },
      {
        id: 2,
        designer: { 
          id: 3,
          name: "Emily Wong", 
          avatar: "https://i.pravatar.cc/150?img=3",
          isOnline: true,
          lastSeen: null
        },
        client: { 
          id: 4,
          name: "David Lee", 
          avatar: "https://i.pravatar.cc/150?img=4",
          isOnline: true,
          lastSeen: null
        },
        project: {
          id: 2,
          name: "Scandinavian Apartment",
          status: "active"
        },
        lastMessage: {
          id: 3,
          text: "Can we go for a Scandinavian style this time?",
          timestamp: new Date(Date.now() - 900000).toISOString(),
          senderId: 4,
          isRead: false
        },
        unreadCount: 1,
        updatedAt: new Date(Date.now() - 900000).toISOString()
      }
    ];
  }

  getMockMessages(conversationId) {
    const messages = {
      1: [
        { 
          id: 1,
          senderId: 2,
          senderName: "Sarah Miller", 
          avatar: "https://i.pravatar.cc/150?img=2", 
          text: "Hi Sophia, I'm really excited to start working with you on this project. I've attached a brief with all the details.",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          isRead: true,
          readBy: [1],
          attachments: []
        },
        { 
          id: 2,
          senderId: 1,
          senderName: "Sophia Carter", 
          avatar: "https://i.pravatar.cc/150?img=1", 
          text: "Hi Sarah, thanks for reaching out! I've reviewed your requirements and I'm excited to work on this project.",
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          isRead: true,
          readBy: [2],
          attachments: []
        }
      ],
      2: [
        { 
          id: 3,
          senderId: 4,
          senderName: "David Lee", 
          avatar: "https://i.pravatar.cc/150?img=4", 
          text: "Hey Emily, can we go for a Scandinavian style this time?",
          timestamp: new Date(Date.now() - 900000).toISOString(),
          isRead: false,
          readBy: [],
          attachments: []
        }
      ]
    };

    return {
      messages: messages[conversationId] || [],
      hasMore: false
    };
  }
}

export default new ChatService();