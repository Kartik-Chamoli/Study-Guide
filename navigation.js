let User;

firebase.auth().onAuthStateChanged(function(user) {
  let teacherData;
  let profilePic = document.querySelector('.profileImg');

  if (user) {
      var teacherDbReference = firebase.database().ref().child("Teacher");
      User = firebase.auth().currentUser.uid;
      
      teacherDbReference.child(User).on('value',(datasnapshot)=>{
          teacherData=datasnapshot.val();
          if(teacherData.DownloadUrl!=undefined) profilePic.src=teacherData.DownloadUrl;
        });

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