import React, { useState, useEffect } from 'react';

const FormattedNumberInput = ({ value, onChange, placeholder, name }) => {
  const formatCurrency = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    })
      .format(value)
      .replace('IDR', '')
      .trim();
  };

  const [formattedValue, setFormattedValue] = useState(formatCurrency(value));

  useEffect(() => {
    setFormattedValue(formatCurrency(value));
  }, [value]);

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, ''); // Hanya angka
    onChange(name, rawValue); // Mengirimkan nilai asli ke parent

    const formattedValue = formatCurrency(rawValue);
    setFormattedValue(formattedValue);
  };

  return (
    <input
      type="text"
      className="form-control"
      value={formattedValue}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default FormattedNumberInput;
