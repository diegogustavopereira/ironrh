import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage'
import PeopleList from './components/People/PeopleList/PeopleList';
import NavigationBar from './components/NavigationBar/NavigationBar';
import PeopleDetails from './components/People/PeopleDetails/PeopleDetails';
import AddPeople from './components/People/AddPeople/AddPeople';
import { useState } from 'react';
import ErrorPage from './pages/ErrorPage';

function App() {
  // -------- SETAGEM DA RAIZ DA API --------
  const apiURL = "https://ironrest.cyclic.app/ironrh-91"
  // -------- CRIAÇÃO DE UM ESTADO PARA FORMULÁRIOS
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

  // -------- CRIAÇÃO DE ROTAS COM PATH E QUAL COMPONENTE SERÁ RENDERIZADO EM TELA
  return (
    <div className="App bg-light" style={{ height: '100vh' }}>
      <ToastContainer />
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/funcionarios" element={<PeopleList apiURL={apiURL} />} />
          <Route path="/funcionarios/:id" element={<PeopleDetails apiURL={apiURL} form={form} setForm={setForm} />} />
          <Route path="/cadastrar" element={<AddPeople apiURL={apiURL} form={form} setForm={setForm} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
    </div>
  );
}

export default App;
