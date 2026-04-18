// src/lib/supabase.ts
// Este es un mock temporal para evitar errores de compilación
// mientras se migra el resto del código a PHP.

export const supabase = {
  from: (table: string) => {
    const chain = {
      insert: async (data: any) => ({ error: null, data: [data] }),
      update: (data: any) => chain,
      eq: (col: string, val: any) => chain,
      delete: () => chain,
      select: (fields: string = '*') => {
        const selectChain = {
          eq: () => selectChain,
          order: () => selectChain,
          maybeSingle: async () => ({ error: null, data: null }),
          single: async () => ({ error: null, data: null }),
          limit: () => selectChain,
          then: (res: any) => res({ error: null, data: [] })
        };
        return selectChain;
      },
      then: (res: any) => res({ error: null, data: [] })
    };
    return chain as any;
  },
  channel: (name: string) => {
    const channelChain = {
      on: (...args: any[]) => channelChain,
      subscribe: () => channelChain,
      unsubscribe: () => {}
    };
    return channelChain;
  },
  removeChannel: (channel: any) => {},
  auth: {
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signUp: async (...args: any[]) => ({ error: null }),
    signInWithPassword: async (...args: any[]) => ({ error: null }),
    signOut: async () => {}
  },
  storage: {
    from: () => ({
      upload: async () => ({ error: null }),
      getPublicUrl: () => ({ data: { publicUrl: '' } })
    })
  }
};
