import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCIdfkv1eqspRMZZ84OMYd4rUI0fJCZU24",
  authDomain: "facebook-clone-bd42d.firebaseapp.com",
  projectId: "facebook-clone-bd42d",
  storageBucket: "facebook-clone-bd42d.appspot.com",
  messagingSenderId: "235747878289",
  appId: "1:235747878289:web:aca37cb7bad3b275cde630",
  measurementId: "G-B651JS24WW"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const googleProvider = new firebase.auth.GoogleAuthProvider()

export { auth, googleProvider }
export default db