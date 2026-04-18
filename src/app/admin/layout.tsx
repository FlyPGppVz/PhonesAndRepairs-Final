import React from 'react';
import AdminClientLayout from './AdminClientLayout';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // En Static Export, no se puede verificar auth del lado del servidor.
  // La seguridad recae en AdminClientLayout (del lado del cliente) y en los endpoints PHP reales.
  
  return (
    <AdminClientLayout>
      {children}
    </AdminClientLayout>
  );
}
