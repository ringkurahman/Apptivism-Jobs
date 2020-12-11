import firebase from "firebase/app"
import "firebase/auth"
import firebaseConfig from "./firebase.config"




export const initializeLoginFramework = () => {

    // Set condition to protect firebase Re-render error
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
    }
}

// Google sign in handler
export const handleGoogleSignIn = () => {
    // Set google provider
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    // Open google pop up
    return firebase.auth().signInWithPopup(googleProvider)
        .then(result => {
            const { displayName, email, photoURL } = result.user
            // State for sign in user
            const signInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true,
            }
            return signInUser
        })
        .catch(error => {
            const newUserInfo = { }
            newUserInfo.error = error.message
            newUserInfo.success = false
            return newUserInfo
        })
}

// Facebook sign in handler
export const handleFbSignIn = () => {
    // Set facebook provider
    const FbProvider = new firebase.auth.FacebookAuthProvider()
     // Open facebook pop up
    return firebase.auth().signInWithPopup(FbProvider)
        .then(result => {
            const token = result.credential.accessToken
            const { displayName, email, photoURL } = result.user
                // State for sign in user
            const signInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL, 
                success: true,
            }
            return signInUser
        })
        .catch(error => {
            const newUserInfo = { }
            newUserInfo.error = error.message
            newUserInfo.success = false
            return newUserInfo
        })
}
    
// Sign out handler
export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(result => {
            const signOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: '',  
            }
            return signOutUser
        })
        .catch(error => {
            console.log(error.message)
        }) 
}

// Sign up with email and password
export const createUserWithEmailAndPassword = (name, email, password) => { 
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(response => {   
            const newUserInfo = response.user
            newUserInfo.error = ''
            newUserInfo.SignUpSuccess = true
            updateUserName(name)
            return newUserInfo
        })
        .catch(error => {
            const newUserInfo = { }
            newUserInfo.error = error.message
            newUserInfo.SignUpSuccess = false
            return newUserInfo
        })
}

// Sign In with email and password
export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((response) => {
            const newUserInfo = response.user
            newUserInfo.success = true
            newUserInfo.error = ''
            return newUserInfo
        })
        .catch(error => {
            const newUserInfo = {}
            newUserInfo.error = error.message
            newUserInfo.success = false
            return newUserInfo
        })
}

// Send new user info to firebase
const updateUserName = (name) => {
    const user = firebase.auth().currentUser
    user.updateProfile({    
        displayName: name, 
    })
        .then(() => {  
            console.log('User name updated successfully')
        })
        .catch((error) => {      
            console.log('Error updating profile')
        })
}
    

