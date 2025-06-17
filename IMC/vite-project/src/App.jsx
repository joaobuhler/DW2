import { useState } from 'react';
import './App.css';

function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [categoria, setCategoria] = useState('');

  function calcularIMC() {
    const p = parseFloat(peso);
    const a = parseFloat(altura);

    if (!p || !a) {
      alert('Coloque seu peso e sua altura');
      return;
    }

    const resultado = p / (a * a);
    setImc(resultado);

    if (resultado < 18.5) setCategoria('Baixo peso');
    else if (resultado < 25) setCategoria('Peso normal');
    else if (resultado < 30) setCategoria('Excesso de peso');
    else if (resultado < 35) setCategoria('Obesidade de classe 1');
    else if (resultado < 40) setCategoria('Obesidade de classe 2');
    else setCategoria('Obesidade de classe 3');
  }

  return (
    <div className="container">
      <h1>Calculadora IMC</h1>
      <div>
        <label>Peso em kg </label>
        <input
          type="number"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
        />
      </div>
      <div>
        <label>Altura em metros </label>
        <input
          type="number"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
        />
      </div>
      <button onClick={calcularIMC}>Calcular IMC</button>

      {imc && (
        <div className="resultado">
          <p>IMC: {imc.toFixed(2)}</p>
          <p>Categoria: {categoria}</p>
        </div>
      )}
    </div>
  );
}

export default App;
