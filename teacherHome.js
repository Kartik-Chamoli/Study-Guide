uploadFileHtml();

function uploadFileHtml(){
  let uploadHtmlString = `<div id="drag-drop-area"></div>
  <div id="myProgress">
      <div id="myBar"></div>
    </div>   
  `
  var uppyScript = document.createElement('script');
  uppyScript.setAttribute('src','uppyScript.js');
  document.head.appendChild(uppyScript);

  let mainContent =  document.querySelector('.main-content');
  mainContent.innerHTML = uploadHtmlString;
}

let pillNavElement = document.querySelector('.pill-nav');
pillNavElement.addEventListener('click',()=>{
  document.querySelector('.main-content').innerHTML='';

  document.querySelectorAll('.pill-nav a').forEach(item=>{
    item.classList.remove('active');
  })
  event.explicitOriginalTarget.classList.toggle('active');
  if(event.target.text==="Upload Files"){
    uploadFileHtml();
  }
  else if(event.target.text==="View Uploaded Files"){
    showUploadedFiles();
  }
})