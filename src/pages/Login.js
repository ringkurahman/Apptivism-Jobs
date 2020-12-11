import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { UserContext } from '../App'
import { createUserWithEmailAndPassword, handleFbSignIn, handleGitHubSignIn, handleGoogleSignIn, initializeLoginFramework, signInWithEmailAndPassword } from '../components/login/LogInManager'



const Login = () => {

    // State for new user
    const [newUser, setNewUser] = useState(false);
    // Multiple argument state
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        SignUpSuccess: false,
        success: false,
        error: '',
    })

    // Call firebase authentication function from LogInManager.js
    initializeLoginFramework()

    const [loggedInUser, setLogInUser] = useContext(UserContext)
    const history = useHistory()
    const location = useLocation()
    const { from } = location.state || { from: { pathname: '/dashboard' }, }

    // Google sign in event handler
    const googleSignIn = () => {
        handleGoogleSignIn().then((res) => {
        handleResponse(res, true)
        })
    }

    // Facebook sign in event handler
    const fbLogIn = () => {
        handleFbSignIn()
            .then((res) => {
                setUser(res)
                handleResponse(res, true)
            })
    }

    // GitHub sign in event handler
    const gitHubLogIn = () => {
        handleGitHubSignIn()
            .then((res) => {
                setUser(res)
                handleResponse(res, true)
            })
    }

    // Create response function
    const handleResponse = (res, redirect) => {
        setUser(res)
        setLogInUser(res)
        if (redirect) {
        history.replace(from)
        }
    }

    // Catch event when field is blur
    const handleBlur = (e) => {
        let isFieldValid
        if (e.target.name === 'name') {
        isFieldValid = e.target.value
        }
        if (e.target.name === 'email') {
        // validation email
        isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
        } 
        if (e.target.name === 'password') {
        // validation 1 uppercase 1 lowercase 1 number
        isFieldValid = /^(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})(?=(?:.*[0-9]){1})\S{6,20}$/.test(
            e.target.value
        )
        }
        if (isFieldValid) {
        const newUserInfo = { ...user }
        newUserInfo[e.target.name] = e.target.value
        setUser(newUserInfo)
        }
    }

    // Form submit handler
    const handleSubmit = (e) => {
        // Sign Up with email and password
        if (newUser && user.name && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then((res) => {
                    setUser(res)
                    setLogInUser(res)
                    // Call response handler from below function
                    handleResponse(res, true)
            })
        }
        // Log In with email and password
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    setUser(res)
                    setLogInUser(res)
                    // Call response handler from below function
                    handleResponse(res, true)
            })
         }
        e.preventDefault()
    }


    return (
        <div className="container">
            <div className='text-center'>
                {!newUser && (
                    <form  onSubmit={handleSubmit}>
                        <div className='form-field p-4'>
                            <h4 className='text-left mb-5 ml-3'>
                                Login
                            </h4>
                            <p>
                                <input
                                    className='mb-2'
                                    type='email'
                                    onBlur={handleBlur}
                                    name='email'
                                    placeholder='Email'
                                    required
                                />
                            </p>
                            <p>
                                <input
                                    className='mb-2'
                                    type='password'
                                    onBlur={handleBlur}
                                    name='password'
                                    placeholder='Password'
                                    required
                                /> 
                            </p>
                                <input
                                    className='mt-3'
                                    type='submit'
                                    value='Login'
                                />
                            <p>
                                <div>
                                <span>Don't have an account?</span>
                                <span className='pl-1'>
                                <Link onClick={() => setNewUser(!newUser)}>
                                    <span className='login-qstn'>Create an account</span>
                                </Link>
                                </span>
                            </div>
                            </p>
                        </div>
                    </form>
                )}
                
                {newUser && (
                    <form  onSubmit={handleSubmit}>
                    <div className='form-field p-4'>
                        <h4 className='text-left mb-5 ml-3'>
                            Created an account
                        </h4>
                        <p>  
                            <input
                                className='mb-2'
                                type='text'
                                onBlur={handleBlur}
                                name='name'
                                placeholder='First Name'
                                required
                            />
                        </p>
                        <p>    
                            <input
                                className='mb-2'
                                type='text'
                                onBlur={handleBlur}
                                name='name'
                                placeholder='Last Name'
                                required
                            /> 
                        </p>
                        <p>
                            <input
                                className='mb-2'
                                type='email'
                                onBlur={handleBlur}
                                name='email'
                                placeholder='Email'
                                required
                            />
                        </p>
                        <p>
                            <input
                                className='mb-2'
                                type='password'
                                onBlur={handleBlur}
                                name='password'
                                placeholder='Password'
                                required
                            /> 
                        </p>
                        <p> 
                            <input
                                className='mb-2'
                                type='password'
                                onBlur={handleBlur}
                                name='password'
                                placeholder='Confirm Password'
                                required
                            />
                        </p>
                            <input
                                className='mt-3'
                                type='submit'
                                value='Create an account'
                            />
                        <p>
                            <div>
                            <span>Already have an account?</span>
                            <span className='pl-1'>
                            <Link onClick={() => setNewUser(!newUser)}>
                                Login
                            </Link>
                            </span>
                        </div>
                        </p>
                    </div>
                </form>
                )}
                {user.success &&
                    <p style={{ color: 'yellow' }}>Successfully login</p>
                }
                {user.SignUpSuccess &&
                    <div>
                        <p style={{ color: 'yellow' }}>Account successfully created</p>
                        <p style={{ color: 'yellow' }}>Login your account</p>
                    </div>
                }
                {user.error ? <p style={{ color: 'red' }}>{user.error}</p> : null
                }
                    
                    <div className='d-flex flex-wrap justify-content-center align-items-center'>
                        <p className='divider'></p>
                        Or
                        <p className='divider'></p>
                    </div>
                    <div className='mb-2 mt-3'>
                        <button className='sign-btn' onClick={fbLogIn}>
                            <div className='d-flex justify-content-between align-items-center'>
                            <FontAwesomeIcon className='text-white' icon={faFacebook} style={{fontSize: '30px'}} />
                            <span className='text-white ml-5'>Continue with Facebook</span>
                            </div>
                        </button>
                    </div>
                    <div className='mb-2'>
                        <button className='sign-btn' onClick={googleSignIn}>
                            <div className='d-flex justify-content-between align-items-center'>
                            <FontAwesomeIcon className='text-white' icon={faGoogle} style={{fontSize: '30px'}} />
                            <span className='text-white ml-5'>Continue with Google</span>
                            </div>
                        </button>
                </div>
                <div>
                        <button className='sign-btn' onClick={gitHubLogIn}>
                            <div className='d-flex justify-content-between align-items-center'>
                            <FontAwesomeIcon className='text-white' icon={faGithub} style={{fontSize: '30px'}} />
                            <span className='text-white ml-5'>Continue with GitHub</span>
                            </div>
                        </button>
                    </div>
            </div>
        </div>
    )
}

export default Login