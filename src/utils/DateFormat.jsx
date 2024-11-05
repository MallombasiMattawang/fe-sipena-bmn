// src/utils/dateHelper.js

export const dateFormat = (date, options) => {
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    
    const formatOptions = { ...defaultOptions, ...options };
  
    return new Date(date).toLocaleDateString('id-ID', formatOptions);
  };
  