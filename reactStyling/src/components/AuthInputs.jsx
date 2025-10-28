import { useState } from 'react';
import { styled } from 'styled-components';
import Button from './Button';
import { CustumInput } from './Input';

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id="auth-inputs">
      <ControlContainer>
        {
        //<p>
          //<Label $invalid={emailNotValid} /*className={`label ${emailNotValid ? 'invalid': ''}`}*/>Email</Label>
          //<Input
            //type="email"
            /*tyle={{background: emailNotValid ? '#f87171':'#d1d5db'}} inline Style*/
            /*className={emailNotValid ? 'invalid' : undefined}*/
            //$invalid={emailNotValid}
            //onChange={(event) => handleInputChange('email', event.target.value)}
          ///>
        //</p>
        }
        {
        //   <p>
        //   <Label /*className={`label ${emailNotValid ? 'invalid': ''}`}*/ $invalid={passwordNotValid}>Password</Label>
        //   <Input
        //     type="password"
        //     /*style={{background: emailNotValid ? '#f87171':'#d1d5db'}} inline Style*/
        //     /*className={passwordNotValid ? 'invalid' : undefined}*/
        //     $invalid={passwordNotValid}
        //     onChange={(event) =>
        //       handleInputChange('password', event.target.value)
        //     }
        //   />
        // </p>
        }
        <CustumInput
          lable="Email"
          type="email"
          invalid={emailNotValid}
          onChange={(event) => handleInputChange('email', event.target.value)}
        />
        <CustumInput
          lable="Password"
          type="password"
          invalid={passwordNotValid}
          onChange={(event) =>
            handleInputChange('password', event.target.value)
          }
        />
      </ControlContainer>
      <div className="actions">
        <button type="button" className="text-button">
          Create a new account
        </button>
        <Button className='button' onClick={handleLogin}>Sign In</Button>
      </div>
    </div>
  );
}
