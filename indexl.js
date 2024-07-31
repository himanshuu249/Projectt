
// Check if Firebase has already been initialized
if (!firebase.apps.length) {
    // Your web app's Firebase configuration
    const firebaseConfig = {
  apiKey: "AIzaSyCXr9tGXmPSv1gA7q7nGphjrEfopfeMsi4",
  authDomain: "login-with-firebase-data-edac0.firebaseapp.com",
  databaseURL: "https://login-with-firebase-data-edac0-default-rtdb.firebaseio.com",
  projectId: "login-with-firebase-data-edac0",
  storageBucket: "login-with-firebase-data-edac0.appspot.com",
  messagingSenderId: "626142758874",
  appId: "1:626142758874:web:ffc0bb5f43822dbb4e22e3"
};

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}


// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Set up the register function
function register() {
  // Get all input fields
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const full_name = document.getElementById('full_name').value;

  // Validate input fields
  if (!validate_email(email) || !validate_password(password)) {
    alert('Invalid email or password!');
    return;
  }
  if (!validate_field(full_name)) {
    alert('Full name is required!');
    return;
  }

  // Proceed with authentication
  auth.createUserWithEmailAndPassword(email, password)
    .then(function () {
      // Get current user
      const user = auth.currentUser;

      // Add user data to Firebase Database
      const database_ref = database.ref();
      const user_data = {
        email: email,
        full_name: full_name,
        last_login: Date.now()
      };
      database_ref.child('users/' + user.uid).set(user_data);

      // Notify user creation
      alert('User created successfully!');
    })
    .catch(function (error) {
      // Handle Firebase authentication errors
      alert(error.message);
    });
}

// Set up the login function
function login() {
  // Get input fields
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validate input fields
  if (!validate_email(email) || !validate_password(password)) {
    alert('Invalid email or password!');
    return;
  }

  // Proceed with authentication
  auth.signInWithEmailAndPassword(email, password)
    .then(function () {
      // Get current user
      const user = auth.currentUser;

      // Update last login time
      const database_ref = database.ref();
      const user_data = {
        last_login: Date.now()
      };
      database_ref.child('users/' + user.uid).update(user_data);

      // Notify user login
      alert('User logged in successfully!');
       window.location.href = 'index(logged in).html';

    })
    .catch(function (error) {
      // Handle Firebase authentication errors
      alert(error.message);
    });
}

// Validate email format
function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

// Validate password length
function validate_password(password) {
  return password.length >= 6;
}

// Validate field presence
function validate_field(field) {
  return field.trim() !== '';
}
