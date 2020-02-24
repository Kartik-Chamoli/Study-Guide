let profilePic = document.getElementsByClassName("profilePic")[0];
let nav = document.getElementsByClassName("profileNav")[0];
profilePic.addEventListener('click', () => {
    nav.style.display = "block";
    console.log(nav);
})

/*
nav.addEventListener('mouseout', ()=>{
    nav.style.display = "none";
})
*/

let tableElements = document.getElementsByClassName("tableElement");
console.log(tableElements);
tableElements[0].addEventListener('click', ()=>{
  nav.style.display = "none";
})
tableElements[5].addEventListener('click', ()=>{
  firebase.auth().signOut().then(function() {
    window.location.href="auth.html";
  }).catch(function(error) {
    console.log(error);
  });
})

let logOutBtn = document.querySelector("#logOut");
logOutBtn.addEventListener('click', ()=> {
    firebase.auth().signOut().then(function() {
        window.location.href="auth.html";
      }).catch(function(error) {
        console.log(error);
      });
})