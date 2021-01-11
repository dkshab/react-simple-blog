import React from "react";

const Post = ({ title, content, editPost, deletePost, id }) => {
  console.log("Post Id: ", id);

  return (
    <>
      <section>
        <h3>{title} </h3>
        <p>{content}</p>
        <button onClick={() => editPost(id)}>Edit</button>
        <button onClick={() => deletePost(id)}>Delete</button>
      </section>
    </>
  );
};

export default Post;
