import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAdminHandle } from '../../hooks/useAdminHandle'

export const SignInFrom = () => {
    const navigate = useNavigate()
    const {signInAccount} = useAdminHandle()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const onSuccess = (data)=>{
        navigate('/blogs')
        console.log(data);
    }

    const onFail = (err)=>{
        setError(err)
    }

    const handleSignIn = (e)=>{
        e.preventDefault()
        signInAccount({ email, password, onSuccess, onFail })
    }

    return (
        <div>
            <h2>Login: </h2>
            <form onSubmit={handleSignIn}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit'>SignIn</button>
                <button onClick={()=>navigate('/signup')}>Sign Up</button>
            </form>
            {error}
        </div>
    )
}
