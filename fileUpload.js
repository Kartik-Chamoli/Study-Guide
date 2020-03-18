var coll = document.getElementsByClassName("collapsible");
var i;
var contentSelector = document.querySelectorAll(".content");
var EVENT;
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

//Database js
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


var storageRef = firebase.storage().ref('');
storageRef.child(`Teacher/${User}/Videos/`).list().then(ele=>{
    ele.items.forEach(item=>{
        storageRef.child(item.location.path).getDownloadURL().then(result=>{
            contentSelector[0].innerHTML+=filesHTML(result,item.location.path,'Videos');
        })
    })
})
storageRef.child(`Teacher/${User}/Images/`).list().then(ele=>{
    ele.items.forEach(item=>{
        
        storageRef.child(item.location.path).getDownloadURL().then(result=>{
            contentSelector[1].innerHTML+=filesHTML(result,item.location.path,'Images');
        }) 
    })
})    
storageRef.child(`Teacher/${User}/WrittenMaterial/`).list().then(ele=>{
    ele.items.forEach(item=>{
        storageRef.child(item.location.path).getDownloadURL().then(result=>{
            contentSelector[2].innerHTML+=filesHTML(result,item.location.path,'Written');
        }) 
    })
})    