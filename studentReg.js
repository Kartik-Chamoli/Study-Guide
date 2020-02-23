let user;
let studentDetails=[];

function getVal(){
    studentDetails[0]=document.querySelector('#fullName').value;
    studentDetails[1]=document.querySelector('#age').value;
    studentDetails[2]=document.querySelector('#rollNo').value;
    studentDetails[3]=document.querySelector('#address').value;
    studentDetails[4]=document.querySelector('#course').value;
    studentDetails[5]=document.querySelector('#shift').value;
    studentDetails[6]=document.querySelector('#phoneNo').value;
    studentDetails[7]=document.querySelector('#semester').value;
}


//STUDENTDB
var studentDbReference = firebase.database().ref().child("Student");

let subBtn = document.querySelector('#submit');
// let retBtn = document.querySelector('#retrieve');


//Adding Data to database
subBtn.addEventListener('click',()=>{
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
