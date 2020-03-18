let ProfileName = document.querySelector('.profileName');
let profilePic = document.querySelector('.dropbtn');
let globalData;
let User;
uploadFileHtml();

function uploadFileHtml(){
  let uploadHtmlString = `<div id="drag-drop-area"></div>
  <div id="myProgress">
      <div id="myBar"></div>
    </div>   
  `
  var uppyScript = document.createElement('script');
  uppyScript.setAttribute('src','uppyScript.js');
  document.head.appendChild(uppyScript);

  let mainContent =  document.querySelector('.main-content');
  mainContent.innerHTML = uploadHtmlString;
}


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var teacherDbReference = firebase.database().ref().child("Teacher");
        User = firebase.auth().currentUser.uid;
        
        teacherDbReference.child(User).on('value',(datasnapshot)=>{
            globalData=datasnapshot.val();
            ProfileName.innerText = ProfileName.innerText.replace('${%TEACHERNAME%}$',globalData.Name);
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
  if(event.target.text==="Upload Files"){
    uploadFileHtml();
  }
})