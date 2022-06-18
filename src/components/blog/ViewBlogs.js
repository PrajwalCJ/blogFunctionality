import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useAdminHandle } from '../../hooks/useAdminHandle'
import { useBlogHandle } from '../../hooks/useBlogHandle'
import { Loading } from '../Loading'
import { BlogComponent } from './BlogComponent'

export const ViewBlogs = () => {
    const navigate = useNavigate()
    const admin = useSelector((state) => state.admin.admin)
    const { signOutAccount } = useAdminHandle()
    const { fetchBlogs, currentBlogs, fetchNextBlogs, fetchPreviousBlogs, fetchBlogCount, blogCount, pageNumber, deleteBlog } = useBlogHandle()
    const [error, setError] = useState('')
    const [blogsLoading, setBlogsLoading] = useState(true)
    const [numberOfBlogs, setNumberOfBlogs] = useState(3)

    const onFail = (err) => {
        setError(err)
    }

    useEffect(() => {
        if (numberOfBlogs) {
            fetchBlogs({ numberOfBlogs, onFail })
        }
        fetchBlogCount()
    }, [numberOfBlogs])

    useEffect(() => {
        if (currentBlogs.length !== 0) {
            setBlogsLoading(false)
        }
    }, [currentBlogs])

    const handleSignOut = () => {
        signOutAccount(onFail)
        navigate('/signin')
    }

    return (
        <div>
            {blogsLoading ? <Loading /> :
                <div>
                    <h3>Total blogs: {blogCount}</h3>
                    <input type="number" value={numberOfBlogs} onChange={e => { setNumberOfBlogs(e.target.value) }} />
                    <button onClick={() => { navigate('/blogs/add'); }}>Create Blog</button>
                    {admin ?
                        <button onClick={handleSignOut}>Sign Out</button> : null
                    }
                    {error}
                    {currentBlogs.map(blog => <BlogComponent key={blog.id} id={blog.id}
                        title={blog.blogTitle}
                        author={blog.authorName}
                        timeStamp={blog.timeStamp}
                        deleteBlog={deleteBlog}
                    />)}
                    <button onClick={() => fetchPreviousBlogs(numberOfBlogs)}>Prev</button>
                    <span>{pageNumber}/{Math.ceil(blogCount / numberOfBlogs)}</span>
                    <button onClick={() => fetchNextBlogs(numberOfBlogs)}>Next</button>
                </div>
            }
        </div>
    )
}
