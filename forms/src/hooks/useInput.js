import { useState } from "react";

export function useInput(initialValue, fnValidator) {
  const [enteredValue, setEnteredValue] = useState(initialValue);
  const [didEdit, setDidEdit] = useState(false);

  const isValidValue = fnValidator(enteredValue);
  function handleValueChange(event) {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  }

  function handleInputs() {
    setDidEdit(true);
  }

  function reset() {
    setEnteredValue(initialValue);
    setDidEdit(false);
  }

  return {
    value: enteredValue,
    handleValueChange,
    handleInputs,
    reset,
    hasError: !isValidValue && didEdit,
  }
}
