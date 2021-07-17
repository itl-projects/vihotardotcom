 var updateUserData = async() => {
     res = await getUrl('users/data/', {}, getToken(), true)
     if (res.data.status == true) {
         Cookies.set('firstName', res.data.data.firstName)
         Cookies.set('lastName', res.data.data.lastName)
         Cookies.set('email', res.data.data.email)
         Cookies.set('id', res.data.data.id)
         Cookies.set('userType', res.data.data.type)
         Cookies.set('adminApproved', res.data.data.adminApproved)
         Cookies.set('avatar', res.data.profile.avatar)
         Cookies.set('socialAvatar', res.data.profile.socialAvatar)
         Cookies.set('avatarType', res.data.profile.avatarType)
         Cookies.set('gender', res.data.profile.gender)
         Cookies.set('dob', res.data.profile.dob)
         Cookies.set('phone', res.data.profile.phone)
         Cookies.set('companyName', null)
         Cookies.set('brandName', null)
         if (res.data.profile.companyName) {
             Cookies.set('companyName', res.data.profile.companyName)
         }
         if (res.data.profile.brandName) {
             Cookies.set('brandName', res.data.profile.brandName)
         }
     }
 }

 async function plotUserData() {
     if (Cookies.get('firstName') == undefined) {
         await updateUserData()
     }
     userData = getUserData()
     objList = document.querySelectorAll('.fullName')
     objList.forEach(el => {
         el.innerHTML = userData['firstName'] + ' ' + userData['lastName']
     })
     imgList = document.querySelectorAll('#userImage')

     if (userData['avatarType'] == "social") {
         key = "socialAvatar"
         imgList.forEach(el => {
             el.src = userData[key]
         })
     } else {
         key = "avatar"
         imgList.forEach(el => {
             el.src = userData[key]
         })
     }
 }

 function checkLoginState() {
     if (getToken() !== undefined) {
         window.location.href = `https://api.vihotar.com/dashboard/login/${getToken()}`
         return true
     } else {
         return false
     }
 }

 function ifLoggedIn() {
     if (getToken() !== undefined) {
         return true
     } else {
         return false
     }
 }

 function getUserData() {
     return {
         firstName: Cookies.get('firstName'),
         lastName: Cookies.get('lastName'),
         email: Cookies.get('email'),
         id: Cookies.get('id'),
         userType: Cookies.get('userType'),
         adminApproved: Cookies.get('adminApproved'),
         avatar: Cookies.get('avatar'),
         socialAvatar: Cookies.get('socialAvatar'),
         avatarType: Cookies.get('avatarType'),
         gender: Cookies.get('gender'),
         dob: Cookies.get('dob'),
         phone: Cookies.get('phone'),
         companyName: Cookies.get('companyName'),
         brandName: Cookies.get('brandName'),
     }
 }

 function signOutUser() {
     removeToken()
 }

 function setToAuth(key, val) {
     Cookies.set(key, val)
 }

 function getFromAuth(key) {
     Cookies.get(key)
 }

 async function login(e, typ) {
     data = {
         "email": document.getElementById("loginUsername").value,
         "password": document.getElementById("loginPassword").value,
         "type": typ,
     }
     var loadingText = '<i class="fa fa-spinner fa-spin"></i> loading...';
     document.getElementById('btnFetch').innerHTML = loadingText;
     postUrl('users/login/', data, null, false)
     .then(res=>{
        document.getElementById('btnFetch').innerHTML = 'Sign In';
        if (res.data.status == true) {
            setToken(res.data.token.access)
            window.location.href = `https://api.vihotar.com/dashboard/login/${getToken()}`;
        } else {
            var div = document.getElementById("errorDiv")
            div.style.display = "block";
            var ul = document.getElementById("errorList");
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
            Object.keys(res.data.errors).forEach(el => {
                var li = document.createElement("li");
                str = res.data.errors[el][0]
                if (str.includes("role")) {
                    li.appendChild(document.createTextNode("Login type: " + res.data.errors[el]));
                } else if (str.includes("password")) {
                    li.appendChild(document.createTextNode("Password: " + res.data.errors[el]));
                } else if (str.includes("Email")) {
                    li.appendChild(document.createTextNode("Email: " + res.data.errors[el]));
                } else {
                    li.appendChild(document.createTextNode("Server error: " + res.data.errors[el]));
                }
                ul.appendChild(li);
            })
        }
     })
     .catch(err=>{
        document.getElementById('btnFetch').innerHTML = 'Sign In';
    })
     
 }

 function validateToken(token, typ) {
     console.log(token)
    //  if (token == null || token == '') {
    //      window.location.href = "/login.html";
    //  }
     var base64Url = token.split('.')[1];
     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
     var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
     }).join(''));
     payload = JSON.parse(jsonPayload)
     if (payload.type != typ) {
         window.location.href = `https://api.vihotar.com/dashboard/login/${getToken()}`
     }
     var currDate = new Date();
     const expDate = new Date(0);
     expDate.setUTCSeconds(payload.exp)
    //  if (expDate < currDate) {
    //      window.location.href = "/login.html";
    //      removeToken()
    //  }
 }

 function getToken() {
     return Cookies.get('_auth')
 }

 function setToken(token) {
     Cookies.set('_auth', token, { 'expires': 7 })
 }

 function removeToken() {
     Cookies.remove('_auth')
 }

 async function registerUser(typ, data) {
     res = await postUrl(`users/register/${typ}/`, data, null, false)
     if (res.data.status == true) {
         window.location.href = `https://api.vihotar.com/dashboard/login/${getToken()}`;
         setToken(res.data.token.access)
     } else {
         showLoginErrors(res.data.errors)
     }
 }

 function deleteAuth() {
     Object.keys(Cookies.get()).forEach(function(cookieName) {
         Cookies.remove(cookieName);
     });
 }

 function getPayload(token) {
     var base64Url = token.split('.')[1];
     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
     var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
     }).join(''));
     return JSON.parse(jsonPayload)
 }