import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
    ]
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image',
    'font',
    'align'
]


const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!content) {
            alert('Fill Post Content')
            return
        }

        axios.post('http://localhost:4000/create-post', { title, summary, content, image }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('Success')
                } else {
                    console.log('Error')
                }
            })
    }

    return (
        <div>
            <h1 className='text-xl text-center mb-4 font-bold'>Create Post</h1>

            <form onSubmit={handleSubmit} className='w-3/4 mx-auto border border-gray-400 rounded-xl flex flex-col space-y-4 p-5'>
                <input
                    type="text"
                    placeholder='Post Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='px-3 py-1 border border-gray-400 rounded-md'
                    required
                />
                <input
                    type="text"
                    placeholder='Post Summary'
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className='px-3 py-1 border border-gray-400 rounded-md'
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className='px-3 py-3 border border-gray-400 rounded-md'
                    required
                />

                <ReactQuill
                    modules={modules}
                    formats={formats}
                    value={content}
                    onChange={(newValue) => setContent(newValue)}
                    className='border border-gray-300'
                    placeholder='Post Content'
                />

                <button type='submit' className='bg-blue-700 text-white p-1 rounded-md'>Submit</button>
            </form>
        </div>
    )
}

export default CreatePost