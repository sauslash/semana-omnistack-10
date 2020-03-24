//3 conceitos principais do react
//Componente - Bloco isolado de html, css e js, o qual não interfere no restante da aplicação
//Propriedades - Informações que o componente pai passa para o componente filho
//Estado - Informações mantidas pelo componente (lembrar imutabilidade)

// <> - conceito do fragment, para renderizar varios componentes dentro do return sem usar uma div por exemplo

import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

function App() {

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('devs');
      setDevs(response.data);
    }

    loadDevs();

  }, []);

  async function handleAddDev(data) {

    const response = await api.post('/devs', data);
    setDevs([...devs, response.data]);

  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
