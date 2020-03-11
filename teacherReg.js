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
var teacherDbReference = firebase.database().ref().child("Teacher");

// let retBtn = document.querySelector('#retrieve');

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    user= firebase.auth().currentUser;
    getVal();

    //Using Rollno as parent
    teacherDbReference.child(user.uid).set({
        Name:teacherDetails[0],
        Designation:teacherDetails[1],
        College:teacherDetails[2],
        Subject:teacherDetails[3],
        Course:teacherDetails[4],
        teachExp:teacherDetails[5],
        DownloadUrl:DownloadUrl,
    },(error)=>{
        if(error) alert(error);
        else window.location.replace("teacherHome.html");
    })
});


// //Retrieving Data from database
// retBtn.addEventListener('click',()=>{
//     teacherDetails[2] = document.querySelector('#RollNo').value;
//     teacherDbReference.child(teacherDetails[2]).on('value',(datasnapshot)=>{
//         document.querySelector('#name').value=datasnapshot.val().Name;
//         document.querySelector('#Age').value=datasnapshot.val().Age;
//     })
// })
