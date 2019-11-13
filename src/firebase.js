window.firebase = require('firebase/app')
var firebaseui = require('firebaseui')
import 'firebaseui/dist/firebaseui.css'
import store from './store'

// Add additional services that you want to use
require('firebase/auth')




//NOTICE: THIS IS WHERE WE ADD OUR FIRBASE TOKEN
const config = {
    apiKey: "AIzaSyBrGg-dJyDklVnuX919_pNSu2G6yTy2lKc",
    authDomain: "solar-cycle-256312.firebaseapp.com",
    databaseURL: "https://solar-cycle-256312.firebaseio.com",
    projectId: "solar-cycle-256312",
    storageBucket: "solar-cycle-256312.appspot.com",
    messagingSenderId: "1016336956854",
    appId: "1:1016336956854:web:fb76c55fa4f8780d309517",
    measurementId: "G-RCF3ZBQ79T"
  };
//END OF FIREBASE TOKEN

window.firebase.initializeApp(config)

window.ui = new firebaseui.auth.AuthUI(window.firebase.auth())

if (!window.location.href.includes(':8080')) {
    window.firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            let { displayName, email, emailVerified, photoUrl, uid, phoneNumber, providerData } = user

            store.commit('storeUser', {
                displayName,
                email,
                emailVerified,
                photoUrl,
                uid,
                phoneNumber,
                providerData
            })
            user.getIdToken().then(function (accessToken) {
                window.axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
            })
            console.log(user) // eslint-disable-line
        }
    }, function (error) {
        console.log(error) // eslint-disable-line
    })
}

