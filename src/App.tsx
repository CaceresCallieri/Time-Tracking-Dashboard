import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TimeTrackingDashboard from "./components/TimeTrackingDashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TimeTrackingDashboard />
    </QueryClientProvider>
  );
}

export default App;
