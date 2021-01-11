import React from "react";

const ModifyPost = ({
  title,
  content,
  updatePost,
  savePostTitleToState,
  savePostContentToState,
}) => {
  return (
    <>
      <form>
        <h1>Modify Post</h1>
        <input
          defaultValue={title}
          onChange={savePostTitleToState}
          type="text"
          placeholder="title"
          size="39"
          required
        ></input>
        <br />
        <br />
        <textarea
          defaultValue={content}
          onChange={savePostContentToState}
          placeholder="contents"
          rows="8"
          cols="41"
          required
        ></textarea>
        <br />
        <br />
        <button>Update Post</button>
      </form>
    </>
  );
};

export default ModifyPost;
