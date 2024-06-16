import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

const Post = ({ _id, title, summary, content, image, createdAt, author }) => {
    return (
        <Link to={`/post/${_id}`} className='text-black no-underline'>
            <div className='grid grid-cols-2 w-3/4 mx-auto space-x-5 mb-5'>
                <img src={"http://localhost:4000/" + image}
                    alt="cat"
                    className="w-full h-64 rounded-xl"
                />

                <div className='space-y-2'>
                    <h2 className='font-bold'>{title}</h2>

                    <p>
                        {author.username}<br />
                        <time>{format(new Date(createdAt), "MMM d, y h:m b")}</time>
                    </p>

                    <p>{summary}</p>
                </div>
            </div>
        </Link>
    )
}

export default Post