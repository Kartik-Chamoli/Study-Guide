let itemMenuEle = document.querySelector('.itemMenu');
let selTextEle =document.querySelectorAll('.selText');
let Images,Videos,WrittenMaterial,Lectures,docExist;
let mainContent = document.querySelector('.mainContent');
let navNumEle = document.querySelector('.navNumbers');

let hashObject= {
  data:function(){
    return window.location.hash.substr(1).split('&')[0].split('=')[1];
  },
  type:function(){
    return window.location.hash.substr(1).split('&')[1].split('=')[1];
  },
  currentPage:function(){
    return window.location.hash.substr(1).split('&')[2].split('=')[1];
  },
}

let noOfPages;
navNumEle.addEventListener('click',(event)=>{
  if(parseInt(event.target.innerHTML)){
    document.querySelectorAll('.btn').forEach(item=>item.classList.remove('btnSelect'));
    window.location.hash = `data=${hashObject.data()}&type=${hashObject.type()}&page=${event.target.innerHTML}`;
    event.target.classList.add('btnSelect');
  }
})

document.querySelector('.refreshBtn').addEventListener('click',()=>{
  getFiles();
})

function getFiles(){
  let docString=`/College/${teacherdata.College}/Course/${teacherdata.Course}/Semester/${selTextEle[0].innerHTML}/Subject/${selTextEle[2].innerHTML}/Section/${selTextEle[1].innerHTML}`;
  var docRef =firebase.firestore().doc(docString);
  
  docRef.get().then(function(doc) {
    if (doc.exists) {
       Images=doc.data().Images;
       Videos=doc.data().Videos;
       WrittenMaterial=doc.data().WrittenMaterial;
       Lectures=doc.data().Lectures;
       docExist = true;
    } else {
        alert('No material has been uploaded');
        docExist = false;
    }
}).catch(function(error) {
    alert("Cant get the document", error);
});
}

itemMenuEle.addEventListener('click',(event)=>{
  Array.from(document.querySelectorAll('.links')).forEach(item=>{
    item.classList.remove('selected');
  })
  
  if(event.target.classList[0]!='itemMenu'){
    navNumEle.innerHTML="";
    event.target.closest('.links').classList.add('selected');
    window.location.hash = `data=${hashObject.data()}&type=${event.target.closest('.links').id}&page=1`;

    if(docExist){
      knowType(event.target.closest('.links').id);
      renderPageButtons(noOfPages);
      document.querySelector('.btn').classList.add('btnSelect');
    }  
  }
  }); 
    

  function filesHTML(location,name,type){ 
    switch (type){
      case 'Images':
        return `
        <a href="${location}">
        <figure>
            <img src="${location}" width="150px" height="150px" />
            <figcaption>${name}</figcaption>
        </figure>
        </a>
        ` 
      case 'WrittenMaterial':
        return `
        <a href="${location}">
        <figure>
            <img src="assets/WrittenMaterial.png" width="150px" height="150px" />
            <figcaption>${name}</figcaption>
        </figure>
        </a>
        ` 
      case 'Videos':
        return `
        <figure>
        <video class="videoPlayer" controls muted="muted" autoplay> 
              <source src="${location}">
            </video>
            <figcaption>${name}</figcaption>
        </figure>
        `    
    }
    
}

function knowType(id){
  switch (id){
    case 'Videos':
      showObj(Videos,'Videos');
      break;
    case 'Images':
      showObj(Images,'Images');
      break;
    case 'WrittenMaterial':
      showObj(WrittenMaterial,'WrittenMaterial');
      break;
    case 'Lectures':
      showObj(Lectures,'Lectures');
      break;
    default:
      break;
   }
}

function showObj(itemType,material){
    if(itemType){ 
      noOfPages = Math.ceil(itemType.length/10);
      for(let i=(hashObject.currentPage()-1)*10;
      i<Math.min((hashObject.currentPage()*10),itemType.length);i++){
          mainContent.insertAdjacentHTML('beforeend',filesHTML(itemType[i].url,itemType[i].name,material));
      }
  }
    else{
        mainContent.innerHTML='You havent uploaded anything in '+material+' yet';
        noOfPages=0;
    }
}

 window.onhashchange = function(){
   mainContent.innerHTML="";
   knowType(hashObject.type());
 }

function renderPageButtons(pages){
  for(let i=1;i<=pages;i++){
    navNumEle.insertAdjacentHTML('beforeend',`<button class="btn" type="button">${i}</button>`);
  }
}