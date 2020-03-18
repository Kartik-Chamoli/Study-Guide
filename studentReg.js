let user;
let studentDetails=[];
let form = document.querySelector('.newForm');
let imageSelect = document.querySelector('#ProfilePic');
let DownloadUrl;

imageSelect.addEventListener('change',()=>{
    let storageRef = firebase.storage().ref('Student/'+firebase.auth().currentUser.uid+'/ProfilePicture/'+imageSelect.files[0].name);
    storageRef.put(imageSelect.files[0]).then((snapshot=>{
    return snapshot.ref.getDownloadURL();
    })).then(downloadUrl=>{
        DownloadUrl = downloadUrl;
    });
})

function getVal(){
    studentDetails[0]=document.querySelector('#fullName').value;
    studentDetails[1]=document.querySelector('#age').value;
    studentDetails[2]=document.querySelector('#rollNo').value;
    studentDetails[3]=document.querySelector('#address').value;
    studentDetails[4]=document.querySelector('#course').value;
    studentDetails[5]=document.querySelector('#shift').value;
    studentDetails[6]=document.querySelector('#phoneNo').value;
    studentDetails[7]=document.querySelector('#semester').value;
    studentDetails[8]=DownloadUrl;

}


//STUDENTDB
var studentDbReference = firebase.database().ref().child("Student");

// let retBtn = document.querySelector('#retrieve');


//Adding Data to database
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    user=firebase.auth().currentUser;
    getVal();

    //Using Rollno as parent
    studentDbReference.child(user.uid).set({
        Name:studentDetails[0],
        Age:studentDetails[1],
        RollNo:studentDetails[2],
        Address:studentDetails[3],
        Course:studentDetails[4],
        Shift:studentDetails[5],
        PhoneNo:studentDetails[6],
        Semester:studentDetails[7],
        DownloadUrl:DownloadUrl,
    },(error)=>{
        if(error) alert(error);
        else window.location.href="studentHome.html";
    });

});


// //Retrieving Data from database
// retBtn.addEventListener('click',()=>{
//     studentDetails[2] = document.querySelector('#RollNo').value;
//     studentDbReference.child(studentDetails[2]).on('value',(datasnapshot)=>{
//         document.querySelector('#name').value=datasnapshot.val().Name;
//         document.querySelector('#Age').value=datasnapshot.val().Age;
//     })
// })
