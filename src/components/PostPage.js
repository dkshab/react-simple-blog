import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../utilities/firebase";
import { collectIdsAndDocs } from "../utilities/helper-functions";
import Post from "./Post";

const initialState = {
  post: null,
  loading: true,
  error: null,
};

const PostPage = () => {
  const { id } = useParams();
  const [state, setState] = useState(initialState);

  const { post } = state;

  useEffect(() => {
    const postRef = firestore.doc(`posts/${id}`);

    const fetchPost = async () => {
      if (post) return;

      await postRef.get().then((doc) => {
        if (doc.exists) {
          const post = collectIdsAndDocs(doc);
          setState({ error: null, post: post, loading: false });
        } else {
          setState({
            post: null,
            error: "This post in no longer available",
            loading: false,
          });
        }
      });
    };

    fetchPost();
  }, [id, post]);

  return <section>{post && <Post {...post} />}</section>;
};

export default PostPage;
