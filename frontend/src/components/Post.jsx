import React from 'react'

const Post = () => {
    return (
        <div className='grid grid-cols-2 w-3/4 mx-auto space-x-5 mb-5'>
            <img src="https://cdn.pixabay.com/photo/2023/03/28/13/28/ai-generated-7883147_1280.jpg"
                alt="cat"
                className="w-full h-64 rounded-xl"
            />

            <div className='space-y-2'>
                <h2 className='font-bold'>AI Cat</h2>

                <p>
                    by hamzee
                    <time> at 2024-6-10</time>
                </p>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate magni ex quam, totam, similique facilis impedit esse molestiae nulla possimus praesentium. Iste hic asperiores quae laborum a inventore, dignissimos iusto mollitia rem quod numquam ipsam reiciendis nesciunt ad molestiae ex repudiandae natus molestias facere minus? Sequi eos quod esse impedit!</p>
            </div>
        </div>
    )
}

export default Post