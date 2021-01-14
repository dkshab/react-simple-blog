import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../utilities/firebase";

const initialState = {
  email: "",
  password: "",
  error: null,
};

const SignIn = () => {
  const [state, setState] = useState(initialState);
  const { email, password, error } = state;

  const history = useHistory();

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = state;

    if (!email || !password) {
      console.log("Empty Sign In Content!");
    } else {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log(state);
          clear();
          history.push("/");
        })
        .catch(() => {
          console.error(error);
          setState({ error: error });
        });
    }
  };

  const clear = () => {
    setState(initialState);
  };

  return (
    <div className="SignIn">
      <form className="SignIn__form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
        <input type="submit" value="Sign In" />
      </form>
      {state.error && <p className="help">{state.error.message}</p>}
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

export default SignIn;
