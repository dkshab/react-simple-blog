import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, createUserProfileDocument } from "../utilities/firebase";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  error: null,
};

const SignUp = () => {
  const [state, setState] = useState(initialState);
  const { displayName, email, password } = state;

  const history = useHistory();

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password } = state;

    if (!displayName || !email || !password) {
      console.log("Sign Up empty content!");
    } else {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password
        );

        createUserProfileDocument(user, { displayName });
        clear();
        history.push("/");
      } catch (error) {
        console.error(error);
        setState({ error: error });
      }
    }
  };

  const clear = () => {
    setState(initialState);
  };

  return (
    <div className="SignUp">
      <form className="SignUp__form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="text"
          name="displayName"
          placeholder="Display Name"
          value={displayName}
          onChange={handleChange}
        />
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
    </div>
  );
};

export default SignUp;
