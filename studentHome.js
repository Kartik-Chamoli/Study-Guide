let ProfileName = document.querySelector('.profileName');
let profilePic = document.querySelector('.dropbtn');
let globalData;
let User;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      var studentDbReference = firebase.firestore().collection("Student");
      User = firebase.auth().currentUser.uid;
      
      studentDbReference.doc(User).get().then((doc)=>{
          globalData=doc.data();
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


function test() {
  let studentDbReference = firebase.firestore().collection("Student");
  studentDbReference.doc(User).get().then(doc=>{
    stuData = doc.data();
    firebase.firestore().doc(`${stuData.College}/${stuData.Course}/${stuData.Semester}/${stuData.Section}`).get().then(material=>{
      matData=material.data();
      console.log(matData);
    })
  })
}