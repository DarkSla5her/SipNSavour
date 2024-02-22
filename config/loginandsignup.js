
// // // Import Firebase products
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV9Os7HChdFcUtGqqKyqVtR_O6dJeGVmc",
  authDomain: "sipnsavour-3rd-yr-project.firebaseapp.com",
  databaseURL: "https://sipnsavour-3rd-yr-project-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "sipnsavour-3rd-yr-project",
  storageBucket: "sipnsavour-3rd-yr-project.appspot.com",
  messagingSenderId: "651525754878",
  appId: "1:651525754878:web:c01127506d740ab5cdbaaf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {
    // Attach event listener for signup
    const signup = document.getElementById("submitsignup");
    if (signup) {
      signup.addEventListener("click", SignUpUser);
    }
  
    // Optionally, if there's specific code only relevant to the signup page,
    // you could include it in this conditional block as well.
  
    // Attach event listener for login
    const login = document.getElementById("submitLogin");
    if (login) {
      login.addEventListener("click", loggedin);
    }
  
    // Similarly, any login-specific code could go here.
  });
  

// User login function
function loggedin() {
  var email = document.getElementById("email").value;
  var loginpassword = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, loginpassword)
    .then((userCredential) => {
      console.log("User logged in:", userCredential.user);
      window.location.href = "homepage.html";
    })
    .catch((error) => {
      console.error("Login error", error.code, error.message);
    });
}

// Function to sign up user and add user information to Realtime Database
function SignUpUser() {
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var email = document.getElementById("email").value;
  var signinpassword = document.getElementById("pass1").value;
  var pass2 = document.getElementById("pass2").value;

  if (signinpassword !== pass2) {
    alert("Passwords do not match.");
    return;
  }
  if (signinpassword.length < 6) {
    alert("Password is too short. Password needs to have 6 or more characters.");
    return;
  }

  const userInfo = {
    fname: fname,
    lname: lname,
    email: email,
    password: signinpassword // Storing passwords in plain text in the database is not recommended for real applications
  };

  createUserWithEmailAndPassword(auth, email, signinpassword)
    .then((userCredential) => {
      console.log("User created successfully with UID:", userCredential.user.uid);
      const dbRef = ref(database, 'users/' + userCredential.user.uid);
      window.location.href = "homepage.html";
      
      set(dbRef, userInfo)
        .then(() => console.log("User information saved to database successfully."))
        .catch((error) => console.error("Error saving user information to database:", error));
    })
    .catch((error) => {
      console.error("Error signing up:", error.message);
    });
}