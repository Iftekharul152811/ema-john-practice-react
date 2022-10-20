import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';

import './SignUp.css'

const SignUp = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { createUser } = useContext(AuthContext)


    // handle signUp by email and password
    const handleSignUp = (event) => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm);

        if (password.length < 6) {
            setError('Password should be equal or more than 6digits');
            return;
        }

        if (password !== confirm) {
            setError('Your password did not match');
            return;
        }
        else {
            setError('');
        }
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                setSuccess('You have successfuly signed up');
            })
            .catch(error => {
                console.error(error);
            })
    }
    return (
        <div className='form-login'>
            <div className='forom'>
                <h2 className='form-heading'>Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' required />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' required />
                    </div>
                    <div className="form-control">
                        <label htmlFor="confirm">Confirm Password</label>
                        <input type="password" name='confirm' required />
                    </div>
                    <p className='text-error'>{error}</p>
                    <p className='text-success'>{success}</p>
                    <input className='btn-login' type="submit" value="Sign Up" />
                </form>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
            </div>
        </div>
    );
};

export default SignUp;