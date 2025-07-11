"use client"

import { useState, useMemo } from "react";
import { useNotifications } from "@/contexts/NotificationContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, CheckCheck } from "lucide-react";
import NotificationItem from "@/components/dashboard/notifications/NotificationItem";
import EmptyState from "@/components/ui/EmptyState";
import { Bell } from "lucide-react";

type FilterValue = 'all' | 'unread';

export default function NotificationsPage() {
    const { notifications, isLoading, markAllAsRead, unreadCount } = useNotifications();
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<FilterValue>('all');

    const filteredNotifications = useMemo(() => {
        return notifications
            .filter(n => filter === 'unread' ? !n.read : true)
            .filter(n => n.text.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [notifications, filter, searchTerm]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
                    <p className="text-sm text-muted-foreground">Manage and view all your updates here.</p>
                </div>
                <Button onClick={markAllAsRead} disabled={unreadCount === 0}>
                    <CheckCheck className="w-4 h-4 mr-2"/>
                    Mark All as Read
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search notifications..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>
                <Select value={filter} onValueChange={(v) => setFilter(v as FilterValue)}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Notifications</SelectItem>
                        <SelectItem value="unread">Unread Only</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            
            <div className="bg-background border border-border rounded-lg">
                {isLoading ? (
                    <div className="p-20 text-center text-muted-foreground font-semibold">Loading Notifications...</div>
                ) : filteredNotifications.length > 0 ? (
                    <div className="divide-y divide-border">
                        {filteredNotifications.map(notif => (
                            <NotificationItem key={notif.id} notification={notif} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                      icon={Bell}
                      title="No Notifications Found"
                      description="Try adjusting your search or filters. Or maybe you're just all caught up!"
                      className="border-none bg-transparent"
                    />
                )}
            </div>
        </div>
    );
}