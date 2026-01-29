import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://YOUR_SUPABASE_URL.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {
    const savedBalance = localStorage.getItem('balance');
    const savedTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    setBalance(savedBalance ? parseFloat(savedBalance) : 0);
    setTransactions(savedTransactions);
  }, []);
  
  const addTransaction = (type, value) => {
    const newBalance = type === 'Depósito' ? balance + value : balance - value;
    setBalance(newBalance);
    const newTransaction = { type, value };
    const newTransactions = [...transactions, newTransaction];
    setTransactions(newTransactions);
    localStorage.setItem('balance', newBalance);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Luan Finance</h1>
      <div className="bg-gray-800 p-4 rounded mb-4 text-center">
        <h2 className="text-xl">Saldo Atual</h2>
        <p className="text-3xl mt-2">R$ {balance.toFixed(2)}</p>
      </div>
      <div className="flex gap-2 mb-4 justify-center">
        <button onClick={() => addTransaction('Depósito', 100)} className="bg-green-500 p-2 rounded">Depositar +100</button>
        <button onClick={() => addTransaction('Saque', 50)} className="bg-red-500 p-2 rounded">Sacar -50</button>
      </div>
      <div className="bg-gray-800 p-4 rounded">
        <h2 className="text-xl mb-2">Transações</h2>
        <ul>
          {transactions.map((t,i) => <li key={i} className="flex justify-between">{t.type}<span>R$ {t.value}</span></li>)}
        </ul>
      </div>
    </div>
  );
}