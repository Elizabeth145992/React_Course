import { useState } from 'react';
import Header from './components/Header.jsx';
import UserInput from './components/UserInput.jsx';
import Results from './components/Results.jsx';
import { use } from 'react';

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 1000,
    annualInvestment: 1200,
    expectedReturn: 7,
    duration: 10,
  });

  const userInputIsValid = userInput.duration >= 1;

  function handleChange(inputType, value) {
    console.log(inputType, value);
    setUserInput((prevInput) => ({
      ...prevInput,
      [inputType]: parseFloat(value),
    }));
  }
  return (
    <>
      <Header />
      <UserInput onChangeInput={handleChange} userInput={userInput} />
      {userInputIsValid && <Results input={userInput} />}
      {!userInputIsValid && <p className='center'>Duration must be at least 1 year.</p>}
    </>
  )
}

export default App
