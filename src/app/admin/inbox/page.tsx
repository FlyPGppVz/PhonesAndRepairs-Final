'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

interface InboxMessage {
  id: string;
  created_at: string;
  type: string;
  customer_name: string;
  email: string;
  phone: string;
  message: string;
  status: 'unread' | 'read' | 'archived';
  metadata: any;
}

export default function AdminInbox() {
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('inbox')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Error fetching messages');
    } else {
      setMessages(data || []);
      if (data && data.length > 0 && !selectedMessage) {
        setSelectedMessage(data[0]);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('inbox-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'inbox' }, (payload: any) => {
        const newMessage = payload.new as InboxMessage;
        setMessages((prev) => [newMessage, ...prev]);
        toast.success(`New ${newMessage.type} received!`, { icon: '📩' });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('inbox')
      .update({ status: 'read' })
      .eq('id', id);

    if (error) {
      toast.error('Error updating status');
    } else {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, status: 'read' } : msg))
      );
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status: 'read' });
      }
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    const { error } = await supabase.from('inbox').delete().eq('id', id);

    if (error) {
      toast.error('Error deleting message');
    } else {
      toast.success('Message deleted');
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-140px)] bg-white dark:bg-[#0a0a0a] rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/5 shadow-2xl">
      {/* Sidebar - Message List */}
      <div className="w-1/3 border-r border-slate-200 dark:border-white/5 flex flex-col bg-slate-50/50 dark:bg-black/20">
        <div className="p-6 border-b border-slate-200 dark:border-white/5">
          <h2 className="text-xl font-black dark:text-white uppercase tracking-tighter">Inbox</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
            {messages.filter((m) => m.status === 'unread').length} Unread
          </p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="p-10 text-center space-y-4">
              <span className="material-symbols-outlined text-4xl text-slate-200">mail</span>
              <p className="text-sm text-slate-400 font-medium tracking-tight">Your inbox is empty</p>
            </div>
          ) : (
            messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                className={`w-full p-5 text-left transition-all border-b border-slate-200 dark:border-white/5 flex gap-4 ${
                  selectedMessage?.id === msg.id 
                    ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-xl shadow-blue-500/20 z-10' 
                    : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-900 dark:text-slate-300'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                      selectedMessage?.id === msg.id ? 'text-white/80' : 'text-blue-600 dark:text-blue-400'
                    }`}>
                      {msg.type}
                    </span>
                    <span className={`text-[10px] font-bold ${
                      selectedMessage?.id === msg.id ? 'text-white/60' : 'text-slate-400'
                    }`}>
                      {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <h3 className="font-bold truncate text-sm">{msg.customer_name}</h3>
                  <p className={`text-xs truncate ${
                    selectedMessage?.id === msg.id ? 'text-white/70' : 'text-slate-500 dark:text-zinc-400'
                  }`}>
                    {msg.message}
                  </p>
                </div>
                {msg.status === 'unread' && (
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    selectedMessage?.id === msg.id ? 'bg-white' : 'bg-blue-600'
                  }`}></div>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Content - Message Detail */}
      <div className="flex-1 flex flex-col bg-white dark:bg-black">
        {selectedMessage ? (
          <>
            <div className="p-8 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <span className="material-symbols-outlined font-black">person</span>
                </div>
                <div>
                  <h2 className="text-xl font-black dark:text-white tracking-tight">{selectedMessage.customer_name}</h2>
                  <p className="text-sm text-slate-500 font-medium">{selectedMessage.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {selectedMessage.status === 'unread' && (
                  <button
                    onClick={() => markAsRead(selectedMessage.id)}
                    className="p-3 text-slate-400 hover:text-blue-500 transition-colors"
                    title="Mark as Read"
                  >
                    <span className="material-symbols-outlined">mark_email_read</span>
                  </button>
                )}
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="p-3 text-slate-400 hover:text-red-500 transition-colors"
                  title="Delete"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
            
            <div className="flex-1 p-8 overflow-y-auto space-y-8">
              <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-3xl space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-blue-600 text-[18px]">info</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Details</span>
                </div>
                <div className="grid grid-cols-2 gap-8 text-sm">
                  <div className="space-y-1">
                    <p className="text-slate-400 font-bold uppercase text-[9px]">Source</p>
                    <p className="font-bold dark:text-white uppercase tracking-tight">{selectedMessage.type}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400 font-bold uppercase text-[9px]">Date</p>
                    <p className="font-bold dark:text-white">{new Date(selectedMessage.created_at).toLocaleString()}</p>
                  </div>
                  {selectedMessage.metadata?.category && (
                    <div className="space-y-1">
                      <p className="text-slate-400 font-bold uppercase text-[9px]">Device</p>
                      <p className="font-bold dark:text-white uppercase tracking-tight">{selectedMessage.metadata.category}</p>
                    </div>
                  )}
                  {selectedMessage.phone && (
                    <div className="space-y-1">
                      <p className="text-slate-400 font-bold uppercase text-[9px]">Phone</p>
                      <p className="font-bold dark:text-white">{selectedMessage.phone}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600 text-[18px]">chat</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Message</span>
                </div>
                <div className="text-slate-600 dark:text-zinc-300 bg-slate-50 dark:bg-white/5 p-8 rounded-[2rem] leading-relaxed text-lg font-medium shadow-inner">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="flex items-center gap-2 px-8 py-4 bg-blue-600 dark:bg-blue-500 text-white rounded-2xl font-bold transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-blue-500/20"
                >
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  Reply by Email
                </a>
                <a
                  href={`https://wa.me/${selectedMessage.phone?.replace(/\D/g, '')}`}
                  target="_blank"
                  className="flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-2xl font-bold transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-green-500/20"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  WhatsApp
                </a>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-6">
            <div className="w-24 h-24 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-slate-300">drafts</span>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-300 uppercase tracking-tighter italic">Select a message</h3>
              <p className="text-slate-400 text-sm font-medium mt-1">Review customer requests and repair quotes in detail.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
