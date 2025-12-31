import { useState } from "react";
import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";
import { useInput } from "../hooks/useInput";

export default function Login() {
  const {
    value: emailValue,
    handleValueChange: handleEmailChange,
    handleInputs: handleEmailInputs,
    reset: resetEmail,
    hasError: isValidEmail,
  } = useInput("", (value) => isNotEmpty(value) && isEmail(value));

  const {
    value: passwordValue,
    handleValueChange: handlePasswordChange,
    handleInputs: handlePasswordInputs,
    reset: resetPassword,
    hasError: isValidPassword,
  } = useInput("", (value) => isNotEmpty(value) && hasMinLength(value, 6));

  function handleSubmit(event) {
    event.preventDefault();

    if(isValidEmail || isValidPassword) {
      return;
    }
    resetEmail();
    resetPassword();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          error={isValidEmail ? "Please enter a valid email." : null}
          onChange={handleEmailChange}
          onBlur={handleEmailInputs}
          value={emailValue}
        />

        <Input
          label="Password"
          id="password"
          error={
            isValidPassword
              ? "Password must be at least 6 characters long."
              : null
          }
          onChange={handlePasswordChange}
          onBlur={handlePasswordInputs}
          value={passwordValue}
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
