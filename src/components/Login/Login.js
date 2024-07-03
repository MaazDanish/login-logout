// Write your code at relevant places in the code below:

import React, { useEffect, useState, useReducer, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../Input/Input";

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.payload, isValid: action.payload.includes('@') }
  }
  if (action.type === 'USER_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false }
}

const passwordReducer = (state, action) => {
  if (action.type === 'PASSWORD_INPUT') {
    return { value: action.payload, isValid: action.payload.trim().length > 6 }
  }
  if (action.type === 'PASSWORD_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: '', isValid: false };
}


const Login = (props) => {

  const [formIsValid, setFormIsValid] = useState(false);
  const emailRef = useRef(null);

  // use reducer hook
  const [emailState, dispatchEmailFunction] = useReducer(emailReducer, { value: '', isValid: null });
  const [passwordState, dispatchPasswordFunction] = useReducer(passwordReducer, { value: '', isValid: null });


  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    // this willl render it once only
    emailRef.current.focus();
    console.log(emailRef);

  }, []);


  useEffect(() => {
    const timerId = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid)
    }, 500)

    return () => {
      clearTimeout(timerId);
    }
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmailFunction({ type: 'USER_INPUT', payload: event.target.value });

    // setFormIsValid(
    //   event.target.value.includes("@") && passwordState.value.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPasswordFunction({ type: 'PASSWORD_INPUT', payload: event.target.value });
    // setFormIsValid(
    //   event.target.value.trim().length > 6 && emailState.isValid
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmailFunction({ type: 'INPUT_BLUR' })
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPasswordFunction({ type: 'PASSWORD_BLUR' })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          emailRef={emailRef}
          type="email"
          id="email"
          label='E-Mail'
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          type="password"
          id="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          isValid={passwordIsValid}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
