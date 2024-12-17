import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { ReactNode } from 'react';

interface SidebarProps {
  children: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="h-screen w-full flex">
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  );
};

export default Sidebar;
