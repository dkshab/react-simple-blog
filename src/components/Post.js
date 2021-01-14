import React from "react";
import moment from "moment";

import { useCurrentUserValue } from "../context";

const belongsToCurrentUser = (currentUser, postAuthor) => {
  if (!currentUser) return false;

  return currentUser.uid === postAuthor.uid;
};

const Post = ({ title, content, user, stars, comments, createdAt }) => {
  const { currentUser } = useCurrentUserValue();
  // console.log(user);
  return (
    <div className="Post">
      <>
        <div className="Post__content">
          <h3>{title}</h3>
          <p>{content}</p>
        </div>
        <div className="Post__meta">
          <p>
            <span role="img" aria-label="star">
              ⭐️
            </span>
            {stars}
          </p>
          <p>
            <span role="img" aria-label="comments">
              🙊
            </span>
            {comments}
          </p>
          <p>Posted by {user.displayName}</p>
          <p>{moment(createdAt.toDate()).calendar()}</p>
        </div>

        {belongsToCurrentUser(currentUser, user) && (
          <div className="buttons">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        )}
      </>
    </div>
  );
};

export default Post;
