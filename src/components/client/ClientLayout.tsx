import { ReactNode } from 'react';
import ClientSidebar from './ClientSidebar';
import ClientTopBar from './ClientTopBar';

const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <ClientSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ClientTopBar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default ClientLayout;
