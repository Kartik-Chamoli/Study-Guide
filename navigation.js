let User;
let signOutEle;

firebase.auth().onAuthStateChanged(function(user) {
  let teacherData;

  if (user) {
      let profilePic = document.querySelector('.profileImg');
      var teacherDbReference = firebase.firestore().collection("Teacher");
      User = firebase.auth().currentUser.uid;
      
      teacherDbReference.doc(User).get().then((doc=>{
        teacherData = doc.data();
          if(teacherData.DownloadUrl!=undefined) profilePic.src=teacherData.DownloadUrl;
      }));

     signOutEle = document.querySelector('.signOut');
     signOutEle.addEventListener('click',(event)=>{
      firebase.auth().signOut().then(function() {
        window.location.href="index.html"
      }, function(error) {
        alert(error);
      });
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

  