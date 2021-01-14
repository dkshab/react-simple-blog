import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../constants/routes";

import { firestore } from "../utilities/firebase";
import { collectIdsAndDocs } from "../utilities/helper-functions";
import CreateNewPost from "./CreateNewPost";
import ModifyPost from "./ModifyPost";
import Post from "./Post";
import PostTile from "./PostTile";

const DisplayAllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [isCreateNewPost, setIsCreateNewPost] = useState(false);
  const [isModifyPost, setIsModifyPost] = useState(false);
  const [editPostId, setEditPostId] = useState("");

  const toggleCreateNewPost = () => {
    setIsCreateNewPost(!isCreateNewPost);
  };
  const toggleModifyPostComponent = () => {
    setIsModifyPost(!isModifyPost);
  };
  const editPost = (id) => {
    setEditPostId(id);
    console.log(id);
    toggleModifyPostComponent();
  };
  const deletePost = (id) => {
    const modifiedPost = allPosts.filter((eachPost) => {
      return eachPost.id !== id;
    });
    setAllPosts(modifiedPost);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await firestore
        .collection("posts")
        .orderBy("createdAt", "desc")
        .limit(4)
        .get();

      const allPosts = snapshot.docs.map(collectIdsAndDocs);

      if (allPosts) {
        setAllPosts(allPosts);
        // console.log(allPosts);
      }
    };

    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isCreateNewPost) {
    return (
      <>
        <CreateNewPost deletePost={deletePost} />
      </>
    );
  } else if (isModifyPost) {
    const post = allPosts.find((post) => {
      return post.id === editPostId;
    });
    return <ModifyPost title={post.title} content={post.content} />;
  }

  return (
    <>
      {!allPosts.length ? (
        <section className="no-post">
          <h1>No Post Found!</h1>
          <h3>There is nothing to see here.</h3>
          <br />
          <br />
          <section className="button-wrapper">
            <button onClick={toggleCreateNewPost} className="button">
              Create New
            </button>
          </section>
        </section>
      ) : (
        <div>
          <h1>All Posts</h1>
          <section className="all-post">
            {allPosts.map((eachPost) => {
              return (
                <PostTile
                  id={eachPost.id}
                  key={eachPost.id}
                  title={eachPost.title}
                  content={eachPost.content}
                />
              );
            })}
            <section className="button-wrapper">
              <Link to={ROUTES.ADDPOST} className="button create-new">
                Create New
              </Link>
            </section>
          </section>
        </div>
      )}
    </>
  );
};
export default DisplayAllPosts;

{
  /* <Post
                  id={eachPost.id}
                  key={eachPost.id}
                  title={eachPost.title}
                  content={eachPost.content}
                  comments={eachPost.comments}
                  stars={eachPost.favorites}
                  createdAt={eachPost.createdAt}
                  user={eachPost.us}
                /> */
}
