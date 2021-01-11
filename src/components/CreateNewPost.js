import React, { useState } from "react";

import { firestore } from "../utilities/firebase";

const initialState = {
  title: "",
  content: "",
  error: null,
};

const CreateNewPost = (props) => {
  const [state, setState] = useState(initialState);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, content } = state;

    const post = {
      title,
      content,
      createdAt: new Date(),
    };

    if (!title || !content) {
      console.log("empty content!");
    } else {
      await firestore
        .collection("posts")
        .add(post)
        .catch((error) => {
          setState({ ...state, error: error });
          console.error(error);
        });
    }

    clear();
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
