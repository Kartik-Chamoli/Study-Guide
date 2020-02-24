let user;
let teacherDetails=[];

function getVal(){
    teacherDetails[0]=document.querySelector('#fullName').value;
    teacherDetails[1]=document.querySelector('#designation').value;
    teacherDetails[2]=document.querySelector('#college').value;
    teacherDetails[3]=document.querySelector('#subject').value;
    teacherDetails[4]=document.querySelector('#course').value;
    teacherDetails[5]=document.querySelector('#teachExp').value;
}


//teacherDB
var teacherDbReference = firebase.database().ref().child("Teacher");

let subBtn = document.querySelector('#submit');
// let retBtn = document.querySelector('#retrieve');


//Adding Data to database
subBtn.addEventListener('click',()=>{
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
    });

});


// //Retrieving Data from database
// retBtn.addEventListener('click',()=>{
//     teacherDetails[2] = document.querySelector('#RollNo').value;
//     teacherDbReference.child(teacherDetails[2]).on('value',(datasnapshot)=>{
//         document.querySelector('#name').value=datasnapshot.val().Name;
//         document.querySelector('#Age').value=datasnapshot.val().Age;
//     })
// })
