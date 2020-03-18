let dbRef = firebase.database().ref();
let storageRef = firebase.storage().ref('');
let dbSnapshot;
dbRef.once('value').then(val => {
    dbSnapshot = val.toJSON();
    console.log(dbSnapshot);

    uIdArr = Object.keys(dbSnapshot.Teacher);

    uIdArr.forEach(element => {
        let thisteacher = dbSnapshot.Teacher[`${element}`];
        document.getElementById("card-holder").innerHTML += 
            `<div class="card">
            <img src="${thisteacher.DownloadUrl}" alt="${name}" style="width:100%">
            <h1>${thisteacher.Name}</h1>
            <p class="title">${thisteacher.Designation}</p>
            <p>${thisteacher.College}</p>
            <a href="#"><i class="fa fa-dribbble"></i></a>
            <a href="#"><i class="fa fa-twitter"></i></a>
            <a href="#"><i class="fa fa-linkedin"></i></a>
            <a href="#"><i class="fa fa-facebook"></i></a>
            <p><button onclick=viewContentsOf("${element}")>See Contents</button></p>
            </div>`
    });
});

function backToList() {
    document.getElementById("card-content").style.display = "none";
    document.getElementById("card-holder").style.display = "block";
}

function viewContentsOf(uid) {
       
        // Copy from script.js of content ==================================================================================================
        var coll = document.getElementsByClassName("collapsible");
        var i;
        let contentSelector = document.querySelectorAll(".content");

        // clear stuff from previous query
        for (let index = 0; index < 3; index++) {
            contentSelector[index].innerHTML = "";
        }

        for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
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
                        <img src="${type}.png" width="100px" height="100px" />
                        <figcaption>${name.split('/').pop()}</figcaption>
                    </figure>
                    </a>
                    ` 
        }

        storageRef.child(`Teacher/${uid}/Videos/`).list().then(ele=>{
            ele.items.forEach(item=>{
                storageRef.child(item.location.path).getDownloadURL().then(result=>{
                    contentSelector[0].innerHTML+=filesHTML(result,item.location.path,'Videos');
                })
            })
        })
        storageRef.child(`Teacher/${uid}/Images/`).list().then(ele=>{
            ele.items.forEach(item=>{
                
                storageRef.child(item.location.path).getDownloadURL().then(result=>{
                    contentSelector[1].innerHTML+=filesHTML(result,item.location.path,'Images');
                }) 
            })
        })    
        storageRef.child(`Teacher/${uid}/WrittenMaterial/`).list().then(ele=>{
            ele.items.forEach(item=>{
                storageRef.child(item.location.path).getDownloadURL().then(result=>{
                    contentSelector[2].innerHTML+=filesHTML(result,item.location.path,'Written');
                }) 
            })
        })    
    //========================================================================================================================================

    document.getElementById("card-content").style.display = "block";
    document.getElementById("card-holder").style.display = "none";
}
