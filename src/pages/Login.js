import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import firebase from "firebase/app"
import "firebase/auth"
import React, { useContext, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { UserContext } from '../App'
import firebaseConfig from '../components/login/firebase.config'



// 1st Initialize Firebase
firebase.initializeApp(firebaseConfig)


const Login = () => {

    const [loggedInUser, setLogInUser] = useContext(UserContext)
    const history = useHistory()
    const location = useLocation()
    const { from } = location.state || { from: { pathname: '/dashboard' }, }

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

    // Set google provider
    const googleProvider = new firebase.auth.GoogleAuthProvider()

    // Google sign in handler
    const handleGoogleSignIn = () => {
        // Open google pop up
        firebase.auth().signInWithPopup(googleProvider)
            .then( result => {
                const { displayName, email, photoURL } = result.user
                // State for sign in user
                const signInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                }
                setUser(signInUser)
                setLogInUser(signInUser)
                history.replace(from)
            })
            .catch(error => {
                const newUserInfo = { ...user }
                newUserInfo.error = error.message
                setUser(newUserInfo)
        })
    }

    // Google sign out handler
    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(result => {
                const signOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: '',
                }
                setUser(signOutUser)
                setLogInUser(signOutUser)
            })
            .catch(err => {
            
        })
    }

    // Set facebook provider
    const FbProvider = new firebase.auth.FacebookAuthProvider()

    // Facebook sign in handler
    const handleFbSignIn = () => {
        // Open facebook pop up
        firebase.auth().signInWithPopup(FbProvider)
            .then(result => {
                const token = result.credential.accessToken
                const { displayName, email, photoURL } = result.user
                // State for sign in user
                const signInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                }
                setUser(signInUser)
                setLogInUser(signInUser)
                history.replace(from)
            })
            .catch(error => {
                const newUserInfo = { ...user }
                newUserInfo.error = error.message
                setUser(newUserInfo)
        })
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
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then( user => {
                    const newUserInfo = { ...user }
                    newUserInfo.SignUpSuccess = true
                    newUserInfo.error = ''
                    setUser(newUserInfo)
                    setLogInUser(newUserInfo)
                })
                .catch(error => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message
                    newUserInfo.SignUpSuccess = false
                    setUser(newUserInfo)
                })
        }
        // Log In with email and password
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((user) => {
                    const newUserInfo = { ...user }
                    newUserInfo.success = true
                    newUserInfo.error = ''
                    setUser(newUserInfo)
                    setLogInUser(newUserInfo)
                    history.replace(from)
                })
                .catch(error => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message
                    newUserInfo.success = false
                    setUser(newUserInfo)
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
                        <button className='sign-btn' onClick={handleFbSignIn}>
                            <div className='d-flex justify-content-between align-items-center'>
                            <FontAwesomeIcon className='text-white' icon={faFacebook} style={{fontSize: '30px'}} />
                            <span className='text-white ml-5'>Continue with Facebook</span>
                            </div>
                        </button>
                    </div>
                    <div>
                        <button className='sign-btn' onClick={handleGoogleSignIn}>
                            <div className='d-flex justify-content-between align-items-center'>
                            <FontAwesomeIcon className='text-white' icon={faGoogle} style={{fontSize: '30px'}} />
                            <span className='text-white ml-5'>Continue with Google</span>
                            </div>
                        </button>
                </div>
            </div>
        </div>
    )
}

export default Login