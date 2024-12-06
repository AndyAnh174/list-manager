import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import CRUDMain from './components/CRUD/CRUDMain';
import Create from './components/CRUD/Create';
import Read from './components/CRUD/Read';
import Update from './components/CRUD/Update';
import Delete from './components/CRUD/Delete';
import History from './components/CRUD/History';
import ChartMain from './components/Chart/ChartMain';
import CleanMain from './components/Clean/CleanMain';

function AppContent() {
  const navigate = useNavigate();

  // CRUD Navigation
  const navigateToHome = () => navigate('/');
  const navigateToCreate = () => navigate('/crud/create');
  const navigateToRead = () => navigate('/crud/read');
  const navigateToUpdate = () => navigate('/crud/update');
  const navigateToDelete = () => navigate('/crud/delete');
  const navigateToHistory = () => navigate('/crud/history');
  const navigateBackToCRUD = () => navigate('/crud');
  const navigateToClean = () => navigate('/clean');

  return (
    <Routes>
      <Route path="/" element={<Home navigateToClean={navigateToClean} />} />
      
      {/* CRUD Routes */}
      <Route
        path="/crud"
        element={
          <CRUDMain
            navigateToCreate={navigateToCreate}
            navigateToRead={navigateToRead}
            navigateToUpdate={navigateToUpdate}
            navigateToDelete={navigateToDelete}
            navigateToHistory={navigateToHistory}
            navigateToHome={navigateToHome}
          />
        }
      />
      <Route
        path="/crud/create"
        element={<Create navigateBack={navigateBackToCRUD} navigateHome={navigateToHome} />}
      />
      <Route
        path="/crud/read"
        element={<Read navigateBack={navigateBackToCRUD} navigateHome={navigateToHome} />}
      />
      <Route
        path="/crud/update"
        element={<Update navigateBack={navigateBackToCRUD} navigateHome={navigateToHome} />}
      />
      <Route
        path="/crud/delete"
        element={<Delete navigateBack={navigateBackToCRUD} navigateHome={navigateToHome} />}
      />
      <Route
        path="/crud/history"
        element={<History navigateBack={navigateBackToCRUD} navigateHome={navigateToHome} />}
      />

      {/* Chart Route */}
      <Route
        path="/chart"
        element={<ChartMain navigateToHome={navigateToHome} />}
      />

      {/* Clean Route */}
      <Route
        path="/clean"
        element={<CleanMain navigateToHome={navigateToHome} />}
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
