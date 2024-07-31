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
firebase.analytics();

//code
var datab  = firebase.database().ref('data');
function UserRegister(){
var email = document.getElementById('eemail').value;
var password = document.getElementById('lpassword').value;
firebase.auth().createUserWithEmailAndPassword(email,password).then(function(){
    
}).catch(function (error){
    var errorcode = error.code;
    var errormsg = error.message;
});
}
const auth = firebase.auth();
function SignIn(){
    var email = document.getElementById('eemail').value;
    var password = document.getElementById('lpassword').value;
    const promise = auth.signInWithEmailAndPassword(email,password);
    promise.catch( e => alert(e.msg));
    window.open("https://www.google.com","_self");
}
document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    var userInfo = datab.push();
    userInfo.set({
        name: getId('fname'),
        email : getId('eemail'),
        password : getId('lpassword')
    });
    alert("Successfully Signed Up");
    console.log("sent");
    document.getElementById('form').reset();
});
function  getId(id){
    return document.getElementById(id).value;
}