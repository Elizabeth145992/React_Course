import { useState } from "react";

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
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={(event) => handleValueChange('email', event.target.value)}
            onBlur={() => handleInputs("email")}
            value={enteredValues.email}
          />
          <div className="control-error">
            {isValidEmail && <p className="error-text">Please enter a valid email address.</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) => handleValueChange('password', event.target.value)}
            onBlur={() => handleInputs("password")}
            value={enteredValues.password}
          />
          <div className="control-error">
            {isValidPassword && <p className="error-text">Password must be at least 6 characters long.</p>}
          </div>
        </div>
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
