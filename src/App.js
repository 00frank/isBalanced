import React, { useState, useEffect } from 'react'
import isBalancedValidator from './utils/isBalancedValidator';
import './App.css';

function App() {
  const [msg, setMsg] = useState("")
  const [isBalanced, setIsBalanced] = useState(true)

  useEffect(() => {
    if (msg) {
      let result = isBalancedValidator(msg);
      result = result === "balanceado" ? true : false;
      setIsBalanced(result);
    }
  }, [msg])

  return (
    <div className="App">
      <input type="text" value={msg} onChange={e => { setMsg(e.target.value) }} />
      <span className="info">Ingrese texto dentro de la casilla para validar si esta balanceado o no</span>
      {msg && <span className={isBalanced ? "balanced" : "not-balanced"}>{isBalanced ? "Esta balanceado" : "NO esta balanceado"}</span>}
    </div>
  );
}

export default App;
