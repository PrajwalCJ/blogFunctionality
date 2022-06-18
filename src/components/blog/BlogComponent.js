import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Loading } from '../Loading'

export const BlogComponent = (props) => {

    const [error, setError] = useState('')
    const [editDisabled, setEditDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onFail = (err)=>{
        setError(false)
        setError(err)
    }

    return (
        <div>
            <Link to={`/blogs/edit/${props.id}`}>
                <button onClick={()=> setEditDisabled(true)} disabled={editDisabled} >edit</button>
            </Link>
            <button onClick={()=> {props.deleteBlog({id: props.id, onFail}); setLoading(true)}} >{loading?<Loading/>:'delete'}</button>
            {error}
            <div>
                <h2>{props.title}</h2>
                <p>Author: {props.author}</p>
                <p>Creation date: {props.timeStamp.toDate().toString()}</p>
            </div>
        </div>
    )
}
