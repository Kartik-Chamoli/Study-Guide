let studentDetails=[];

function getVal(){
    studentDetails[0]=document.querySelector('#name').value;
    studentDetails[1]=document.querySelector('#Age').value;
    studentDetails[2]=document.querySelector('#RollNo').value;
}

function clearVal(){
    document.querySelector('#name').value='';
    document.querySelector('#Age').value='';
    document.querySelector('#RollNo').value='';
}

//STUDENTDB
var studentDbReference = firebase.database().ref().child("Student");

let subBtn = document.querySelector('#submit');
let retBtn = document.querySelector('#retrieve');
let clearBtn = document.querySelector('#clear');


//ClearBtn
clearBtn.addEventListener('click',()=>{
    clearVal();
});


//Adding Data to database
subBtn.addEventListener('click',()=>{

    getVal();

    //Using Rollno as parent
    studentDbReference.child(studentDetails[2]).set({
        Name:studentDetails[0],
        Age:studentDetails[1],
    });

    // //Random Push
    // studentDbReference.push().set({
    //     Name:studentDetails[0],
    //     Age:studentDetails[1],
    //     RollNo:studentDetails[2],
    // })

    clearVal();


});

//Retrieving Data from database
retBtn.addEventListener('click',()=>{
    studentDetails[2] = document.querySelector('#RollNo').value;
    studentDbReference.child(studentDetails[2]).on('value',(datasnapshot)=>{
        document.querySelector('#name').value=datasnapshot.val().Name;
        document.querySelector('#Age').value=datasnapshot.val().Age;
    })
})
