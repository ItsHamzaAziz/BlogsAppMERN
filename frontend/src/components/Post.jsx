import React from 'react'
import { format } from 'date-fns'

const Post = ({_id, title, summary, content, image, createdAt, author}) => {
    return (
        <div className='grid grid-cols-2 w-3/4 mx-auto space-x-5 mb-5'>
            <img src="https://cdn.pixabay.com/photo/2023/03/28/13/28/ai-generated-7883147_1280.jpg"
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
    )
}

export default Post