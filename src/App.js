import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'
import PeopleList from './components/People/PeopleList/PeopleList';
import NavigationBar from './components/NavigationBar/NavigationBar';
import PeopleDetails from './components/People/PeopleDetails/PeopleDetails';
import AddPeople from './components/People/AddPeople/AddPeople';
import { useState } from 'react';

function App() {
  const apiURL = "https://ironrest.cyclic.app/ironrh-91"
  const [form, setForm] = useState({
    name: "",
    salary: "",
    email: "",
    phone: "",
    department: "",
    admissionDate: "",
    status: "",
    active: true
  })

  return (
    <div className="App bg-light" style={{ height:'100vh'}}>
      <NavigationBar />
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/funcionarios" element={ <PeopleList apiURL={ apiURL } /> } />
        <Route path="/funcionarios/:id" element={ <PeopleDetails apiURL={ apiURL } form={ form } setForm={ setForm } /> } />
        <Route path="/cadastrar" element={ <AddPeople apiURL={ apiURL } form={ form } setForm={ setForm } /> } />
      </Routes>
    </div>
  );
}

export default App;
