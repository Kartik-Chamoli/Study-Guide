let User;
let signOutEle;
let isTeacher;

firebase.auth().onAuthStateChanged(function(user) {
  let userData;

  if (user) {
      let profilePic = document.querySelector('.profileImg');
      User = firebase.auth().currentUser.uid;
      
      firebase.firestore().doc(`Student/${User}`).get().then(e=>{
        if(e.data()===undefined) 
        {
          isTeacher=true;
        } 
        else
        {
          isTeacher=false;
        }
      }).then(e=>{
        if (isTeacher) {
          Array.from(document.getElementsByClassName('update-profile')).forEach(e=>{
            e.setAttribute('href','teacherReg.html');
          });
          var dbReference = firebase.firestore().collection("Teacher");
          let arr = Array.from(document.getElementsByClassName('show-upload'));
          arr[0].setAttribute('href', 'showUpload.html#data=teacher');
          arr[2].setAttribute('href', 'showUpload.html#data=teacher');
        } else {
          Array.from(document.getElementsByClassName('update-profile')).forEach(e=>{
            e.setAttribute('href','studentReg.html');
          });
          var dbReference = firebase.firestore().collection("Student");
          let arr = Array.from(document.getElementsByClassName('show-upload'));
          arr[0].setAttribute('href', 'showUpload.html#data=student');
          arr[2].setAttribute('href', 'showUpload.html#data=student');
          arr = Array.from(document.getElementsByClassName('upload'));
          arr.forEach(e=>{
            e.outerHTML='';
          })
        }
        dbReference.doc(User).get().then((doc=>{
          userData = doc.data();
            if(userData.DownloadUrl!=undefined) profilePic.src=userData.DownloadUrl;
        }));

      });

     signOutEle = document.querySelectorAll('.signOut');
     signOutEle.forEach(item=>{
      item.addEventListener('click',(event)=>{
        firebase.auth().signOut().then(function() {
          window.location.href="index.html"
        }, function(error) {
          alert(error);
        });
      })
     })
  } else {
    alert("No user is signed in");
  }
});


function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";   
    } else {
      x.style.display = "block";
    }
  }
  
  function toggleHidden(){
  let dropContent = document.querySelector('.mobile-content');
  if(dropContent.style.display==="") dropContent.style.display = "block";
  else dropContent.style.display = "";
  }

  /// IMP
  /**firebase.firestore().doc(`Student/${c}`).get().then(e=>{
if(e.data()!=undefined) {console.log(true)} else {console.log(false);}
}) */