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
    studentDetails[5]=document.querySelector('#section').value;
    studentDetails[6]=document.querySelector('#phoneNo').value;
    studentDetails[7]=document.querySelector('#semester').value;
    studentDetails[8]=DownloadUrl;
    studentDetails[9]=document.querySelector('#college').value;
}


//STUDENTDB
var studentDbReference = firebase.firestore().collection("Student");

function setData(){
    studentDbReference.doc(user.uid).set({
        Name:studentDetails[0],
        Age:studentDetails[1],
        RollNo:studentDetails[2],
        College:studentDetails[9],
        Address:studentDetails[3],
        Course:studentDetails[4],
        Section:studentDetails[5],
        PhoneNo:studentDetails[6],
        Semester:studentDetails[7],
        DownloadUrl:DownloadUrl,
    }).then(()=>window.location.href="studentHome.html")
    .catch((error)=>alert(error));
}

//Adding Data to database
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    user=firebase.auth().currentUser;
    getVal();
    setData();
});
