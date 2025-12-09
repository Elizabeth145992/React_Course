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
  }

  return (
    <>
      <Header />
      <main>
        <ConfugureCounter onChooseCount={handleChooseCount} />
        <Counter initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
