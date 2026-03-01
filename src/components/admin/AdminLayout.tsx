import { ReactNode } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopBar from './AdminTopBar';

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopBar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
