let user;
let teacherDetails=[];
let form = document.querySelector('.newForm');
let imageSelect = document.querySelector('#ProfilePic');
let DownloadUrl;

imageSelect.addEventListener('change',()=>{
let storageRef = firebase.storage().ref('Teacher/'+firebase.auth().currentUser.uid+'/ProfilePicture/'+imageSelect.files[0].name);
storageRef.put(imageSelect.files[0]).then((snapshot=>{
return snapshot.ref.getDownloadURL();
})).then(downloadUrl=>{
    DownloadUrl = downloadUrl;
});
})

function getVal(){
    teacherDetails[0]=document.querySelector('#fullName').value;
    teacherDetails[1]=document.querySelector('#designation').value;
    teacherDetails[2]=document.querySelector('#college').value;
    teacherDetails[3]=document.querySelector('#subject').value;
    teacherDetails[4]=document.querySelector('#course').value;
    teacherDetails[5]=document.querySelector('#teachExp').value;
    teacherDetails[6]=DownloadUrl;
}


//teacherDB
var teacherDbReference = firebase.firestore().collection("Teacher");

function setData(){
    teacherDbReference.doc(user.uid).set({
        Name:teacherDetails[0],
        Designation:teacherDetails[1],
        College:teacherDetails[2],
        Subject:teacherDetails[3],
        Course:teacherDetails[4],
        teachExp:teacherDetails[5],
        DownloadUrl:teacherDetails[6],
    }).then(()=>window.location.href="teacherHome.html")
    .catch((error)=>alert(error));
}


form.addEventListener('submit',(event)=>{
    event.preventDefault();
    user= firebase.auth().currentUser;
    getVal();
    setData();
});


