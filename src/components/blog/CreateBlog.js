import RichTextEditor from '@mantine/rte'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useBlogHandle } from '../../hooks/useBlogHandle'
import { Loading } from '../Loading'



export const CreateBlog = ({ editMode }) => {

    const { id } = useParams()
    const navigate = useNavigate()
    const { createBlog, fetchBlogById, updateBlog } = useBlogHandle()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [editBlogLoading, setEditBlogLoading] = useState(false)
    const [content, onChange] = useState('')
    const [blogTitle, setBlogTitle] = useState('')
    const [authorName, setAuthorName] = useState('')

    useEffect(() => {
        if (editMode) {
            setEditBlogLoading(true)
            setLoading(true)
            fetchBlogById({ id, onFetchByIdSuccess, onFail })
        }
    }, [id])

    const onFetchByIdSuccess = (data) => {
        setBlogTitle(data.blogTitle)
        setAuthorName(data.authorName)
        if (data.content) {
            setLoading(false)
            onChange(data.content)
            setTimeout(() => {
                setLoading(false)
            }, 10);
        }
        setEditBlogLoading(false)
    }

    const onSuccess = () => {
        navigate('/blogs')
    }

    const onFail = (err) => {
        setError(err)
    }

    const handleSubmit = () => {
        if (id) {
            updateBlog({ id, blogTitle, authorName, content, onSuccess, onFail })
        } else {
            createBlog({ blogTitle, authorName, content, onSuccess, onFail })
        }

    }

    return (
        <div>
            {editBlogLoading ? <Loading /> :
                <div>
                    <div>
                        <input type="text" value={blogTitle} placeholder='Title of the blog' onChange={(e) => setBlogTitle(e.target.value)} />
                        <input type="text" value={authorName} placeholder='Author name' onChange={(e) => setAuthorName(e.target.value)} />
                        {loading ? <Loading /> :
                            <RichTextEditor value={content} onChange={onChange} placeholder="Type your story" />
                        }
                        <button onClick={handleSubmit}>Submit</button>
                        <button onClick={() => navigate('/blogs')}>Cancel</button>
                    </div>
                    <p>{error}</p>
                </div>
            }
        </div>
    )
}
