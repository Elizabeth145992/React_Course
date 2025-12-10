import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import ConfugureCounter from './components/Counter/ConfigureCounter.jsx';
import { log } from './log.js';

function App() {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  function handleChooseCount(newCount) {
    setChosenCount(newCount);
    //setChosenCount((prevCount) => prevCount + 1); // Esto se hace cuando se quiere acceder al valor previo del estado
  }

  return (
    <>
      <Header />
      <main>
        <ConfugureCounter onChooseCount={handleChooseCount} />
        <Counter key={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
