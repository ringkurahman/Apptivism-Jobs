import firebase from "firebase/app"
import 'firebase/auth'
import firebaseConfig from './firebase.config'


export const initializeLoginFramework = () => {

    // Set condition to protect firebase Re-render error
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

// Onclick google sign in button handle
export const handleGoogleSignIn = () => {
  // Call Google firebase authentication provider
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  // Call google popup for sign in and return
  return firebase.auth().signInWithPopup(googleProvider)
    .then((res) => {
      // De-structure User data
      const { displayName, password, email, photoURL } = res.user;
      // Declare object
      const signInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      };
      return signInUser;
    })
    // Catch error
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    });
};

    // Sign out event handler
export const handleSignOut = () => {
        // Call sign out firebase function
       return firebase.auth().signOut()
            .then((res) => {
                // Declare sign out object
                const signOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: '',
                };
                return signOutUser;
            })
            // Catch error
            .catch((err) => {
                console.log(err);
                console.log(err.message);
            });
};

    // Onclick FB sign in button handle
  export const handleFBLogIn = () => {
        // Call facebook firebase authentication provider
    const fbProvider = new firebase.auth.FacebookAuthProvider();
        return firebase.auth().signInWithPopup(fbProvider)
            .then(result => {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                user.success = true;
                // ...
                return user;
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
}
    
export const createUserWithEmailAndPassword = (name, email, password) => {
  // Call firebase authentication and put state user
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
        updateUserName(name)
        return newUserInfo;
    })
    .catch((error) => {
      // Copy object data from state
      const newUserInfo = {};
      // Set new user error message
      newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            const newUserInfo = res.user;
            // Empty error message id login success
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch(function (error) {
            // Copy object data from state
            const newUserInfo = {};
            // Set new user error message
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            // Call state to show message
            return newUserInfo;
        });
}

    // Send new user info to firebase
    const updateUserName = (name) => {
        const user = firebase.auth().currentUser;
        user
            .updateProfile({
                displayName: name,
            })
            .then(() => {
                // Update successful.
            })
            .catch((error) => {
                // An error happened.
            });
    };