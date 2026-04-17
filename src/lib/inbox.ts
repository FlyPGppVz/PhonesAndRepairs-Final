import { supabase } from './supabase';

export type InboxType = 'Quote' | 'Contact' | 'Support' | 'Appointment';

export interface InboxEntry {
  type: InboxType;
  customer_name: string;
  email: string;
  phone?: string;
  message: string;
  metadata?: Record<string, any>;
}

export async function addToInbox(entry: InboxEntry) {
  const { error } = await supabase
    .from('inbox')
    .insert([
      {
        ...entry,
        status: 'unread',
        created_at: new Date().toISOString(),
      },
    ]);

  if (error) {
    console.error('Error adding to inbox:', error);
    throw error;
  }
}
