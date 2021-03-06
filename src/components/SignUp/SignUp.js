import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init'
const SignUp = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [error,setError]=useState('')
    const navigate =useNavigate()

    const [ createUserWithEmailAndPassword,user]=useCreateUserWithEmailAndPassword(auth);
    if(user){
        navigate('/login')
    }

    const hanndleEmailBlur =event=>{
        setEmail(event.target.value)
    }
    const handlePasswordBlur=event=>{
        setPassword(event.target.value)
    }
    const handleConfirmPassword=event=>{
        setConfirmPassword(event.target.value)
    }
    const handleCreateUser=event=>{
        event.preventDefault()
        if(password!==confirmPassword){
            setError('Your two password did not match')
        }
        if(password.length <6){
            setError('Password must contain atleast six character')
            return;
        }
        setError('')
        createUserWithEmailAndPassword(email,password);

    }
    return (
        <div className='form-container'>
        <div>
        <h1 className='form-title'>Sign Up</h1>
        <form onSubmit={handleCreateUser} >
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input onBlur={hanndleEmailBlur} type="email" name='email'  required/>
            </div>
            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input      onBlur={handlePasswordBlur} type="password" name='password'  required/>
            </div>
            <div className="input-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input onBlur={handleConfirmPassword} type="password" name='confirm-password'  required/>
            </div>
            <p style={{color:'red'}}>{error}</p>
            <input className='form-submit' type="submit" value='Sign Up' />

        </form>
        <p className='create-account'> Already have an account ? <Link className='form-link' to='/login'>Login</Link></p>
      
        
        </div>
    </div>
    );
};

export default SignUp;