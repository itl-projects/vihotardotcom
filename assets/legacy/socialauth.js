//New Start on Firebase

function initFirebase() {
    var firebaseConfig = {
        apiKey: "AIzaSyAei7inFjiO4iBCtW-ea8RnbWDKKnnY6Bs",
        authDomain: "skyril-web-app.firebaseapp.com",
        databaseURL: "https://skyril-web-app.firebaseio.com",
        projectId: "skyril-web-app",
        storageBucket: "skyril-web-app.appspot.com",
        messagingSenderId: "508218648594",
        appId: "1:508218648594:web:f5dc4d459c0896126e50cb",
        measurementId: "G-XDCBVKLT3T"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    return true
}

function fbSignin(typ) {
    var provider = new firebase.auth.FacebookAuthProvider();
    socialSignIn(provider, typ)
}

function googleSignin(typ) {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    socialSignIn(provider, typ)
}

function socialSignIn(provider, typ) {
    firebase.auth().signInWithPopup(provider).then(async function(result) {
        var token = result.credential.accessToken;
        user = result.user;
        res = await initUserinDb(user.displayName.split(' ')[0], user.displayName.split(' ')[1],
            user.email, user.photoURL, typ)
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    });
}

async function initUserinDb(firstName, lastName, email, avatar, typ) {
    firebase.auth().currentUser.getIdToken(true).then(async function(idToken) {
        data = {
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'avatar': avatar,
            'type': typ,
            'token': idToken,
        }
        res = await postUrl('users/socialsignin/', data, null, false)
        if (res.data.status === true) {
            setToken(res.data.token.access)
            window.location.href = `/dashboard/${typ}/`
            return { 'status': true, 'data': res.data.data }
        } else {
            showLoginErrors(res.data.errors)
            return { 'status': false, 'data': res.data.errors }
        }
    }).catch(function(error) {
        console.log(error)
    });

}

function logout() {
    removeToken()
    deleteAuth()
    if (getFromAuth('socialLoggedIn')) {
        firebase.auth().signOut().then(function() {
            console.log("Done")
        }).catch(function(error) {
            console.log("Error came")
        });
    }
    window.location.href = "/"
}