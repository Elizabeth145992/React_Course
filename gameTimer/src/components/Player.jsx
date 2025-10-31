import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef("");
  const [nameInput, setNameInput] = useState("");



  function handleSubmit(){
    setNameInput(playerName.current.value);
    console.log(playerName.current.type);
  }

  return (
    <section id="player">
      <h2>Welcome {nameInput ?? 'unknown entity'}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleSubmit}>Set Name</button>
      </p>
    </section>
  );
}
