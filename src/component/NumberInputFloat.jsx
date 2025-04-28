import React, { useState, useEffect } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";


const NumberInputFloat = ({ value, onChange, placeholder }) => {
  
  const [displayValue, setDisplayValue] = useState("");
  

  useEffect(() => {
    if (value === undefined || value === null || value === '') {
      setDisplayValue('');
      return;
    }
    
    const formatted = formatValue(value);
    setDisplayValue(formatted);
  }, [value]);
  
  const formatValue = (val) => {
    if (!val && val !== 0) return '';
    
    let num;
    if (typeof val === 'string') {
      let cleaned = val;
      if (cleaned.endsWith('.0')) {
        cleaned = cleaned.substring(0, cleaned.length - 2);
      }
      num = Number(cleaned);
    } else {
      num = Number(val);
    }
    
    if (isNaN(num)) return '';
    
    return num.toLocaleString('es-CL', {maximumFractionDigits: 0});
  };
  
  const handleInputChange = (e) => {
    const valueString = e.target.value;
    console.log('NumberInputFloat - entrada del usuario:', valueString);
    
    if (/^[0-9.,]*$/.test(valueString) || valueString === '') {
      setDisplayValue(valueString);
      
      if (valueString) {
        const withoutSeparators = valueString.replace(/\./g, '').replace(',', '');
        
        let numericValue = Number(withoutSeparators);
        
        if (!isNaN(numericValue)) {
          console.log('NumberInputFloat - valor numérico a enviar:', numericValue);
          onChange(numericValue);
        }
      } else {

        onChange(0);
      }
    }
  };
  
  const handleBlur = () => {
    if (!displayValue) {
      setDisplayValue("");
      return;
    }
    
    try {
      const clean = displayValue.replace(/\./g, '').replace(',', '');
      
      const num = Number(clean);
      
      if (!isNaN(num)) {
        const formatted = num.toLocaleString('es-CL', {maximumFractionDigits: 0});
        setDisplayValue(formatted);
      }
    } catch (error) {
      console.error('Error al formatear en blur:', error);
    }
  };

  return (
    <InputGroup>
      <Input
        value={displayValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        textAlign="left"
        borderRadius="5px"
        fontSize="16px"
      />
    </InputGroup>
  );
};

export default NumberInputFloat;