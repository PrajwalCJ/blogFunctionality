import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAdminHandle } from '../../hooks/useAdminHandle'

export const SignUpForm = () => {
    const navigate = useNavigate()
    const {createAccountWithEmail} = useAdminHandle()
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

    const handleSignUp = (e)=>{
        e.preventDefault()
        createAccountWithEmail({ email, password, onSuccess, onFail })
    }

    return (
        <div>
            <h2>Create Account: </h2>
            <form onSubmit={handleSignUp}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit'>SignUp</button>
                <button onClick={()=>navigate('-1')}>Back</button>
            </form>
            {error}
        </div>
    )
}
