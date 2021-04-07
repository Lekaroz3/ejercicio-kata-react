import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FormularioKata } from './FormKata';
import { ICiudad, IPescado } from './Interfaces/Interfaces';




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Consulta Mejor Destino</h2>
        <FormularioKata/>
      </header>
    </div>
  );
}

export default App;
