import { ChatConversation, ChatMessage } from "@/lib/types";

const mockConversation: ChatConversation = {
    id: 'convo_usr123_inv1',
    participants: {
        userId: 'usr_123', 
        investorId: 'inv_1'
    },
    messages: [
        { id: 'msg_1', senderId: 'usr_123', content: 'Hello! Thank you for accepting my proposal. I\'m excited to discuss this opportunity further.', timestamp: '15:40', type: 'text' },
        { id: 'msg_2', senderId: 'inv_1', content: 'Hi! I made a new UI-Kit for the project, check it late', timestamp: '15:42', type: 'text' },
        { id: 'msg_3', senderId: 'inv_1', content: 'https://user-images.githubusercontent.com/8633353/269411989-1b5e32c8-8a20-4351-b805-4f3652897c8d.png', timestamp: '15:42', type: 'image' },
        { id: 'msg_4', senderId: 'inv_1', content: 'See you at the office tomorrow!', timestamp: '15:42', type: 'text' },
        { id: 'msg_5', senderId: 'usr_123', content: 'Thank you for the work, see you!', timestamp: '15:42', type: 'text' },
        { id: 'msg_6', senderId: 'inv_1', content: 'Hello! Have you seen my backpack anywhere in the office?', timestamp: '15:42', type: 'text' },
        { id: 'msg_7', senderId: 'usr_123', content: 'Hi, yes, David has found it, ask our concierge.', timestamp: '15:42', type: 'text' },
    ]
};


class ChatService {
    /**
     * Fetches a conversation by the participants' IDs.
     * In a real app, the backend would find the conversation ID.
     */
    async getConversationByInvestorId(investorId: string): Promise<ChatConversation> {
        console.log(`[ChatService] Fetching conversation for investor: ${investorId}`);
        // MOCK: We always return the same conversation for now.
        return new Promise(resolve => setTimeout(() => resolve(mockConversation), 500));
    }

    /**
     * Simulates sending a new message.
     */
    async sendMessage(conversationId: string, message: Omit<ChatMessage, 'id'>): Promise<ChatMessage> {
        console.log(`[ChatService] Sending message to conversation ${conversationId}:`, message);
        const newMessage: ChatMessage = {
            id: `msg_${Date.now()}`,
            ...message
        };
        // MOCK: In a real app, this would be a POST request. Here we just log it.
        // You could also update the mockConversation object here for persistence during the session.
        return new Promise(resolve => setTimeout(() => resolve(newMessage), 300));
    }
}

export default new ChatService();