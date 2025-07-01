// components/dashboard/profile/ConversationsCard.tsx
"use client"

import Image from "next/image";

const mockConversations = [
    { id: 1, name: "Esthera Jackson", message: "Hi! I need more informations...", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Esthera Jackson", message: "Awesome work, can you change...", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Esthera Jackson", message: "Have a great afternoon...", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 4, name: "Esthera Jackson", message: "About files I can...", avatar: "/placeholder.svg?height=40&width=40" },
];

export default function ConversationsCard() {
    return (
        <div className="bg-background border border-foreground/60 rounded-xl p-6 h-full shadow-md shadow-foreground/20">
            <h3 className="text-lg font-bold text-foreground mb-6">Favourite Deal Room Conversations</h3>
            <div className="space-y-4">
                {mockConversations.map(convo => (
                    <div key={convo.id} className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                                <Image src={convo.avatar} alt={convo.name} width={40} height={40} />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-foreground">{convo.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{convo.message}</p>
                            </div>
                        </div>
                        <button className="text-xs font-bold text-primary hover:underline flex-shrink-0">
                            VIEW
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}