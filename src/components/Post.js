import React from 'react'


const Post = ({ title, content }) => {
    return (
        <>
            <section>
                <h3>{title} </h3>
                <p>{content}</p>
                <button>Edit</button>
                <button>Delete</button>

            </section>
        </>
    )

}

export default Post