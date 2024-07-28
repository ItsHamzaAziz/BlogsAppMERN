import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import { useParams, useNavigate } from 'react-router-dom'
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
    ],
    clipboard: {
        matchVisual: false
    }
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image',
    'font',
    'align'
]

const EditPost = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:4000/post/${id}`)
            .then(response => {
                setTitle(response.data.title)
                setSummary(response.data.summary)
                setContent(response.data.content)
            })
            .catch(error => console.error(error))
    }, [])
    


    const handleSubmit = (e) => {
        e.preventDefault()

        if (!content) {
            alert('Fill Post Content')
            return
        }


        axios.put(`http://localhost:4000/post/${id}`, { title, summary, content, image }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })
            .then(response => {
                if (response.status === 200) {
                    navigate(`/post/${id}`)
                } else {
                    console.log('Error')
                }
            })
    }


    return (
        <div>
            <h1 className='text-xl text-center mb-4 font-bold'>Update Post</h1>

            <form onSubmit={handleSubmit} className='w-3/4 mx-auto border border-gray-400 rounded-xl flex flex-col space-y-4 p-5'>
                <input
                    type="text"
                    placeholder='Post Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='px-3 py-2 border border-solid border-gray-400 rounded-md'
                    required
                />
                <input
                    type="text"
                    placeholder='Post Summary'
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className='px-3 py-2 border border-solid border-gray-400 rounded-md'
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className='p-3 border border-solid border-gray-400 rounded-md'
                />

                <ReactQuill
                    modules={modules}
                    formats={formats}
                    value={content}
                    onChange={(newValue) => setContent(newValue)}
                    className='border border-gray-300'
                    placeholder='Post Content'
                />

                <button type='submit' className='bg-blue-700 text-white p-2 rounded-md border-none cursor-pointer'>Submit</button>
            </form>
        </div>
    )
}

export default EditPost