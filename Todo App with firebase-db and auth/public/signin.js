 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
 import { ref, set, push, getDatabase, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
 import { getAuth,
    signInWithEmailAndPassword
 } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyDaSQZaHweGkf-kA5nNJOrWPG_UCwR6srY",
   authDomain: "fir-auth-5612e.firebaseapp.com",
   projectId: "fir-auth-5612e",
   databaseURL: "https://fir-auth-5612e-default-rtdb.firebaseio.com",
   storageBucket: "fir-auth-5612e.appspot.com",
   messagingSenderId: "1014956423236",
   appId: "1:1014956423236:web:927c50a613cdfb4a30e411"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const database = getDatabase();
 const auth = getAuth();

 var model = {};

//  var userName = document.getElementById("name");
 var email = document.getElementById("email");
 var password = document.getElementById("password");

 window.signUp = function (e) {
    e.preventDefault();
    model.email = email.value;
    // model.userName = userName.value;
    model.password = password.value;
    // console.log(model);
    signInWithEmailAndPassword(auth, model.email, model.password)
    .then(function(res){
        console.log(res.user.uid, "Success Response");
        model.id = res.user.uid;
        var refernce = ref(database, `users/${model.id}`);
        set(refernce, model)
        .then(function (dbRes){
            alert("User Created Successfully")
            window.location.href = 'todo.html'
        })
        .catch(function (dbErr){
            alert(dbErr.message)
        });
        email.value = "";
        // userName.value = "";
        password.value = "";
    })
    .catch(function (err){
        console.log(err, "Error Response");
        alert(err.msg);
    });
    
 };

