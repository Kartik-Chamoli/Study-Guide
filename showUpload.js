var coll = document.getElementsByClassName("collapsible");
var i;
var contentSelector = document.querySelectorAll(".content");
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function(event){
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}

firebase.auth().onAuthStateChanged(function(user) {
let User = firebase.auth().currentUser.uid;
let materialTypeArr = ['Videos','Images','WrittenMaterial'];
for(i=0;i<3;i++){
    getFiles(i,materialTypeArr[i],User);
}
});

function filesHTML(location,name,type){ 
            return `
            <a href="${location}">
            <figure>
                <img src="assets/${type}.png" width="100px" height="100px" />
                <figcaption>${name.split('/').pop()}</figcaption>
            </figure>
            </a>
            ` 
}

function getFiles(index,type,User){
var storageRef = firebase.storage().ref('');
storageRef.child(`Teacher/${User}/${type}/`).list().then(ele=>{
    ele.items.forEach(item=>{
        storageRef.child(item.location.path).getDownloadURL().then(result=>{
            contentSelector[index].innerHTML+=filesHTML(result,item.location.path,type);
        })
    })
})
}