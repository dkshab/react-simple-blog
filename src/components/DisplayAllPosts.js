import React, { useRef, useState } from 'react';
import CreateNewPost from './CreateNewPost';
import Post from './Post';


const DisplayAllPosts = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [allPosts, setAllPosts] = useState([]);
    const [isCreateNewPost, setIsCreateNewPost] = useState(false);
    const [isModifyPost, setIsModifyPost] = useState(false);
    const [editPostId, setEditPostId] = useState('');
    // Initialize useRef
    const getTitle = useRef();
    const getContent = useRef();

    const savePostTitleToState = event => {
        setTitle(event.target.value);
    };
    const savePostContentToState = event => {
        setContent(event.target.value);
    };

    const toggleCreateNewPost = () => {
        setIsCreateNewPost(!isCreateNewPost);
    }

    const toggleModifyPostComponent = () => {
        setIsModifyPost(!isModifyPost)
    }

    const editPost = id => {
        setEditPostId(id);
        toggleModifyPostComponent();
    }

    const savePost = event => {
        event.preventDefault();
        const id = Date.now()
        setAllPosts([...allPosts, { title, content, id }]);
        console.log(allPosts);
        getTitle.current.value = "";
        getContent.current.value = "";
        toggleCreateNewPost()
    };

    if (isCreateNewPost) {
        return (
            <>
                <CreateNewPost
                    savePostTitleToState={savePostTitleToState}
                    savePostContentToState={savePostContentToState}
                    getTitle={getTitle}
                    getContent={getContent}
                    savePost={savePost}
                />
            </>
        );
    }
    return (
        <>
            <h2>All Posts</h2>
            {allPosts.length ? (
                allPosts.map(eachPost => {
                    return (
                        <Post
                            id={eachPost.id}
                            key={eachPost.id}
                            title={eachPost.title}
                            content={eachPost.content}
                        />
                    )
                })
            ) : (<div>
                <h3>There is nothing to see here!</h3>
            </div>)}
            <br />
            <br />
            <button onClick={toggleCreateNewPost}>Create New</button>
            {/* <pre>{JSON.stringify(allPosts, null, 2)}</pre> */}
        </>
    )
};
export default DisplayAllPosts;