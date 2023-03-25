import Navbar from './components/Navbar';
import Homepage from './pages/Home';
import AddTaskPage from './pages/AddTask';
import EditTaskPage from './pages/EditTask';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/add-task" element={<AddTaskPage />}></Route>
        <Route path="/edit-task/:taskId" element={<EditTaskPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
