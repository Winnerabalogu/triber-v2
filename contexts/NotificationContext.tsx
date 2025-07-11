"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import NotificationService from '@/services/notification.service';
import { useAuth } from './AuthContext';

export interface UINotification {
  id: number | string;
  type: string;
  text: string;
  time: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: UINotification[];
  unreadCount: number;
  isLoading: boolean;
  markAsRead: (id: number | string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: number | string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used within a NotificationProvider");
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<UINotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.notificationSettings) {
      const fetchNotifs = async () => {
        setIsLoading(true);
        const data = await NotificationService.getNotifications(user.notificationSettings);
        setNotifications(data);
        setIsLoading(false);
      };
      fetchNotifs();
    } else if (!user) {        
        setNotifications([]);
    }
  }, [user]);

  const markAsRead = (id: number | string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };
  
  const deleteNotification = (id: number | string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const value = {
    notifications,
    unreadCount: notifications.filter(n => !n.read).length,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};