import CoreService from '@/services/core.service';
import ChatService from '@/services/chat.service';
import { notFound } from 'next/navigation';
import ChatInterface from '@/components/dashboard/deal-room/chat/ChatInterface';

export default async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [investor, conversation] = await Promise.all([
    CoreService.getInvestorById(id),
    ChatService.getConversationByInvestorId(id),
  ]);

  if (!investor || !conversation) {
    notFound();
  }

  return (
    <ChatInterface initialInvestor={investor} initialConversation={conversation} />
  );
}
