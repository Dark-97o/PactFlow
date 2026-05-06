import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import DashWorker from './pages/DashWorker';
import DashCompany from './pages/DashCompany';
import DashAdmin from './pages/DashAdmin';
import JobDetails from './pages/JobDetails';
import Faq from './pages/Faq';
import NFTShop from './pages/NFTShop';
import './index.css';
import './App.css';

import { WalletProvider } from './context/WalletContext';

function App() {
  return (
    <WalletProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard/worker" element={<DashWorker />} />
          <Route path="/dashboard/company" element={<DashCompany />} />
          <Route path="/dashboard/admin" element={<DashAdmin />} />
          <Route path="/jobs/:jobId" element={<JobDetails />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
      </Router>
    </WalletProvider>
  );
}

export default App;

// fix: NFT mint failure when user has zero XLM balance [v4.2.3-2026-05-04]

// docs: document environment variables in README [v8.6.48-2026-05-06]
