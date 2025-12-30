import { useState } from "react";
import Input from "./Input";

export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: ""
  });
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false
  });

  const isValidEmail = didEdit.email && !enteredValues.email.includes("@");
  const isValidPassword = didEdit.password && !enteredValues.password.trim().length <= 4;

  function handleInputs(identifier) {
    setDidEdit((prevDidEdit) => ({
      ...prevDidEdit,
      [identifier]: true
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted values:", enteredValues);
    setEnteredValues({
      email: "",
      password: ""
    });
  }

  function handleValueChange(field, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [field]: value
    }));

    setDidEdit((prevDidEdit) => ({
      ...prevDidEdit,
      [field]: true
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          error={isValidEmail ? "Please enter a valid email." : null}
          onChange={(event) => handleValueChange('email', event.target.value)}
          onBlur={() => handleInputs("email")}
          value={enteredValues.email}
        />

        <Input
          label="Password"
          id="password"
          error={isValidPassword ? "Password must be at least 6 characters long." : null}
          onChange={(event) => handleValueChange('password', event.target.value)}
          onBlur={() => handleInputs("password")}
          value={enteredValues.password}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button type="button" className="button" onClick={handleSubmit}>
          Login
        </button>
      </p>
    </form>
  );
}
