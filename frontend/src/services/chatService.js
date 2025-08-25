// Chat Service for API integration
class ChatService {
  constructor() {
    this.socket = null;
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    this.wsURL = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';
  }

  // Initialize WebSocket connection
  initializeSocket(userId) {
    try {
      // For now, we'll use a mock WebSocket
      // Replace with actual Socket.IO when backend is ready
      this.socket = new WebSocket(`${this.wsURL}?userId=${userId}`);
      
      this.socket.onopen = () => {
        console.log('WebSocket connected');
      };

      this.socket.onclose = () => {
        console.log('WebSocket disconnected');
        // Auto-reconnect logic
        setTimeout(() => this.initializeSocket(userId), 3000);
      };

      return this.socket;
    } catch (error) {
      console.error('WebSocket connection failed:', error);
      return null;
    }
  }

  // API Methods for backend integration
  async getConversations(userId) {
    try {
      const response = await fetch(`${this.baseURL}/api/conversations?userId=${userId}`, {
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

  async getMessages(conversationId) {
    try {
      const response = await fetch(`${this.baseURL}/api/conversations/${conversationId}/messages`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch messages');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      return [];
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
        body: JSON.stringify(message)
      });
      
      if (!response.ok) throw new Error('Failed to send message');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

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

  async markAsRead(conversationId, messageId) {
    try {
      await fetch(`${this.baseURL}/api/conversations/${conversationId}/messages/${messageId}/read`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Mark as read failed:', error);
    }
  }

  // WebSocket event handlers
  onMessage(callback) {
    if (this.socket) {
      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        callback(data);
      };
    }
  }

  onTyping(callback) {
    if (this.socket) {
      this.socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'typing') {
          callback(data);
        }
      });
    }
  }

  sendTyping(conversationId, isTyping) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        type: 'typing',
        conversationId,
        isTyping
      }));
    }
  }

  disconnect() {
    if (this.socket) {
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
          isOnline: true
        },
        client: { 
          id: 2,
          name: "Sarah Miller", 
          avatar: "https://i.pravatar.cc/150?img=2",
          isOnline: false
        },
        project: "Modern Living Room",
        lastMessage: {
          text: "I'll start working on some initial concepts",
          timestamp: new Date().toISOString(),
          sender: "designer"
        },
        unreadCount: 2,
        messages: [
          { 
            id: 1,
            senderId: 2,
            senderName: "Sarah Miller", 
            avatar: "https://i.pravatar.cc/150?img=2", 
            text: "Hi Sophia, I'm really excited to start working with you on this project.",
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            isRead: true
          },
          { 
            id: 2,
            senderId: 1,
            senderName: "Sophia Carter", 
            avatar: "https://i.pravatar.cc/150?img=1", 
            text: "Hi Sarah, thanks for reaching out! I've reviewed your requirements.",
            timestamp: new Date(Date.now() - 1800000).toISOString(),
            isRead: true
          }
        ]
      },
      {
        id: 2,
        designer: { 
          id: 3,
          name: "Emily Wong", 
          avatar: "https://i.pravatar.cc/150?img=3",
          isOnline: true
        },
        client: { 
          id: 4,
          name: "David Lee", 
          avatar: "https://i.pravatar.cc/150?img=4",
          isOnline: true
        },
        project: "Scandinavian Apartment",
        lastMessage: {
          text: "Can we go for a Scandinavian style this time?",
          timestamp: new Date(Date.now() - 900000).toISOString(),
          sender: "client"
        },
        unreadCount: 1,
        messages: [
          { 
            id: 3,
            senderId: 4,
            senderName: "David Lee", 
            avatar: "https://i.pravatar.cc/150?img=4", 
            text: "Hey Emily, can we go for a Scandinavian style this time?",
            timestamp: new Date(Date.now() - 900000).toISOString(),
            isRead: false
          }
        ]
      }
    ];
  }
}

export default new ChatService();