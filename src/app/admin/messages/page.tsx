'use client';

import { useState, useEffect } from 'react';
import { IMessage } from '@/types';

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch('/api/messages');
            if (res.ok) setMessages(await res.json());
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkRead = async (id: string) => {
        try {
            const res = await fetch(`/api/messages/${id}`, { method: 'PUT' });
            if (res.ok) {
                setMessages(messages.map((m) => (m._id === id ? { ...m, read: true } : m)));
            }
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this message?')) return;

        try {
            const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
            if (res.ok) setMessages(messages.filter((m) => m._id !== id));
        } catch (error) {
            console.error('Failed to delete message:', error);
        }
    };

    const unreadCount = messages.filter((m) => !m.read).length;

    return (
        <div>
            <div className="mb-8">
                <h1 className="font-serif text-3xl font-semibold text-charcoal mb-1">
                    Messages
                </h1>
                <p className="text-warm-gray text-sm">
                    {messages.length} total · {unreadCount} unread
                </p>
            </div>

            {loading ? (
                <div className="text-center py-12 text-warm-gray">Loading messages...</div>
            ) : messages.length === 0 ? (
                <div className="bg-white border border-light-border p-12 text-center">
                    <p className="text-2xl mb-3">✉️</p>
                    <p className="text-warm-gray">No messages yet. Messages from the contact form will appear here.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {messages.map((message) => (
                        <div
                            key={message._id}
                            className={`bg-white border p-6 transition-colors ${message.read ? 'border-light-border' : 'border-accent-gold bg-accent-gold/5'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-medium text-charcoal">{message.name}</h3>
                                        {!message.read && (
                                            <span className="text-[10px] px-2 py-0.5 bg-accent-gold text-white uppercase tracking-wider">
                                                New
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-warm-gray text-sm mt-0.5">
                                        {message.email}
                                        {message.phone && ` · ${message.phone}`}
                                    </p>
                                </div>
                                <p className="text-warm-gray text-xs">
                                    {new Date(message.createdAt).toLocaleDateString('en-IN', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>

                            <p className="text-charcoal/80 text-sm leading-relaxed mb-4">
                                {message.message}
                            </p>

                            <div className="flex gap-3">
                                {!message.read && (
                                    <button
                                        onClick={() => handleMarkRead(message._id)}
                                        className="text-xs text-accent-gold hover:underline cursor-pointer"
                                    >
                                        Mark as Read
                                    </button>
                                )}
                                <a
                                    href={`mailto:${message.email}`}
                                    className="text-xs text-charcoal hover:underline"
                                >
                                    Reply via Email
                                </a>
                                <button
                                    onClick={() => handleDelete(message._id)}
                                    className="text-xs text-red-500 hover:underline cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
