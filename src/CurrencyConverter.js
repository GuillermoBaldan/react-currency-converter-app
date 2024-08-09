// src/CurrencyConverter.js
import React, { useState, useEffect } from 'react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [conversionRate, setConversionRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = 'TU_API_KEY_AQUI'; // Reemplaza esto con tu API key de la API de tasas de cambio

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetchConversionRate();
    }
  }, [fromCurrency, toCurrency]);

  const fetchConversionRate = async () => {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`);
      const data = await response.json();
      if (data.result === 'error') {
        throw new Error(data['error-type']);
      }
      setConversionRate(data.conversion_rate);
      setConvertedAmount((amount * data.conversion_rate).toFixed(2));
      setError(null);
    } catch (err) {
      setError(err.message);
      setConversionRate(null);
      setConvertedAmount(null);
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (conversionRate) {
      setConvertedAmount((value * conversionRate).toFixed(2));
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Currency Converter</h1>
      <div>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          style={{ padding: '10px', fontSize: '16px', width: '100px', marginRight: '10px' }}
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          <option value="AUD">AUD</option>
        </select>
        <span style={{ fontSize: '24px', margin: '0 10px' }}>to</span>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          <option value="AUD">AUD</option>
        </select>
      </div>
      {error ? (
        <p style={{ color: 'red', marginTop: '20px' }}>Error: {error}</p>
      ) : (
        convertedAmount && (
          <p style={{ fontSize: '24px', marginTop: '20px' }}>
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </p>
        )
      )}
    </div>
  );
};

export default CurrencyConverter;
