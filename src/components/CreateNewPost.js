import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useCurrentUserValue } from "../context";

import { firestore } from "../utilities/firebase";

const initialState = {
  title: "",
  content: "",
  error: null,
};

const CreateNewPost = () => {
  const [state, setState] = useState(initialState);
  const history = useHistory();
  const currentUser = useCurrentUserValue();

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, content } = state;

    if (!title || !content || !currentUser) {
      console.log("empty content! or not logged in");
    } else {
      const tempCurrentUser = currentUser.currentUser;
      const { uid, displayName, email, photoURL } = tempCurrentUser || {};

      const post = {
        title,
        content,
        createdAt: new Date(),
        user: {
          uid,
          displayName,
          email,
          photoURL,
        },
        favorites: 0,
        comments: 0,
      };

      await firestore
        .collection("posts")
        .add(post)
        .then(() => {
          clear();
          history.push("/");
        })
        .catch((error) => {
          setState({ ...state, error: error });
          console.error(error);
        });
    }
  };

  const clear = () => {
    setState(initialState);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Create New Post</h1>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="title"
          size="39"
          // required
          value={state.title}
        ></input>
        <br />
        <br />
        <textarea
          name="content"
          onChange={handleChange}
          value={state.content}
          placeholder="contents"
          rows="8"
          cols="41"
          //  required
        ></textarea>
        <br />
        <br />
        <button>Save Post</button>
      </form>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  );
};
export default CreateNewPost;
