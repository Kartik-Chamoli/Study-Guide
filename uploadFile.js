let customWrapper = document.querySelectorAll('.custom-select-wrapper');
let selectedText = customWrapper[0].querySelector('.selText');
let option = customWrapper[0].querySelectorAll('.custom-option');

customWrapper[0].addEventListener('click', function() {
    customWrapper[0].querySelector('.custom-select').classList.toggle('open');
})

customWrapper[0].querySelector('.custom-options').addEventListener('click',(event)=>{
    Array.from(option).forEach(item=>item.classList.remove("selected"));
    selectedText.innerHTML = event.target.dataset.value;
    event.target.classList.add('selected');
    fillSelect(event.target.dataset.value);
})

customWrapper[1].addEventListener('click', function() {
    customWrapper[1].querySelector('.custom-select').classList.toggle('open');
})


customWrapper[1].querySelector('.custom-options').addEventListener('click',(event)=>{
    Array.from(customWrapper[1].querySelectorAll('.custom-option')).forEach(item=>item.classList.remove("selected"));
    customWrapper[1].querySelector('.selText').innerHTML = event.target.dataset.value;
    event.target.classList.add('selected');
})

customWrapper[2].addEventListener('click', function() {
    customWrapper[2].querySelector('.custom-select').classList.toggle('open');
})

customWrapper[2].querySelector('.custom-options').addEventListener('click',(event)=>{
    Array.from(customWrapper[2].querySelectorAll('.custom-option')).forEach(item=>item.classList.remove("selected"));
    customWrapper[2].querySelector('.selText').innerHTML = event.target.dataset.value;
    event.target.classList.add('selected');
})

function fillSelect(semester){
firebase.auth().onAuthStateChanged(function(user) {
              firebase.firestore().doc(`Teacher/${user.uid}`).get().then(e=>{
                let teacherdata=e.data();
                firebase.firestore().collection("CourseList").doc(teacherdata.Course).get().then(doc=>{
                    createOptions(doc.data()[semester]);
                });
            })
        });
    }

 function createOptions(options){
    let optEle = document.querySelectorAll('.custom-options')[2];
    document.querySelectorAll('.selText')[2].innerHTML = options[0];
    options.forEach((item,index)=>{
        if(index==0)
        optEle.insertAdjacentHTML('beforeend', `<span class='custom-option selected' data-value=${item}>${item}</span>`);
        else
        optEle.insertAdjacentHTML('beforeend' ,`<span class='custom-option' data-value=${item}>${item}</span>`);
    })
 }   

 //IIFE to initialize select menu
 (function(){
    fillSelect(1);
 })();