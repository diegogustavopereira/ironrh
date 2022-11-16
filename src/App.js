import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'
import PeopleList from './components/People/PeopleList/PeopleList';
import NavigationBar from './components/NavigationBar/NavigationBar';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/funcionarios" element={ <PeopleList /> } />
      </Routes>
    </div>
  );
}

export default App;
