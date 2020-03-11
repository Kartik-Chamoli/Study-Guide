let ProfileName = document.querySelector('.profileName');
let profilePic = document.querySelector('.dropbtn');
let globalData;
let User;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      var studentDbReference = firebase.database().ref().child("Student");
      User = firebase.auth().currentUser.uid;
      
      studentDbReference.child(User).on('value',(datasnapshot)=>{
          globalData=datasnapshot.val();
          ProfileName.innerText = ProfileName.innerText.replace('${%STUDENTNAME%}$',globalData.Name);
          if(globalData.DownloadUrl!=undefined) profilePic.src=globalData.DownloadUrl;
        });

  } else {
    alert("No user is signed in");
  }
});



let pillNavElement = document.querySelector('.pill-nav');
pillNavElement.addEventListener('click',()=>{
document.querySelector('.main-content').innerHTML='';

document.querySelectorAll('.pill-nav a').forEach(item=>{
  item.classList.remove('active');
})
event.explicitOriginalTarget.classList.toggle('active');
})