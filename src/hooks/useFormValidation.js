import { useState, useCallback } from 'react';

export default function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const input = e.target;
    const { value, name } = input;
    setValues({ ...values, [name]: value }); 
    setErrors({ ...errors, [name]: input.validationMessage }); 
    setIsValid(input.closest('form').checkValidity()); 
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => { 
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, resetForm, errors, isValid };
}