import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ConnectionState } from '../../types';

interface DashboardLayoutProps {
  connectionState: ConnectionState;
  onReconnect: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  connectionState, 
  onReconnect 
}) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header connectionState={connectionState} onReconnect={onReconnect} />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
