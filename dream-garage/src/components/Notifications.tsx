'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

// Notification component
interface NotificationProps {
  notification: {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
    createdAt: Date;
  };
}

const Notification = ({ notification }: NotificationProps) => {
  // Get notification color based on type
  const getNotificationColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-emerald-900/20 border-emerald-800/30 text-emerald-400';
      case 'warning':
        return 'bg-amber-900/20 border-amber-800/30 text-amber-400';
      case 'error':
        return 'bg-red-900/20 border-red-800/30 text-red-400';
      default:
        return 'bg-blue-900/20 border-blue-800/30 text-blue-400';
    }
  };

  // Get notification icon
  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'success':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
      className={`notification flex items-center gap-3 ${getNotificationColor()}`}
    >
      <div className="flex-shrink-0">
        {getNotificationIcon()}
      </div>
      <div className="flex-1">
        <p className="font-medium">{notification.message}</p>
      </div>
    </motion.div>
  );
};

// Notifications component
export const Notifications = () => {
  const { ui: { notifications }, clearNotifications } = useStore();

  return (
    <div className="fixed bottom-6 right-6 z-[var(--z-notification)] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification key={notification.id} notification={notification} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;
