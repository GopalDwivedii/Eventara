import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useWebSocketMetrics } from './hooks/useWebSocket';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Overview } from './pages/Overview';
import { ComingSoon } from './pages/ComingSoon';
import './utils/chartConfig';
import './App.css';
import { RealTimeMonitoring } from './pages/RealTimeMonitoring';

function App() {
  const { metrics, connectionState, reconnect } = useWebSocketMetrics();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <DashboardLayout 
              connectionState={connectionState} 
              onReconnect={reconnect}
            />
          }
        >
          <Route index element={<Overview metrics={metrics} />} />
          <Route path="/monitoring" element={<RealTimeMonitoring metrics={metrics}/>} />
          <Route path="/events" element={<ComingSoon pageName="Event Analytics" />} />
          <Route path="/sources" element={<ComingSoon pageName="Source Analytics" />} />
          <Route path="/users" element={<ComingSoon pageName="User Analytics" />} />
          <Route path="/performance" element={<ComingSoon pageName="Performance Metrics" />} />
          <Route path="/errors" element={<ComingSoon pageName="Error Analysis" />} />
          <Route path="/alerts" element={<ComingSoon pageName="Alerts & Anomalies" />} />
          <Route path="/reports" element={<ComingSoon pageName="Reports" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;