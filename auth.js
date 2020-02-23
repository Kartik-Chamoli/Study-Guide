//Check if user is logged in or not
let user = firebase.auth().currentUser;

let regBtnStu = document.querySelector('#registerBtnStu');
let loginBtnStu = document.querySelector('#loginBtnStu');

let regBtnTeach = document.querySelector('#registerBtnTeach');
let loginBtnTeach = document.querySelector('#loginBtnTeach');
// let logoutbtn = document.querySelector('#logoutbtn');
let email,password;

function register(role){
  email = document.querySelector('#email').value;
     password = document.querySelector('#password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{
      if(role==="student") window.location.href="studentReg.html";
      else window.location.href="teacherReg.html";

    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
}

function login(role){
  email = document.querySelector('#email').value;
  password = document.querySelector('#password').value;
  firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
    if(role==="student") window.location.href="studentHome.html";
    else window.location.href="teacherHome.html";
  }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode,errorMessage);
    });
}

regBtnStu.addEventListener('click',()=>{
     register('student');
})

regBtnTeach.addEventListener('click',()=>{
  register('teacher');
})

loginBtnStu.addEventListener('click',()=>{
   login('student');
})

loginBtnTeach.addEventListener('click',()=>{
  login('teacher');
})

// logoutbtn.addEventListener('click',()=>{
//     firebase.auth().signOut();
// })

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if(user.emaildVerified){
            console.log('Verified');
        }
        else{
            console.log('EMAIL not verified');
            // user.sendEmailVerification();  IMPORTANT FOR SENDING VERIFICATION
        }   //     console.log('User is logged in');
    //   // User is signed in.
    //   var displayName = user.displayName;
    //   var email = user.email;
    //   var emailVerified = user.emailVerified;
    //   var photoURL = user.photoURL;
    //   var isAnonymous = user.isAnonymous;
    //   var uid = user.uid;
    //   var providerData = user.providerData;
    //   console.log(emailVerified);
    
      // ...
    } else {
      console.log('User is not logged in');
    }
  });

