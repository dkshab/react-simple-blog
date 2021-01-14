import React from "react";
import { Link } from "react-router-dom";

const PostTile = ({ id, title, content }) => {
  return (
    <div className="PostTile">
      <h3>
        <Link to={`/posts/${id}`}>{title}</Link>
      </h3>
      <p>{content}</p>
    </div>
  );
};

export default PostTile;
